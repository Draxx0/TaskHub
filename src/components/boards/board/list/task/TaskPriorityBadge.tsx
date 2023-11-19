import clsx from "clsx";
import { useTranslation } from "react-i18next";

const TaskPriorityBadge = ({
  priority,
}: {
  priority: "Low" | "Medium" | "High";
}) => {
  const { t } = useTranslation("boards");

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

  const priorityTranslation = () => {
    switch (priority) {
      case "Low":
        return t("list.create-task.task_priority_low");
      case "Medium":
        return t("list.create-task.task_priority_medium");
      case "High":
        return t("list.create-task.task_priority_high");
      default:
        return null;
    }
  };

  return (
    <div className={priorityContainerClass}>
      <span className={priorityClass}>{priorityTranslation()}</span>
    </div>
  );
};

export default TaskPriorityBadge;
