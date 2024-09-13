import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";

function TodoItem({
  task,
  toggleComplete,
  deleteTask,
  startEditing,
  updateTask,
  updateTaskStatus,
}) {
    
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    disc: task.disc,
    date: task.date,
    time: task.time,
  });

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
    
  };

  const handleEdit = () => {
    startEditing(task.id);
  };

  const handleUpdate = () => {
    updateTask(
      task.id,
      editedTask.title,
      editedTask.disc,
      editedTask.date,
      editedTask.time
    );
  };

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(task.id, newStatus);
  };

  const handleInputChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <li key={task.id}>
      {task.editing ? (
        <>
          <div style={{ marginBottom: "10px" }}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Description:</label>
            <input
              type="text"
              name="disc"
              value={editedTask.disc}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              value={editedTask.date}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Time:</label>
            <input
              type="text"
              name="time"
              value={editedTask.time}
              onChange={handleInputChange}
              pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$"
              title="Enter time in HH:MM AM/PM format"
            />
          </div>
          {/* <FaCheckSquare
            onClick={handleUpdate}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          /> */}
          <button onClick={handleUpdate}
            style={{ cursor: "pointer", marginLeft: "10px" }} >Update</button>
        </>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <label>Click Here to Add the task To Completed</label>
              <input
                className={`${task.status === "completed" ? "active" : ""}`}
                style={{ marginLeft: "6px" }}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                onClick={() => handleStatusChange("completed")}
              />
            </div>
              {isExpanded ? (
                <FaAngleUp 
                  onClick={handleToggleExpansion}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaAngleDown 
                  onClick={handleToggleExpansion}
                  style={{ cursor: "pointer" }}
                />
              )}
          </div>
             <div>
              <span style={{ fontWeight: "600",textDecoration: task.completed ? `line-through` : "" }}>Title : {task.title}</span> 
            </div>
 
          <div style={{  }}>
            
            {isExpanded && (
              <>
                <div style={{ fontWeight: "600", display: "flex" }}>
                  Description :
                </div>
                <span>{task.disc}</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="date_wrapper"
                >
                  <span style={{ fontWeight: "600" }}>
                    Created At : {task.timestamp}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    Due Date : {task.date} - {task.time}
                  </span>
                </div>
                <div className="status-tabs">
                  <button
                    onClick={() => handleStatusChange("pending")}
                    className={`tab pending-tab ${
                      task.status === "pending" ? "active" : ""
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange("in-progress")}
                    className={`tab in-progress-tab ${
                      task.status === "in-progress" ? "active" : ""
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange("completed")}
                    className={`tab completed-tab ${
                      task.status === "completed" ? "active" : ""
                    }`}
                    onChange={() => toggleComplete(task.id)}
                  >
                    Completed
                  </button>
                </div>
              </>
            )}
          </div>
   

          <div
            className="action-icons"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {task.status !== "completed" && (
              <>
                <FaEdit   className="fa_icons" fontSize={24} onClick={handleEdit} style={{ cursor: "pointer" }} />
              </>
            )}
            <FaTrashAlt   className="fa_icons"
              fontSize={24}
              onClick={() => deleteTask(task.id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;



