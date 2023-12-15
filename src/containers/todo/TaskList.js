// TaskList.js

import React, { useState } from "react";
import "./tasklist.css";
import Task from "./Task";
import Notification from "./Notification";

export default function TaskList({ tasks, handleUpdate, handleDelete, user }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="tlist">
      {tasks.map((task) => (
        <Task
          task={task}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          showNotification={showNotification}
          user={user}
          key={task.id}
        />
      ))}
      {notification && <Notification message={notification} onClose={closeNotification} />}
    </div>
  );
}
