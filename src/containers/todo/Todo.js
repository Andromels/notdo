import "./todo.css";

import Navbar from "./Navbar";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useState, useEffect } from "react";

import {
  onTasksSnapshot,
  createTask,
  updateTask,
  deleteTask,
} from "../../firebase";

export default function Todo({ user, logout }) {
  const [tasks, setTasks] = useState([]);

  const handleAdd = (newTask) => {
    createTask(user.uid, newTask);
  };
  const handleUpdate = (taskid, taskupdate) => {
    updateTask(user.uid, taskid, taskupdate);
  };
  const handleDelete = (taskid) => {
    deleteTask(user.uid, taskid);
  };

  useEffect(() => {
    if (user.uid) {
      const unsubscribe = onTasksSnapshot(user.uid, setTasks);
      return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    }
  }, [user.uid]);
  return (
    <div className="todo">
      <Navbar user={user} logout={logout} />
      <TaskList
        tasks={tasks}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <TaskForm handleAdd={handleAdd} />
    </div>
  );
}
