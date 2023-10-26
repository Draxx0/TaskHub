import { Separator } from "@/components/ui/separator";
import ProfilSettingsTabs from "../../components/settings/SidebarNav";
import { useTranslation } from "react-i18next";
import { TabItem } from "@/utils/types/settings";

const Settings = ({ children }: { children: React.ReactElement }) => {
  const { t } = useTranslation("settings");
  const tabs: TabItem[] = t("tabs", { returnObjects: true });
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{t("page.title")}</h1>
          <p className="opacity-75">{t("page.description")}</p>
        </div>
        <Separator />

        <div className="flex gap-10">
          <div className="w-1/5">
            <ProfilSettingsTabs tabs={tabs} />
          </div>
          <div className="w-4/5 max-w-3xl">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
