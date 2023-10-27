import BoardsCreate from "@/components/boards/BoardCreate";
import BoardsList from "@/components/boards/BoardsList";
import Back from "@/components/common/Back";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";
import Error from "@/components/common/error/Error";
import Spinner from "@/components/common/loader/Spinner";
import { Separator } from "@/components/ui/separator";
import { TEN_MIN_STATE_TIME } from "@/constant/reactQuery.constant";
import useGetDoc from "@/hooks/useGetDoc";
import { Workshop as IWorkshop } from "@/utils/types/workshop";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Workshop = () => {
  const { t } = useTranslation("workshops");
  const { id: workshopId } = useParams();
  const {
    data: workshop,
    isLoading,
    isError,
  } = useGetDoc<IWorkshop>({
    docReference: {
      path: "workshops",
      pathSegments: [workshopId ?? ""],
    },
    queryOptions: {
      staleTime: TEN_MIN_STATE_TIME,
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
            <Back url="/workshops" variant="link" translate={t("back")} />
            <PageHeader
              title={workshop.name}
              description={workshop.description}
            >
              <BoardsCreate />
            </PageHeader>

            <Separator />

            <BoardsList />
          </div>
        )}
      </>
    </Section>
  );
};

export default Workshop;
