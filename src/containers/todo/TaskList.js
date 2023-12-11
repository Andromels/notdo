import "./todo.css";
import Task from "./Task";

export default function TaskList({ tasks, handleUpdate, handleDelete }) {
  return (
    <div className="tlist">
      {tasks.map((task) => (
        <Task
          task={task}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          key={task.id}
        />
      ))}
    </div>
  );
}
