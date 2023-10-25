import { useTranslation } from "react-i18next";

const BoardSettings = () => {
  const { t } = useTranslation(["boards"]);
  return (
    <div>
      <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
      <p className="opacity-75">{t("settings.description")}</p>
    </div>
  );
};

export default BoardSettings;
