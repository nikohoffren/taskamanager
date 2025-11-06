import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "../api/client";

export default function TaskList({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    deadline: "",
  });

  const loadTasks = useCallback(async () => {
    try {
      const data = await apiRequest("tasks/", "GET", null, token, onLogout);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  }, [token, onLogout]);

  useEffect(() => {
    if (token) loadTasks();
  }, [token, loadTasks]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const endpoint = editingTask ? `tasks/${editingTask.id}/` : "tasks/";
    const method = editingTask ? "PUT" : "POST";

    const formData = {
      ...form,
      deadline: form.deadline || null,
    };

    try {
      await apiRequest(endpoint, method, formData, token, onLogout);
      setForm({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        deadline: "",
      });
      setEditingTask(null);
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

  function handleEdit(task) {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline || "",
    });
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const getStatusClasses = (status) => {
    const base =
      "px-2.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-wide";
    switch (status.toLowerCase()) {
      case "todo":
        return `${base} bg-primary/20 text-primary`;
      case "doing":
        return `${base} bg-yellow-500/20 text-yellow-500`;
      case "done":
        return `${base} bg-green-500/20 text-green-500`;
      default:
        return base;
    }
  };

  const getPriorityClasses = (priority) => {
    const base =
      "px-2.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-wide";
    switch (priority.toLowerCase()) {
      case "low":
        return `${base} bg-gray-500/20 text-gray-500`;
      case "medium":
        return `${base} bg-orange-500/20 text-orange-500`;
      case "high":
        return `${base} bg-red-500/20 text-red-500`;
      default:
        return base;
    }
  };

  return (
    <div className="w-full">
      <h2 className="m-0 mb-5 text-3xl text-left">
        {editingTask ? "Edit Task" : "Add Task"}
      </h2>
      {error && (
        <p className="text-error mb-4 p-2.5 bg-error-bg rounded">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-black/5 dark:bg-white/5 p-5 rounded-lg mb-8 box-border"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border min-h-20 resize-y focus:outline-none focus:border-primary"
        />

        <div className="flex gap-4 mb-4 flex-col sm:flex-row">
          <div className="flex-1 min-w-0">
            <label className="block mb-1.5 text-sm opacity-80">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
            >
              <option value="TODO">TODO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label className="block mb-1.5 text-sm opacity-80">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label className="block mb-1.5 text-sm opacity-80">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline || ""}
              onChange={handleChange}
              className="w-full px-2.5 py-2 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
              lang="fi"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            type="submit"
            className="px-6 py-3 rounded border border-transparent text-base font-medium cursor-pointer transition-all duration-200 font-inherit bg-primary text-white hover:bg-primary-hover"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                setForm({
                  title: "",
                  description: "",
                  status: "TODO",
                  priority: "MEDIUM",
                  deadline: "",
                });
              }}
              className="px-6 py-3 rounded border border-black/20 dark:border-white/20 text-base font-medium cursor-pointer transition-all duration-200 font-inherit bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-4 w-full">
        {tasks.length === 0 ? (
          <p className="text-center py-10 px-5 text-black/50 dark:text-white/50 italic">
            No tasks yet!
          </p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className="bg-black/5 dark:bg-white/5 rounded-lg p-5 border border-black/10 dark:border-white/10 transition-all duration-200 box-border hover:border-black/20 dark:hover:border-white/20 hover:bg-black/7 dark:hover:bg-white/7"
            >
              <div className="flex justify-between items-start mb-3 gap-4 flex-col sm:flex-row">
                <h3 className="m-0 text-xl font-semibold flex-1">{t.title}</h3>
                <div className="flex gap-2 shrink-0 w-full sm:w-auto flex-wrap">
                  <span className={getStatusClasses(t.status)}>{t.status}</span>
                  <span className={getPriorityClasses(t.priority)}>
                    {t.priority}
                  </span>
                </div>
              </div>
              {t.description && (
                <p className="my-3 text-black/70 dark:text-white/70 leading-relaxed">
                  {t.description}
                </p>
              )}
              {t.deadline && (
                <p className="my-2 text-sm text-black/60 dark:text-white/60">
                  <span className="font-semibold mr-1.5">Deadline:</span>{" "}
                  {formatDate(t.deadline)}
                </p>
              )}
              <div className="flex gap-2.5 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => handleEdit(t)}
                  className="px-4 py-2 text-sm rounded border border-primary/30 bg-primary/20 text-primary hover:bg-primary/30 hover:border-primary transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-4 py-2 text-sm rounded border border-red-500/30 bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:border-red-500 transition-all duration-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
