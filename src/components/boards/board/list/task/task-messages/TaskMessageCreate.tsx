import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import useGetFirebaseUser from "@/hooks/useGetFirebaseUser";
import { queryClient } from "@/main";
import { firebaseUpdate } from "@/service/firestore/firebaseUpdate";
import { generateUUID } from "@/utils/functions/generateUUID";
import { List } from "@/utils/types/list";
import { Task } from "@/utils/types/task";
import { Timestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const TaskMessageCreate = ({
  children,
  list,
  currentTask,
}: {
  children: React.ReactNode;
  list: List;
  currentTask: Task;
}) => {
  const { user } = useGetFirebaseUser();
  const { t } = useTranslation(["global"]);

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const message = String(form.get("message-content"));

    if (message?.length === 0) {
      throw new Error("Message is empty");
    }

    try {
      const updatedTasks = list.tasks.map((task) => {
        if (task.id === currentTask.id) {
          return {
            ...task,
            messages: [
              ...task.messages,
              {
                id: generateUUID(),
                content: message,
                createdAt: Timestamp.fromDate(new Date()),
                user: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  email: user.email,
                },
              },
            ],
          };
        }
        return task;
      });

      await firebaseUpdate.docInCollection<List>({
        docReference: {
          path: "lists",
          pathSegments: [list.id],
        },
        updateData: {
          ...list,
          tasks: updatedTasks,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["collection", "lists"],
        exact: true,
      });
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      throw new Error("Error while adding message");
    }

    console.log("Message sent with content", message);
  };
  return (
    <form onSubmit={handleSubmitMessage} className="space-y-3">
      <span className="opacity-75">Ecrire un message.</span>
      <Textarea name="message-content" required />
      {children}
    </form>
  );
};

export default TaskMessageCreate;
