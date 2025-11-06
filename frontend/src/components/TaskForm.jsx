export default function TaskForm({
  form,
  editingTask,
  error,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <>
      <h2 className="m-0 mb-5 text-3xl text-left">
        {editingTask ? "Edit Task" : "Add Task"}
      </h2>
      {error && (
        <p className="text-error mb-4 p-2.5 bg-error-bg rounded">{error}</p>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-black/5 dark:bg-white/5 p-5 rounded-lg mb-8 box-border"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={onChange}
          className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border min-h-20 resize-y focus:outline-none focus:border-primary"
        />

        <div className="flex gap-4 mb-4 flex-col sm:flex-row">
          <div className="flex-1 min-w-0">
            <label className="block mb-1.5 text-sm opacity-80">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
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
              onChange={onChange}
              className="w-full px-2.5 py-2.5 mb-4 border border-black/20 dark:border-white/20 rounded bg-white/80 dark:bg-white/5 text-inherit font-inherit text-base box-border focus:outline-none focus:border-primary"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label className="block mb-1.5 text-sm opacity-80">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline || ""}
              onChange={onChange}
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
              onClick={onCancel}
              className="px-6 py-3 rounded border border-black/20 dark:border-white/20 text-base font-medium cursor-pointer transition-all duration-200 font-inherit bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
}
