import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Task from "./task/Task";
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
import ListSettings from "./ListSettings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListProps {
  list: IList;
  index: number;
}

const List = ({ list }: ListProps) => {
  const { t } = useTranslation(["boards", "global"]);
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const newTaskFormObject: FormObject = {
    formName: "board-list-task-create-form",
    formData: [
      {
        inputName: "task-title",
        inputPlaceholder: t("list.create-task.task_title_placeholder"),
        inputType: "text",
        labelText: t("list.create-task.task_title"),
      },
      {
        inputName: "task-content",
        inputPlaceholder: t("list.create-task.task_description_placeholder"),
        inputType: "text",
        labelText: t("list.create-task.task_description"),
        isTextarea: true,
      },
    ],
  };

  const formValidation = (
    taskTitle: string,
    taskContent: string,
    taskDueDate: Date,
    taskPriority?: string,
    taskImage?: File
  ): boolean => {
    try {
      if (taskImage) {
        const result = taskSchemas.createTaskFormSchema.safeParse({
          taskTitle,
          taskContent,
          taskDueDate,
          taskPriority,
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
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const title = String(form.get("task-title"));
    const content = String(form.get("task-content"));
    const priority = String(form.get("task-priority"));
    const image = convertToBlob(form.get("task-image") as File);

    const isFormValid = formValidation(
      title,
      content,
      date,
      priority,
      image ?? undefined
    );

    if (!isFormValid) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      throw new Error("The form is invalid");
    }

    try {
      if (image?.name) {
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
              priority,
              id: generateUUID(),
              dueDate: Timestamp.fromDate(new Date(date)),
              messages: [],
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
              priority,
              id: generateUUID(),
              dueDate: Timestamp.fromDate(new Date(date)),
              messages: [],
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
            className={`rounded-full w-2 h-2 
              }`}
            style={
              list.color
                ? { backgroundColor: list.color }
                : { backgroundColor: "#603DE1" }
            }
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
              form={newTaskFormObject}
              dynamicTranslations={{
                sheetDescription: t("list.create-task.description"),
                sheetTitle: t("list.create-task.title"),
                submitText: t("list.create-task.submit"),
              }}
              onSubmitEvent={handleSubmitNewTask}
            >
              <>
                <div className="flex flex-col gap-2">
                  <label>{t("list.create-task.task_goal_date")}</label>
                  <DatePicker date={date} setDate={setDate} />
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t("list.create-task.task_priority")}</label>
                  <Select name="task-priority">
                    <SelectTrigger className="w-full" id="profil">
                      <SelectValue placeholder="Sélectioner une priorité" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectGroup>
                        <SelectLabel>
                          {t("list.create-task.task_priority_placeholder")}
                        </SelectLabel>
                        <SelectItem value={"Low"}>
                          {t("list.create-task.task_priority_low")}
                        </SelectItem>
                        <SelectItem value={"Medium"}>
                          {t("list.create-task.task_priority_medium")}
                        </SelectItem>
                        <SelectItem value={"High"}>
                          {t("list.create-task.task_priority_high")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t("list.create-task.task_image")}</label>
                  <Input type="file" name="task-image" />
                  <small className="opacity-75">
                    {t("list.create-task.task_image_optionnal")}
                  </small>
                </div>
              </>
            </TaskCreate>
          </div>
          <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
            <ListSettings
              dynamicTranslations={{
                sheetDescription: t("list.update-list.description"),
                sheetTitle: t("list.update-list.title"),
                submitText: t("list.update-list.submit"),
              }}
              listData={list}
            />
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
                  Vous n'avez pour le moment aucune tâche dans votre liste{" "}
                  <span className="font-bold">{list.title}</span>
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
