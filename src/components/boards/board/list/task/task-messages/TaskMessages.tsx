import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Task } from "@/utils/types/task";
import { MessageCircle } from "lucide-react";
import TaskMessage from "./TaskMessage";
import TaskMessageCreate from "./TaskMessageCreate";
import { Button } from "@/components/ui/button";
import { List } from "@/utils/types/list";
import { Separator } from "@/components/ui/separator";

const TaskMessages = ({ task, list }: { task: Task; list: List }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="p-2 relative flex items-center gap-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
          <MessageCircle size={20} className="text-gray-400" />
          <span className="text-xs text-gray-400">{task.messages.length}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[80%] min-w-[75%]">
        <AlertDialogHeader className="sm:justify-between">
          <div className="space-y-4">
            <AlertDialogTitle>
              Fil de discussion -{" "}
              <span className="font-bold text-main-500">{task.title}</span>
            </AlertDialogTitle>
            <div className="max-h-[430px] flex flex-col gap-5 overflow-auto border border-neutral-100 p-4 rounded-sm">
              {task.messages.length > 0 ? (
                task.messages.map((message) => (
                  <>
                    <TaskMessage key={message.id} message={message} />
                    <Separator />
                  </>
                ))
              ) : (
                <p>Aucun message</p>
              )}
            </div>
          </div>
          <div>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <TaskMessageCreate list={list} currentTask={task}>
                  <div className="flex justify-end gap-4">
                    <AlertDialogCancel>Retour</AlertDialogCancel>
                    <Button type="submit">Envoyer</Button>
                  </div>
                </TaskMessageCreate>
              </div>
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskMessages;
