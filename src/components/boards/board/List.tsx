import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Card from "./Card";
import { MoreHorizontal } from "lucide-react";

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: { id: string; title: string; content: string }[];
  };
  index: number;
}

const List = ({ list }: ListProps) => {
  return (
    <div className="bg-gray-100/75 border border-gray-200 rounded-lg relative inline-block min-w-[400px] align-top transition ease-in-out overflow-hidden overflow-y-scroll duration-300 p-3 min-h-[600px] max-h-[600px] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full w-2 h-2 bg-red-600"></div>
          <h2 className="capitalize font-bold">{list.title}</h2>
          <div className="flex items-center w-6 h-6 justify-center p-2 bg-gray-200 rounded-full">
            <span className="text-xs font-bold text-gray-400">
              {list.cards.length}
            </span>
          </div>
        </div>
        <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
          <MoreHorizontal size={20} className="text-gray-400" />
        </div>
      </div>
      <Droppable droppableId={list.id}>
        {(provided: DroppableProvided) => (
          <div
            className="flex flex-col gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards.length > 0 ? (
              list.cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} />
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
