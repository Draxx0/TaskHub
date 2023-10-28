import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Card from "./Card";
import { Card as ShadCard } from "@/components/ui/card";

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: { id: string; content: string }[];
  };
  index: number;
}

const List = ({ list }: ListProps) => {
  return (
    <ShadCard className="hover:border-main-500 inline-block min-w-[400px] align-top transition ease-in-out overflow-hidden overflow-y-scroll duration-300 p-3 min-h-[600px] max-h-[600px] space-y-6">
      <h2 className="text-xl text-main-500 uppercase font-bold">
        {list.title} ({list.cards.length})
      </h2>
      <Droppable droppableId={list.id}>
        {(provided: DroppableProvided) => (
          <div
            className="flex flex-col gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ShadCard>
  );
};

export default List;
