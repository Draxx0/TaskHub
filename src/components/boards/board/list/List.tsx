import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Task from "./task/Task";
import { MoreHorizontal } from "lucide-react";
import { List as IList } from "@/utils/types/list";
import TaskCreate from "./task/TaskCreate";
import { FormObject } from "@/utils/types/form";
import { useTranslation } from "react-i18next";
import DatePicker from "@/components/common/form/DatePicker";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { taskSchemas } from "@/validation/FormSchema";
import { ICreateTask } from "@/utils/types/task";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { firebaseUpdate } from "@/service/firestore/firebaseUpdate";
import { convertToBlob } from "@/utils/functions/convertToBlob";
import { uploadImageInBucket } from "@/service/storage/uploadInBucket";
import { generateUUID } from "@/utils/functions/generateUUID";
import { queryClient } from "@/main";

interface ListProps {
  list: IList;
  index: number;
}

const List = ({ list }: ListProps) => {
  const { t } = useTranslation(["boards", "global"]);
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const formObject: FormObject = {
    formName: "board-list-task-create-form",
    formData: [
      {
        inputName: "task-title",
        inputPlaceholder: t("list.create.task_title_placeholder"),
        inputType: "text",
        labelText: t("list.create.task_title"),
      },
      {
        inputName: "task-content",
        inputPlaceholder: t("list.create.task_description_placeholder"),
        inputType: "text",
        labelText: t("list.create.task_description"),
        isTextarea: true,
      },
    ],
  };

  const formValidation = (
    taskTitle: string,
    taskContent: string,
    taskDueDate: Date,
    taskImage?: File
  ): boolean => {
    try {
      if (taskImage) {
        const result = taskSchemas.createTaskFormSchema.safeParse({
          taskTitle,
          taskContent,
          taskDueDate,
          taskImage: taskImage.name,
        });
        if (!result.success) {
          return false;
        }
        return true;
      }

      const result = taskSchemas.createTaskFormSchema.safeParse({
        taskTitle,
        taskContent,
        taskDueDate,
      });

      if (!result.success) {
        return false;
      }

      return true;
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmitNewTask = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("triggered");
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const title = String(form.get("task-title"));
    const content = String(form.get("task-content"));
    const image = convertToBlob(form.get("task-image") as File);

    console.log("HERRRREE", title, content);

    const isFormValid = formValidation(
      title,
      content,
      date,
      image ?? undefined
    );

    if (!isFormValid) {
      throw new Error("The form is invalid");
    }

    console.log("current list", list);

    try {
      if (image) {
        const imageUrl = await uploadImageInBucket(image);

        await firebaseUpdate.docInCollection<ICreateTask>({
          docReference: {
            path: "lists",
            pathSegments: [list.id],
          },
          updateData: {
            // Un peu perdu sur l'erreur TS ici :'(
            tasks: arrayUnion({
              image: imageUrl,
              title,
              content,
              id: generateUUID(),
              dueDate: Timestamp.fromDate(new Date(date)),
            }),
          },
        });
      } else {
        await firebaseUpdate.docInCollection<ICreateTask>({
          docReference: {
            path: "lists",
            pathSegments: [list.id],
          },
          updateData: {
            // Un peu perdu sur l'erreur TS ici :'(
            tasks: arrayUnion({
              title,
              content,
              id: generateUUID(),
              dueDate: Timestamp.fromDate(new Date(date)),
            }),
          },
        });
      }

      await queryClient.invalidateQueries({
        queryKey: ["collection", "lists"],
      });

      toast({
        title: t("toast.task_success.title"),
      });
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      throw new Error("An error occured during task creation");
    }
  };

  return (
    <div className="bg-gray-100/75 border border-gray-200 rounded-lg relative inline-block min-w-[400px] max-w-[400px] align-top transition ease-in-out overflow-hidden overflow-y-scroll duration-300 p-3 min-h-[600px] max-h-[600px] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full w-2 h-2 ${
              list.color ? `bg-[${list.color}]` : "bg-main-500"
            }`}
          ></div>
          <h2 className="capitalize font-bold cursor-default">{list.title}</h2>
          <div className="flex items-center w-6 h-6 justify-center p-2 bg-gray-200 rounded-full">
            <span className="text-xs font-bold text-gray-400">
              {list.tasks ? list.tasks.length : 0}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
            <TaskCreate
              form={formObject}
              dynamicTranslations={{
                sheetDescription: t("list.create.description"),
                sheetTitle: t("list.create.title"),
                submitText: t("list.create.submit"),
              }}
              onSubmitEvent={handleSubmitNewTask}
            >
              <>
                <div className="flex flex-col gap-2">
                  <label>{t("list.create.task_goal_date")}</label>
                  <DatePicker date={date} setDate={setDate} />
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t("list.create.task_image")}</label>
                  <Input type="file" name="task-image" />
                  <small className="opacity-75">
                    {t("list.create.task_image_optionnal")}
                  </small>
                </div>
              </>
            </TaskCreate>
          </div>
          <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
            <MoreHorizontal size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
      <Droppable droppableId={list.id}>
        {(provided: DroppableProvided) => (
          <div
            className="flex flex-col gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.tasks && list.tasks.length > 0 ? (
              list.tasks.map((task, index) => (
                <Task key={index} task={task} index={index} />
              ))
            ) : (
              <div className="whitespace-normal text-center">
                <p className="opacity-75">
                  Vous n'avez pour le moment aucune tâche dans votre list{" "}
                  <span className="font-bold lowercase">{list.title}</span>
                </p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
