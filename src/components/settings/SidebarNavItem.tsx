import { NavLink } from "react-router-dom";

const SidebarNavItem = ({ url, text }: { url: string; text: string; }) => {

 return (
  <li>
   <NavLink to={`/settings/${url}`} className={({ isActive }) => isActive ? "relative font-semibold block before:absolute before:w-full before:h-full before:p-4 before:bg-gray-100/75 before:-z-10 before:-left-4 before:-top-1 before:rounded-lg" : "hover:underline font-semibold"}>
    {text}
   </NavLink>
  </li>
 );
}

export default SidebarNavItem;