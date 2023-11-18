import { useCallback, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import List from "./list/List";
import useGetCollection from "@/hooks/useGetCollection";
import { useParams } from "react-router-dom";
import { List as IList } from "@/utils/types/list";
import { firebaseUpdate } from "@/service/firestore/firebaseUpdate";

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
    async (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if (lists) {
        const sourceList = lists?.find(
          (list) => list.id === source.droppableId
        );

        const destList = lists?.find(
          (list) => list.id === destination?.droppableId
        );

        const movedCard = sourceList?.tasks[source.index];

        if (movedCard) {
          sourceList.tasks.splice(source.index, 1);
          if (destList) {
            destList.tasks.splice(destination.index, 0, movedCard);

            if (sourceList && destList) {
              await Promise.all([
                firebaseUpdate.docInCollection<IList>({
                  docReference: {
                    path: "lists",
                    pathSegments: [sourceList.id],
                  },
                  updateData: {
                    ...sourceList,
                    tasks: sourceList.tasks,
                  },
                }),
                firebaseUpdate.docInCollection<IList>({
                  docReference: {
                    path: "lists",
                    pathSegments: [destList.id],
                  },
                  updateData: {
                    ...destList,
                    tasks: destList.tasks,
                  },
                }),
              ]);
            }
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
