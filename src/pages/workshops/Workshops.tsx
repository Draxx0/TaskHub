import WorkshopCreate from "@/components/workshops/WorkshopCreate";
import { useTranslation } from "react-i18next";
import WorkshopsList from "../../components/workshops/WorkshopsList";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";

const Workshops = () => {
  const { t } = useTranslation(["workshops"]);

  return (
    <Section>
      <>
        <PageHeader title={t("header.title")} description={t("header.description")}>
          <WorkshopCreate />
        </PageHeader>

        <WorkshopsList />
      </>
    </Section>
  );
};

export default Workshops;
