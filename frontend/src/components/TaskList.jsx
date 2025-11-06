import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";

export default function TaskList({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    deadline: "",
  });

  async function loadTasks() {
    try {
      const data = await apiRequest("tasks/", "GET", null, token, onLogout);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [token]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      await apiRequest("tasks/", "POST", form, token, onLogout);
      setForm({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        deadline: "",
      });
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await apiRequest(`tasks/${id}/`, "DELETE", null, token, onLogout);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br />

        <label>Status: </label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="TODO">TODO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>

        <label> Priority: </label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <br />
        <label>Deadline: </label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{t.title}</strong> — {t.status} ({t.priority})
            {t.deadline && ` — Due: ${t.deadline}`}
            <br />
            <small>{t.description}</small>
            <br />
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
