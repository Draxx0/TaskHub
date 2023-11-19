import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetFirebaseUser from "@/hooks/useGetFirebaseUser";
import { Message } from "@/utils/types/task";
import clsx from "clsx";

const TaskMessage = ({ message }: { message: Message }) => {
  const { user } = useGetFirebaseUser();
  const messageContainerClasses = clsx(
    {
      "items-center": message.content.length < 150,
      "flex-row-reverse": message.user.uid === user?.uid,
    },
    "flex gap-3 transition ease-in-out duration-300 animate-fade-in"
  );
  return (
    <div className={messageContainerClasses}>
      <div>
        {message.user.photoURL ? (
          <Avatar>
            <>
              <AvatarImage
                src={message.user.photoURL}
                className={
                  "rounded-full object-cover w-10 h-10 cursor-pointer transition-opacity ease-in-out duration-300"
                }
              />
              <AvatarFallback>
                <img
                  src="./assets/icons/fallback.png"
                  alt=""
                  className={
                    "rounded-full object-cover w-10 h-10 cursor-pointer transition-opacity ease-in-out duration-300"
                  }
                />
              </AvatarFallback>
            </>
          </Avatar>
        ) : !message.user.photoURL && message.user.displayName ? (
          <div className="rounded-full object-cover flex items-center justify-center w-10 h-10 bg-main-500/30 cursor-pointer transition-opacity ease-in-out duration-300">
            <span className="text-main-500 uppercase font-bold text-lg">
              {message.user.displayName?.slice(0, 1)}
            </span>
          </div>
        ) : (
          <div className="rounded-full object-cover flex items-center justify-center w-10 h-10 bg-main-500/30 cursor-pointer transition-opacity ease-in-out duration-300">
            <span className="text-main-500 uppercase font-bold text-lg">
              {message.user.email?.slice(0, 1)}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white shadow-sm border flex gap-2 flex-wrap border-main-500 py-4 px-6 rounded-xl flex-1">
        <span className="font-bold">
          {message.user.displayName || message.user.email?.slice(0, 4)} :
        </span>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default TaskMessage;
