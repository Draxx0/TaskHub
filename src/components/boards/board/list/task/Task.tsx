import { CardContent } from "@/components/ui/card";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Card as ShadCard } from "@/components/ui/card";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import AvatarSelection from "@/components/common/form/AvatarSelection";
import { useUserStore } from "@/store/user.store";
import { Flag, MessageCircle, MoreHorizontal } from "lucide-react";
import { Task as ITask } from "@/utils/types/task";
import { formatDate } from "@/utils/functions/formatDate";
import { storedLang } from "@/main";

interface Props {
  task: ITask;
  index: number;
}

const Task = ({ task, index }: Props) => {
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
                {/* Insert here task tag(s) create Tag component*/}
                <div className="px-3 py-1 rounded-md bg-green-300/50 flex items-center justify-center">
                  <span className="text-green-700 text-xs">Low</span>
                </div>
              </div>
              <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
                <MoreHorizontal size={20} className="text-gray-400" />
              </div>
            </div>
            <CardContent>
              <p className="font-bold mb-2 break-words">{task.title}</p>
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

                  <div className="p-2 relative flex items-center gap-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
                    <MessageCircle size={20} className="text-gray-400" />
                    <span className="text-xs text-gray-400">8</span>
                  </div>
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
