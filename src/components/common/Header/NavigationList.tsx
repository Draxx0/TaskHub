import { NavigationListItem as INavigationListItem } from "@/utils/types/header";
import { useTranslation } from "react-i18next";
import NavigationListItem from "./NavigationListItem";

const NavigationList = () => {
  const { t } = useTranslation(["global"]);
  const navigationItems: INavigationListItem[] = t("navigation_items", {
    returnObjects: true,
  });
  return (
    <ul>
      {navigationItems.map((item, index) => (
        <NavigationListItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default NavigationList;
