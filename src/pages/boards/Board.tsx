import BoardsCreate from "@/components/boards/BoardCreate";
import Back from "@/components/common/Back";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";
import Error from "@/components/common/error/Error";
import Spinner from "@/components/common/loader/Spinner";
import { TEN_MIN_STATE_TIME } from "@/constant/reactQuery.constant";
import useGetDoc from "@/hooks/useGetDoc";
import { Board as IBoard } from "@/utils/types/board";
import { Workshop } from "@/utils/types/workshop";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Board = () => {
 const { t } = useTranslation(["boards"])
 const { id: boardId, workshopId } = useParams();
 const { data: board, isLoading, isError } = useGetDoc<IBoard>({
  path: "boards",
  pathSegments: [boardId ?? ""],
  queryOptions: {
   staleTime: TEN_MIN_STATE_TIME
  }
 })

 const { data: workshop } = useGetDoc<Workshop>({
  path: "workshops",
  pathSegments: [workshopId ?? ""],
 })

 return (
  <Section>
   <>
    {isLoading ? (
     <Spinner isCentered />
    ) : isError ? (
     <Error />
    ) : (
     <div className="space-y-6">
      <Back url={`/workshops/${workshopId}`} variant="link" translate={`${t("back")} ${workshop?.name}`} />
      <PageHeader title={board.name} description={board.description}>
       <BoardsCreate />
      </PageHeader>
     </div>
    )}
   </>
  </Section>
 );
}

export default Board;