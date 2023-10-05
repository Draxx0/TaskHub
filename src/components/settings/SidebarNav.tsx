import { TabItem } from "@/utils/types/settings";
import { useTranslation } from "react-i18next";
import SidebarNavItem from "./SidebarNavItem";

const SidebarNav = () => {
 const { t } = useTranslation("settings");
 const tabs: TabItem[] = t("tabs", { returnObjects: true });
 return (
  <nav>
   <ul className="flex flex-col gap-4">
    {tabs.map((tab, index) => (
     <SidebarNavItem key={index} text={tab.tabData.text} url={tab.tabData.url} />
    ))}
   </ul>
  </nav>
 );
}

export default SidebarNav;