import { CardContent } from "@/components/ui/card";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Card as ShadCard } from "@/components/ui/card";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import AvatarSelection from "@/components/common/form/AvatarSelection";
import { useUserStore } from "@/store/user.store";
import { BadgeCheck, Flag, MoreHorizontal } from "lucide-react";
import { Task as ITask } from "@/utils/types/task";
import { formatDate } from "@/utils/functions/formatDate";
import { storedLang } from "@/main";
import TaskPriorityBadge from "./TaskPriorityBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import TaskMessages from "./task-messages/TaskMessages";
import { List } from "@/utils/types/list";

interface Props {
  task: ITask;
  list: List;
  index: number;
}

const Task = ({ task, index, list }: Props) => {
  const { t } = useTranslation("boards");
  const [showFullContent, setShowFullContent] = useState(false);
  const { user } = useUserStore();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="whitespace-normal"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ShadCard className="space-y-4">
            <div className="flex justify-between items-center px-6 pt-6">
              <div className="flex items-center gap-2">
                <TaskPriorityBadge priority={task.priority} />
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
                  <MoreHorizontal size={20} className="text-gray-400" />
                </div>
                <div className="p-1 flex items-center justify-center rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeCheck size={20} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("list.update-task.task_done")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <CardContent>
              <p className="font-bold mb-2 break-words capitalize">
                {task.title}
              </p>
              <div className="flex flex-col gap-4">
                <p className="text-sm break-words">
                  {task.content.length > 50 ? (
                    <>
                      {showFullContent
                        ? task.content
                        : task.content.substring(0, 50) + "..."}
                      <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        className="font-bold"
                      >
                        {showFullContent ? "Voir moins" : "Voir plus"}
                      </button>
                    </>
                  ) : (
                    task.content
                  )}
                </p>
                {task.image && (
                  <img src={task.image} alt="" className="rounded-md" />
                )}
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <Flag size={16} className="text-gray-400" />
                    <p className="opacity-75 text-xs font-semibold">
                      {formatDate({
                        date: task.dueDate,
                        locale: storedLang || "fr",
                      })}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  {user && user.photoURL && (
                    <div className="flex items-center gap-3">
                      <AvatarSelection
                        url={user.photoURL}
                        fallback="user picture not found"
                        width="w-8"
                        className="rounded-full"
                      />
                      <p>{user.displayName ?? user.email}</p>
                    </div>
                  )}

                  <TaskMessages task={task} list={list} />
                </div>
              </div>
            </CardContent>
          </ShadCard>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
