import clsx from "clsx";

const TaskPriorityBadge = ({
  priority,
}: {
  priority: "Low" | "Medium" | "High";
}) => {
  const priorityContainerClass = clsx(
    {
      "bg-green-300/50": priority === "Low",
      "bg-yellow-300/50": priority === "Medium",
      "bg-red-300/50": priority === "High",
    },
    "px-3 py-1 rounded-md bg-green-300/50 flex items-center justify-center"
  );

  const priorityClass = clsx(
    {
      "text-green-700": priority === "Low",
      "text-yellow-700": priority === "Medium",
      "text-red-700": priority === "High",
    },
    "text-xs"
  );

  return (
    <div className={priorityContainerClass}>
      <span className={priorityClass}>{priority}</span>
    </div>
  );
};

export default TaskPriorityBadge;
