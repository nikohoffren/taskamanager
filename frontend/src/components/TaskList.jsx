import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "../api/client";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

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

  function handleCancel() {
    setEditingTask(null);
    setForm({
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      deadline: "",
    });
  }

  return (
    <div className="w-full">
      <TaskForm
        form={form}
        editingTask={editingTask}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <div className="flex flex-col gap-4 w-full">
        {tasks.length === 0 ? (
          <p className="text-center py-10 px-5 text-black/50 dark:text-white/50 italic">
            No tasks yet!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
