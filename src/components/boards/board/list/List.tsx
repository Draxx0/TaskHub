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

interface ListProps {
  list: IList;
  index: number;
}

const List = ({ list }: ListProps) => {
  const { t } = useTranslation("");
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const formObject: FormObject = {
    formName: "board-list-task-create-form",
    formData: [
      {
        inputName: "task-name",
        inputPlaceholder: t("create.board_title_placeholder"),
        inputType: "text",
        labelText: t("create.board_title"),
      },
      {
        inputName: "task-content",
        inputPlaceholder: t("create.board_description_placeholder"),
        inputType: "text",
        labelText: t("create.board_description"),
        isTextarea: true,
      },
    ],
  };

  const handleSubmitNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <TaskCreate form={formObject} onSubmitEvent={handleSubmitNewTask}>
              <>
                <div className="flex flex-col gap-2">
                  <label>Date d'écheance</label>
                  <DatePicker date={date} setDate={setDate} />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Insérer une image</label>
                  <Input type="file" />
                  <small className="opacity-75">Ce champs est optionnel.</small>
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
