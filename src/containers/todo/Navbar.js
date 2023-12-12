import "./todo.css";

import { FaStar } from "react-icons/fa";

export default function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <FaStar size={20} />
        <h1>JUST DO NOTHING</h1>
      </div>
      <div className="nav-links">
        <p>{user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
