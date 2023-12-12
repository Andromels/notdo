import { useState } from "react";
import "./auth.css";

import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase";

export default function Auth() {
  const [login, setLogin] = useState(true);
  return (
    <div className="auth">
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
      <div className="gif"></div>
    </div>
  );
}

function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginWithEmailAndPassword(email, password);
  };
  return (
    <div className="form">
      <h1>JUST DO NOTHING</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? 
        <span onClick={() => setLogin(false)}>Register</span>
      </p>
    </div>
  );
}

function Register({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  const handleRegister = () => {
    registerWithEmailAndPassword(email, password);
  };
  return (
    <div className="form">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label htmlFor="rpassword">Confirm Password:</label>
      <input
        type="rpassword"
        name="rpassword"
        id="rpassword"
        placeholder="Confirm Password"
        onChange={(e) => setRPassword(e.target.value)}
        value={rPassword}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{" "}
        <span onClick={() => setLogin(true)}>Login</span>
      </p>
    </div>
  );
}
