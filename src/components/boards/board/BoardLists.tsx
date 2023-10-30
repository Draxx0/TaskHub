import { useCallback, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import List from "./list/List";
import useGetCollection from "@/hooks/useGetCollection";
import { useParams } from "react-router-dom";
import { List as IList } from "@/utils/types/list";

const BoardLists = () => {
  const { id: boardId } = useParams();

  const { data: lists, refetch } = useGetCollection<IList>({
    docReference: {
      path: "lists",
    },
    condition: {
      leftConditon: "boardId",
      operator: "==",
      rightCondition: boardId,
    },
    queryOptions: {
      enabled: !!boardId,
    },
  });

  useEffect(() => {
    refetch();
  }, [boardId, refetch]);
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      return;

      if (!destination) {
        return;
      }

      if (lists) {
        const sourceList = lists.find((list) => list.id === source.droppableId);
        const destList = lists.find(
          (list) => list.id === destination.droppableId
        );

        const movedCard = sourceList?.tasks[source.index];
        if (movedCard) {
          // Retirez la carte de la liste source
          sourceList.tasks.splice(source.index, 1);

          // Insérez la carte dans la liste de destination à la position appropriée
          if (destList) {
            //   destList.tasks.splice(destination.index, 0, movedCard);
            //   db.collection("lists")
            //     .doc(sourceList.id)
            //     .update({ tasks: sourceList.tasks });
            //   db.collection("lists")
            //     .doc(destList.id)
            //     .update({ tasks: destList.tasks });
            // }
          }
        }
      }
    },
    [lists]
  );

  return (
    <>
      {lists && lists.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
            {lists.map((list, index) => (
              <List key={list.id} list={list} index={index} />
            ))}
          </div>
        </DragDropContext>
      ) : (
        "no list"
      )}
    </>
  );
};

export default BoardLists;
