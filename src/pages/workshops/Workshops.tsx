import WorkshopCreate from "@/components/workshop/WorkshopCreate";
import { useTranslation } from "react-i18next";
import WorkshopsList from "./WorkshopsList";

const Workshops = () => {
  const { t } = useTranslation(["workshops"]);

  return (
    <section className="space-y-10">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-secondary-500 font-bold text-3xl">
            {t("header.title")}
          </h1>
          <p className="opacity-75">{t("header.description")}</p>
        </div>
        <WorkshopCreate />
      </div>

      <WorkshopsList />
    </section>
  );
};

export default Workshops;
