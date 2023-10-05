import { IAvatar } from "@/utils/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const AvatarSelection = ({ url, fallback, width }: Omit<IAvatar, "avatar_name">) => {
 return (
  <Avatar>
   <AvatarImage src={url} className={width} />
   <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
 );
}

export default AvatarSelection;