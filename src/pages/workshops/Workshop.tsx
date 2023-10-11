import Back from "@/components/common/Back";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";
import Error from "@/components/common/error/Error";
import Spinner from "@/components/common/loader/Spinner";
import { TEN_MIN_STATE_TIME } from "@/constant/reactQuery.constant";
import useGetDoc from "@/hooks/useGetDoc";
import { Workshop as IWorkshop } from "@/utils/types/workshop";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Workshop = () => {
 const { t } = useTranslation("workshop")
 const { id: workshopId } = useParams();
 const { data: workshop, isLoading, isError } = useGetDoc<IWorkshop>({
  path: "workshops",
  pathSegments: [workshopId ?? ""],
  queryOptions: {
   staleTime: TEN_MIN_STATE_TIME
  }
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
      <Back url="/workshops" variant="link" translate={t("back")} />
      <PageHeader title={workshop.name} description={workshop.description} />
     </div>
    )}
   </>
  </Section>
 );
}

export default Workshop;