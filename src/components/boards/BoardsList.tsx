import useGetCollection from "@/hooks/useGetCollection";
import Error from "../common/error/Error";
import SkeletonCard from "../common/loader/SkeletonCard";
import { Board } from "@/utils/types/board";
import { useParams } from "react-router-dom";
import BoardItem from "./BoardItem";

const BoardsList = () => {
  const { id: workshopId } = useParams();

  const {
    data: boards,
    isLoading,
    isError,
  } = useGetCollection<Board>({
    docReference: {
      path: "boards",
    },
    condition: {
      leftConditon: "workshopId",
      operator: "==",
      rightCondition: workshopId,
    },
    queryOptions: {
      enabled: !!workshopId,
      staleTime: 0,
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
