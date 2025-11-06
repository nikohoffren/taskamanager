import {
  formatDate,
  getStatusClasses,
  getPriorityClasses,
} from "../utils/taskUtils";

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-5 border border-black/10 dark:border-white/10 transition-all duration-200 box-border hover:border-black/20 dark:hover:border-white/20 hover:bg-black/7 dark:hover:bg-white/7">
      <div className="flex justify-between items-start mb-3 gap-4 flex-col sm:flex-row">
        <h3 className="m-0 text-xl font-semibold flex-1">{task.title}</h3>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto flex-wrap">
          <span className={getStatusClasses(task.status)}>{task.status}</span>
          <span className={getPriorityClasses(task.priority)}>
            {task.priority}
          </span>
        </div>
      </div>
      {task.description && (
        <p className="my-3 text-black/70 dark:text-white/70 leading-relaxed">
          {task.description}
        </p>
      )}
      {task.deadline && (
        <p className="my-2 text-sm text-black/60 dark:text-white/60">
          <span className="font-semibold mr-1.5">Deadline:</span>{" "}
          {formatDate(task.deadline)}
        </p>
      )}
      <div className="flex gap-2.5 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 text-sm rounded border border-primary/30 bg-primary/20 text-primary hover:bg-primary/30 hover:border-primary transition-all duration-200 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 text-sm rounded border border-red-500/30 bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:border-red-500 transition-all duration-200 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
