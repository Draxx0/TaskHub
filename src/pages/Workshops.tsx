import { useTranslation } from "react-i18next";

const Workshops = () => {
  const { t } = useTranslation(["workshops"]);
  return (
    <section>
      <h1 className="text-secondary-500 font-bold text-3xl">
        {t("header.title")}
      </h1>
      <p>{t("header.description")}</p>
    </section>
  );
};

export default Workshops;
