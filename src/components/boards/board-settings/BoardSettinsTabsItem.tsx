import { formatCurrentPathname } from "@/utils/functions/formatCurrentPathname";
import { NavLink, useLocation } from "react-router-dom";

const BoardsSettingsTabsItem = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  const location = useLocation();
  return (
    <li>
      <NavLink
        to={`${formatCurrentPathname(location.pathname, url)}`}
        className={({ isActive }) =>
          isActive
            ? "relative font-semibold block before:absolute before:w-full before:h-full before:p-4 before:bg-gray-100/75 before:-z-10 before:-left-4 before:-top-1 before:rounded-lg"
            : "hover:underline font-semibold"
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default BoardsSettingsTabsItem;
