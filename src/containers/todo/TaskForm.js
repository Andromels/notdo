// TaskForm.js
import { useState } from "react";
import "./todo.css";

export default function TaskForm({ handleAdd }) {
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      handleAdd(task);
      setTask("");
    }
  };

  return (
    <div className="tform">
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}
