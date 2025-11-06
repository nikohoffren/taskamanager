import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("access"));

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("access"));
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken(null);
  }

  return (
    <div style={{ padding: "2rem" }}>
      {!token ? (
        <LoginForm onLogin={setToken} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TaskList token={token} onLogout={handleLogout} />
        </>
      )}
    </div>
  );
}
