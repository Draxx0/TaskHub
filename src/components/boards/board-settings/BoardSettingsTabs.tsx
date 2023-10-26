import { TabItem } from "@/utils/types/settings";
import BoardsSettingsTabsItem from "./BoardSettinsTabsItem";

const BoardSettingsTabs = ({ tabs }: { tabs: TabItem[] }) => {
  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {tabs.map((tab, index) => (
          <BoardsSettingsTabsItem key={index} text={tab.text} url={tab.url} />
        ))}
      </ul>
    </nav>
  );
};

export default BoardSettingsTabs;
