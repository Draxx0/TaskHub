import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Task } from "@/utils/types/task";
import { MessageCircle } from "lucide-react";
import TaskMessage from "./TaskMessage";

const TaskMessages = ({ task }: { task: Task }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="p-2 relative flex items-center gap-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
          <MessageCircle size={20} className="text-gray-400" />
          <span className="text-xs text-gray-400">{task.messages.length}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Fil de discussion</AlertDialogTitle>
          <AlertDialogDescription>
            {task.messages.length > 0 ? (
              task.messages.map((message) => <TaskMessage key={message.id} />)
            ) : (
              <p>Aucun message</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskMessages;
