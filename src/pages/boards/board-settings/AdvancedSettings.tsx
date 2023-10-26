import TabHeader from "@/components/common/settings/TabHeader";
import { useTranslation } from "react-i18next";

const AdvancedSettings = () => {
  const { t } = useTranslation("boards");
  return (
    <div className="space-y-10">
      <TabHeader
        tabTitle={t("settings.advanced.title")}
        tabDescription={t("settings.advanced.description")}
      />
    </div>
  );
};

export default AdvancedSettings;
