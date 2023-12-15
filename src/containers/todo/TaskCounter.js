// TaskCounter.js

import React, { useEffect, useState } from "react";
import "./taskcounter.css";

export default function TaskCounter({ tasks }) {
  const [totalTasks, setTotalTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [unfinishedTasks, setUnfinishedTasks] = useState(0);

  useEffect(() => {
    setTotalTasks(tasks.length);
    setFinishedTasks(tasks.filter((task) => task.done).length);
    setUnfinishedTasks(tasks.filter((task) => !task.done).length);
  }, [tasks]);

  return (
    <div className="task-counter">
      <p>Total Tasks: {totalTasks}</p>
      <p>Finished Tasks: {finishedTasks}</p>
      <p>Unfinished Tasks: {unfinishedTasks}</p>

      <div className="button-container">
        <button className="button">Important</button>
        <button className="button">Non-Important</button>
      </div>
    </div>
  );
}
