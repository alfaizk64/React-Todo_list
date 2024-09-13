import React, { useState } from "react";

function TodoForm({ addTask }) {
  const [errors, setErrors] = useState({
    title: "",
    disc: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const disc = e.target.elements.disc.value;
    const date = new Date(e.target.elements.date.value);
    const time = e.target.elements.time.value;
   console.log(date);
   
    let hasError = false;

    // Validate title
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      hasError = true;
    }

    // Validate description
    if (!disc.trim()) {
      setErrors((prev) => ({ ...prev, disc: "Description is required" }));
      hasError = true;
    }

    // Validate date
    if (!date || isNaN(date)) {
      setErrors((prev) => ({ ...prev, date: "Date is required" }));
      hasError = true;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day
      if (date < today) {
        setErrors((prev) => ({
          ...prev,
          date: "Date cannot be earlier than today",
        }));
        hasError = true;
      }
    }

    // Validate time
    if (!time || !isValidTime(time)) {
      setErrors((prev) => ({ ...prev, time: "Invalid time format" }));
      hasError = true;
    }

    if (!hasError) {
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
         })
      addTask(title, disc, formattedDate, time);
      e.target.reset(); // Reset form after submission
      setErrors({
        title: "",
        disc: "",
        date: "",
        time: "",
      });
    }
  };

  const isValidTime = (timeString) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/;
    return regex.test(timeString);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="formDiv"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="inputWrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ fontSize: "18px" }}>Add Task</label>
        <input type="text" name="title" placeholder="Add Task" />
        {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
      </div>
      <div
        className="inputWrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ fontSize: "18px" }}>Add Description</label>
        <input type="text" name="disc" placeholder="Add Description" />
        {errors.disc && <span style={{ color: "red" }}>{errors.disc}</span>}
      </div>
      <div
        className="inputWrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ fontSize: "18px" }}>Date To complete Task</label>
        <input
          name="date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.date && <span style={{ color: "red" }}>{errors.date}</span>}
      </div>
      <div
        className="inputWrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ fontSize: "18px" }}>Time to Complete</label>
        <CustomTimePicker name="time" />
        {errors.time && <span style={{ color: "red" }}>{errors.time}</span>}
      </div>
      <button style={{ borderRadius: "12px", marginTop: "22px" }} type="submit">
        Add Task
      </button>
    </form>
  );
}

function CustomTimePicker({ name, ...props }) {
  return (
    <input
      type="text"
      name={name}
      {...props}
      pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$"
      title="Enter time in HH:MM AM/PM format"
    />
  );
}

export default TodoForm;
