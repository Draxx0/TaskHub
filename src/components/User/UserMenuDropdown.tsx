import { LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UserMenuDropdown = ({ photoURL, logout }: { photoURL: string; logout: () => void }) => {
 const { t } = useTranslation("auth")
 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <img src={photoURL} alt="user profile picture" className="rounded-full bg-cover bg-center w-10 h-10 cursor-pointer transition-opacity ease-in-out duration-300 hover:opacity-75" />
   </DropdownMenuTrigger>
   <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
     <Link to="/settings/profile">
      <DropdownMenuItem>
       <User className="mr-2 h-4 w-4" />
       <span>Profile</span>
      </DropdownMenuItem>
     </Link>
     <Link to="/settings/account">
      <DropdownMenuItem>
       <Settings className="mr-2 h-4 w-4" />
       <span>Settings</span>
      </DropdownMenuItem>
     </Link>
    </DropdownMenuGroup>
    {/* <DropdownMenuSeparator />
    <DropdownMenuGroup>
     <DropdownMenuItem>
      <Users className="mr-2 h-4 w-4" />
      <span>Team</span>
     </DropdownMenuItem>
     <DropdownMenuSub>
      <DropdownMenuSubTrigger>
       <UserPlus className="mr-2 h-4 w-4" />
       <span>Invite users</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
       <DropdownMenuSubContent>
        <DropdownMenuItem>
         <Mail className="mr-2 h-4 w-4" />
         <span>Email</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
         <MessageSquare className="mr-2 h-4 w-4" />
         <span>Message</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
         <PlusCircle className="mr-2 h-4 w-4" />
         <span>More...</span>
        </DropdownMenuItem>
       </DropdownMenuSubContent>
      </DropdownMenuPortal>
     </DropdownMenuSub>
    </DropdownMenuGroup> */}
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={logout}>
     <LogOut className="mr-2 h-4 w-4" />
     <span>{t("utils.disconnect")}</span>
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}

export default UserMenuDropdown;