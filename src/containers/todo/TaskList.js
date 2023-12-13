import "./todo.css";
import Task from "./Task";

export default function TaskList({ tasks, handleUpdate, handleDelete, handleEdit }) {
  return (
    <div className="tlist">
      {tasks.map((task) => (
        <Task
          task={task}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleEdit={handleEdit}
          key={task.id}
        />
      ))}
    </div>
  );
}