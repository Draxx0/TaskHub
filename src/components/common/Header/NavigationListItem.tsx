import { NavigationListItem as INavigationListItem } from "@/utils/types/header";
import { NavLink } from "react-router-dom";

const NavigationListItem = ({ item }: { item: INavigationListItem }) => {
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          isActive
            ? "bg-main-500/25 block rounded-md group active"
            : " hover:bg-main-500/25 transition-colors group ease-in-out duration-300 rounded-md block"
        }
      >
        <div
          className={`flex items-center gap-3 p-2 rounded-md cursor-pointer`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            className="group-[.active]:text-main-500 group-hover:text-main-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{
              __html: item.icon,
            }}
          ></svg>
          <p className="font-semibold group-hover:text-main-500 group-[.active]:text-main-500">
            {item.text}
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default NavigationListItem;
