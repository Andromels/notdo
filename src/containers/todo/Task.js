import { FaCheck, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Task({ task, handleDelete, handleUpdate }) {
  const [currentTask, setTask] = useState(task);
  useEffect(() => {
    handleUpdate(currentTask.id, currentTask);
  }, [currentTask]);
  return (
    <div className={task.done ? "task done" : "task undone"}>
      <p>{task.text}</p>
      <div className="task-actions">
        <FaCheck
          size={18}
          onClick={() => {
            setTask({ ...currentTask, done: !currentTask.done });
          }}
        />
        <FaTrash size={18} onClick={() => handleDelete(task.id)} />
      </div>
    </div>
  );
}
