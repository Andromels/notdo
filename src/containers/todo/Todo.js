// Todo.js
import React, { useState, useEffect } from "react";
import "./todo.css";
import Navbar from "./Navbar";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { onTasksSnapshot, createTask, updateTask, deleteTask } from "../../firebase";

export default function Todo({ user, logout }) {
  const [tasks, setTasks] = useState([0]);
  const [darkMode, setDarkMode] = useState(false);

  const handleAdd = (newTask) => {
    createTask(user.uid, newTask);
  };

  const handleUpdate = (taskid, taskupdate) => {
    updateTask(user.uid, taskid, taskupdate);
  };

  const handleDelete = (taskid) => {
    deleteTask(user.uid, taskid);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (user.uid) {
      const unsubscribe = onTasksSnapshot(user.uid, setTasks);
      return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    }
  }, [user.uid]);

  return (
    <div className={`todo ${darkMode ? "dark-mode" : ""}`}>
      <Navbar user={user} logout={logout} toggleDarkMode={toggleDarkMode} />
      <TaskList tasks={tasks} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      <TaskForm handleAdd={handleAdd} />
    </div>
  );
}
