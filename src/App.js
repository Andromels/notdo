// Replace the existing App.js file with this one

import "./App.css";
import Auth from "./containers/auth/Auth";
import Todo from "./containers/todo/Todo";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? <Todo user={user} logout={logout} /> : <Auth />}
    </div>
  );
}

export default App;
