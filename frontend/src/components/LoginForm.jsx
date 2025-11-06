import { useState } from "react";
import { apiRequest } from "../api/client";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await apiRequest("token/", "POST", { username, password });
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      onLogin(data.access);
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-40px)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 max-w-md w-full p-8 bg-black/5 dark:bg-white/5 rounded-lg"
      >
        <h2 className="m-0 mb-2.5 text-3xl text-center">Login</h2>
        <input
          className="w-full px-3 py-3 mb-0 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full px-3 py-3 mb-0 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-3 rounded border border-transparent text-base font-medium cursor-pointer transition-all duration-200 font-inherit bg-primary text-white hover:bg-primary-hover"
        >
          Login
        </button>
        {error && (
          <p className="text-error mb-4 p-2.5 bg-error-bg rounded text-center m-0">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
