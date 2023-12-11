import "./todo.css";

import { FaList } from "react-icons/fa";

export default function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <FaList size={20} />
        <h1>BadList</h1>
      </div>
      <div className="nav-links">
        <p>{user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
