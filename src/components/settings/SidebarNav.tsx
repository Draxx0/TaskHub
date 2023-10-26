import { TabItem } from "@/utils/types/settings";
import SidebarNavItem from "./SidebarNavItem";

const SidebarNav = ({ tabs }: { tabs: TabItem[] }) => {
  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {tabs.map((tab, index) => (
          <SidebarNavItem key={index} text={tab.text} url={tab.url} />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
