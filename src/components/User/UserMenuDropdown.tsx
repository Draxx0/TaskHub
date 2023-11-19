import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const UserMenuDropdown = ({
  photoURL,
  logout,
}: {
  photoURL: string;
  logout: () => void;
}) => {
  const { t } = useTranslation("auth");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <>
            <AvatarImage
              src={photoURL}
              className={
                "rounded-full object-cover w-10 h-10 cursor-pointer transition-opacity ease-in-out duration-300 hover:opacity-75"
              }
            />
            <AvatarFallback>
              <img
                src="./assets/icons/fallback.png"
                alt=""
                className={
                  "rounded-full object-cover w-10 h-10 cursor-pointer transition-opacity ease-in-out duration-300 hover:opacity-75"
                }
              />
            </AvatarFallback>
          </>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("dropdown.title")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/settings/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>{t("dropdown.profile")}</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/settings/account">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("dropdown.account")}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("utils.disconnect")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuDropdown;
