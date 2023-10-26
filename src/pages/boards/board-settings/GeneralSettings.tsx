import TabHeader from "@/components/common/settings/TabHeader";
import { useTranslation } from "react-i18next";

const GeneralSettings = () => {
  const { t } = useTranslation("boards");
  return (
    <div className="space-y-10">
      <TabHeader
        tabTitle={t("settings.general.title")}
        tabDescription={t("settings.general.description")}
      />
    </div>
  );
};

export default GeneralSettings;
