import React, { useState, useEffect, createContext } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { FaMoon, FaRegSun } from "react-icons/fa";

const themeContext = createContext();

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, disc, date, time) => {
    const newTask = {
      id: Date.now(),
      title,
      disc,
      date,
      time,
      completed: false,
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      editing: false,
      status: "pending",
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditing = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, editing: true } : task
      )
    );
  };

  const updateTask = (taskId, title, disc, date, time) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, editing: false, title, disc, date, time }
          : task
      )
    );
  };
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <themeContext.Provider value={{ theme }}>
      <div
        className={`App`}
        style={{ backgroundColor: theme === "light" ? "#aee7b3bb" : "black" }}
      >
       <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
       {
          theme === "light"? (
            
            <FaMoon fontSize={24} style={{cursor:"pointer"}} onClick={() => setTheme("dark")}/>
          ) : (
           <FaRegSun fontSize={24} style={{cursor:"pointer",color:"white"}} onClick={() => setTheme("light")} />
          )
        }
       </div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "12px",
            color: theme === "light" ? "black" : "white",
          }}
        >
          TodoList
        </h1>
        <TodoForm addTask={addTask} />
        <TodoList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          startEditing={startEditing}
          updateTask={updateTask}
          updateTaskStatus={updateTaskStatus}
        />
      </div>
    </themeContext.Provider>
  );
}

export default App;
export { themeContext };
