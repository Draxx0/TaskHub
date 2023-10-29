import { IAvatar } from "@/utils/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const AvatarSelection = ({
  url,
  fallback,
  width,
  className,
}: Omit<IAvatar, "avatar_name"> & { className?: string }) => {
  return (
    <Avatar>
      <AvatarImage
        src={url}
        className={`${className ? className : ""} ${width}`}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarSelection;
