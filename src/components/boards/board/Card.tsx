import { CardContent, CardHeader } from "@/components/ui/card";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Card as ShadCard } from "@/components/ui/card";

interface CardProps {
  card: { id: string; content: string };
  index: number;
}

const Card = ({ card, index }: CardProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ShadCard>
            <CardHeader>{card.id}</CardHeader>
            <CardContent>{card.content}</CardContent>
          </ShadCard>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
