// Task.js

import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import './task.css';

export default function Task({
  task,
  handleDelete,
  handleUpdate,
  showNotification,
  user,
}) {
  const [currentTask, setTask] = useState(task);
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(currentTask.text);

  const handleEditConfirm = () => {
    const updatedTask = { ...currentTask, text: editedText };
    setTask(updatedTask);
    handleUpdate(currentTask.id, updatedTask);
    setEditing(false);

    // Show the notification
    showNotification(`Task "${currentTask.text}" has been edited. Timestamp: ${formatTimestamp(updatedTask.date_added)}`);
  };

  const handleDeleteConfirm = () => {
    handleDelete(currentTask.id);

    // Show the notification
    showNotification(`Task "${currentTask.text}" has been deleted. Timestamp: ${formatTimestamp(currentTask.date_added)}`);
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
      // Firebase Timestamp
      return timestamp.toDate().toLocaleString();
    } else if (timestamp instanceof Date) {
      // JavaScript Date
      return timestamp.toLocaleString();
    }
    return 'Unknown Timestamp';
  };

  return (
    <div className={task.done ? "task done" : "task undone"}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEditConfirm}>Save</button>
        </div>
      ) : (
        <>
          <p>{task.text}</p>
          <p className="timestamp">Added on: {formatTimestamp(task.date_added)}</p>
          <div className="task-actions">
            <FaCheck
              size={18}
              onClick={() => {
                const updatedTask = { ...currentTask, done: !currentTask.done, date_done: new Date() };
                setTask(updatedTask);
                handleUpdate(currentTask.id, updatedTask);
                showNotification(`Task "${currentTask.text}" has been marked as ${updatedTask.done ? "done" : "undone"}. Timestamp: ${formatTimestamp(updatedTask.date_done)}`);
              }}
            />
            <FaTrash size={18} onClick={handleDeleteConfirm} />
            <FaEdit size={18} onClick={() => setEditing(true)} />
          </div>
        </>
      )}
    </div>
  );
}
