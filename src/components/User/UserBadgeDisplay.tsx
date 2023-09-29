import { useUserStore } from "../../store/user.store";
import Button from "../common/Button";

const UserBadgeDisplay = () => {
  const { user, logoutUser } = useUserStore();

  if (!user) return <Button text="Se connecter" url="/auth/login" />;

  return (
    <div className="flex gap-4">
      <div className="bg-gray-200 rounded-full w-10 h-10">
        <p>William</p>
      </div>
      <Button onClickEvent={logoutUser} text="Se déconnecter" />
    </div>
  );
};

export default UserBadgeDisplay;
