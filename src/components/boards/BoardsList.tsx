import useGetCollection from "@/hooks/useGetCollection";
import Error from "../common/error/Error";
import SkeletonCard from "../common/loader/SkeletonCard";
import { Board } from "@/utils/types/board";
import { useCallback, useEffect, useState } from "react";
import { firebaseGet } from "@/service/firebaseGet";
import { useParams } from "react-router-dom";
import BoardItem from "./BoardItem";
import { Workshop } from "@/utils/types/workshop";

const BoardsList = () => {
  const [currentWorkshopRef, setCurrentWorkshopRef] = useState<
    Workshop | undefined
  >(undefined);
  const { id } = useParams();

  const fetchCurrentWorkshop = useCallback(async () => {
    if (id) {
      const workshopRef = await firebaseGet.getFirebaseDoc<Workshop>({
        docReference: {
          path: "workshops",
          pathSegments: [id],
        },
      });

      setCurrentWorkshopRef(workshopRef);
    }
  }, [id]);

  useEffect(() => {
    fetchCurrentWorkshop();
  }, [fetchCurrentWorkshop]);

  const {
    data: boards,
    isLoading,
    isError,
  } = useGetCollection<Board, Workshop>({
    docReference: {
      path: "boards",
    },
    condition: {
      leftConditon: "workshop",
      operator: "==",
      rightCondition: currentWorkshopRef,
    },
    queryOptions: {
      enabled: !!currentWorkshopRef,
    },
  });

  return (
    <div
      className={`grid grid-cols-4 gap-8 ${
        boards && boards.length === 0 && "relative h-[65vh]"
      }`}
    >
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : boards ? (
        boards.length > 0 ? (
          boards.map((board) => <BoardItem key={board.id} board={board} />)
        ) : (
          <div className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <img src="../assets/icons/empty-workshops-img.svg" alt="" />
            <p className="text-black/75">
              Vous n'avez pour l'instant aucun tableaux
            </p>
          </div>
        )
      ) : isError ? (
        <Error />
      ) : null}
    </div>
  );
};

export default BoardsList;
