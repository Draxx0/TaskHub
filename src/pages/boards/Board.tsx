import Back from "@/components/common/Back";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";
import Error from "@/components/common/error/Error";
import Spinner from "@/components/common/loader/Spinner";
import { Button } from "@/components/ui/button";
import { TEN_MIN_STATE_TIME } from "@/constant/reactQuery.constant";
import useGetDoc from "@/hooks/useGetDoc";
import { Board as IBoard } from "@/utils/types/board";
import { Workshop } from "@/utils/types/workshop";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

const Board = () => {
  const { t } = useTranslation(["boards"]);
  const { id: boardId, workshopId } = useParams();
  const location = useLocation();
  const {
    data: board,
    isLoading,
    isError,
  } = useGetDoc<IBoard>({
    docReference: {
      path: "boards",
      pathSegments: [boardId ?? ""],
    },
    queryOptions: {
      staleTime: TEN_MIN_STATE_TIME,
      enabled: !!boardId,
    },
  });

  const { data: workshop } = useGetDoc<Workshop>({
    docReference: {
      path: "workshops",
      pathSegments: [workshopId ?? ""],
    },
    queryOptions: {
      enabled: !!workshopId,
    },
  });

  return (
    <Section>
      <>
        {isLoading ? (
          <Spinner isCentered />
        ) : isError ? (
          <Error />
        ) : (
          <div className="space-y-6">
            <Back
              url={`/workshops/${workshopId}`}
              variant="link"
              translate={`${t("back")} ${workshop?.name}`}
            />
            <PageHeader title={board.name} description={board.description}>
              <Button asChild>
                <Link to={`${location.pathname}/settings/general`}>
                  Modifier
                </Link>
              </Button>
            </PageHeader>
          </div>
        )}
      </>
    </Section>
  );
};

export default Board;
