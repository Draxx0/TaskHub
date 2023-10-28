import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import List from "./List";

const Board = () => {
  const [lists, setLists] = useState<{
    [key: string]: {
      id: string;
      title: string;
      cards: { id: string; content: string }[];
    };
  }>({
    "list-1": {
      id: "list-1",
      title: "Todo",
      cards: [
        { id: "card-1", content: "Task 1" },
        { id: "card-2", content: "Task 2" },
        { id: "card-3", content: "Task 3" },
        { id: "card-4", content: "Task 4" },
        { id: "card-5", content: "Task 5" },
        { id: "card-6", content: "Task 6" },
      ],
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      cards: [],
    },
    "list-3": {
      id: "list-3",
      title: "Done",
      cards: [],
    },
    "list-4": {
      id: "list-4",
      title: "Archived",
      cards: [],
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log("source", source, "destionation", destination);

    // Si la carte n'a pas été déposée dans une zone valide, ne rien faire
    if (!destination) {
      return;
    }

    // Copiez les listes actuelles pour éviter de muter l'état directement
    const newLists = { ...lists };

    // Obtenez la liste source et la liste de destination
    const sourceList = newLists[source.droppableId];
    const destList = newLists[destination.droppableId];

    // Retirez la carte de la liste source
    const [movedCard] = sourceList.cards.splice(source.index, 1);

    // Insérez la carte dans la liste de destination à la position appropriée
    destList.cards.splice(destination.index, 0, movedCard);

    // Mettez à jour l'état avec les nouvelles listes
    setLists(newLists);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
        {Object.keys(lists).map((listId, index) => (
          <List key={listId} list={lists[listId]} index={index} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
