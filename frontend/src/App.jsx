import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import TaskList from "./components/TaskList";
import { verifyToken } from "./api/client";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("access") || "");
  const isManualLogout = useRef(false);

  function handleLogin(newToken) {
    setToken(newToken);
    isManualLogout.current = false;
  }

  function handleLogout(isExpired = false) {
    if (isExpired && !isManualLogout.current) {
      alert("Your session has expired. Please log in again.");
    }
    isManualLogout.current = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken("");
  }

  function handleManualLogout() {
    isManualLogout.current = true;
    handleLogout(false);
  }

  useEffect(() => {
    async function checkToken() {
      const access = localStorage.getItem("access");
      if (!access) {
        return;
      }

      const isValid = await verifyToken(access);
      if (!isValid) {
        handleLogout(true);
      }
    }

    checkToken();
  }, []);

  return (
    <div className="p-5 max-w-4xl mx-auto w-full box-border min-h-screen flex flex-col">
      {token ? (
        <>
          <header className="flex justify-between items-center mb-8 pb-4 border-b border-black/10 dark:border-white/10">
            <h1 className="m-0 text-3xl">Task Manager</h1>
            <button
              onClick={handleManualLogout}
              className="px-6 py-3 rounded border border-transparent text-base font-medium cursor-pointer transition-all duration-200 font-inherit bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              Logout
            </button>
          </header>
          <TaskList token={token} onLogout={handleLogout} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
