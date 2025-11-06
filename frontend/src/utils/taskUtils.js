export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("fi-FI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStatusClasses(status) {
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
}

export function getPriorityClasses(priority) {
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
}
