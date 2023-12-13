// Task.js
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Task({
  task,
  handleDelete,
  handleUpdate,
  handleEdit,
}) {
  const [currentTask, setTask] = useState(task);
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(currentTask.text);

  const handleEditConfirm = () => {
    const updatedTask = { ...currentTask, text: editedText };
    setTask(updatedTask);
    handleUpdate(currentTask.id, updatedTask);
    setEditing(false);

    // Notify the user
    window.alert(`Task "${currentTask.text}" has been edited.`);
  };

  const handleDeleteConfirm = () => {
    handleDelete(currentTask.id);

    // Notify the user
    window.alert(`Task "${currentTask.text}" has been deleted.`);
  };

  return (
    <div className={task.done ? "task done" : "task undone"}>
      {isEditing ? (
        // Edit form for task text
        <div className="edit-form">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEditConfirm}>Save</button>
        </div>
      ) : (
        // Regular task view
        <>
          <p>{task.text}</p>
          <div className="task-actions">
            <FaCheck
              size={18}
              onClick={() => {
                const updatedTask = { ...currentTask, done: !currentTask.done };
                setTask(updatedTask);
                handleUpdate(currentTask.id, updatedTask);

                // Notify the user
                window.alert(`Task "${currentTask.text}" has been marked as ${updatedTask.done ? "done" : "undone"}.`);
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
