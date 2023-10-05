import { Link } from "react-router-dom";
import { useUserStore } from "../../store/user.store";
import { Button as ButtonShad } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import UserMenuDropdown from "./UserMenuDropdown";

const UserBadgeDisplay = () => {
  const { t } = useTranslation(["auth"]);
  const { user, logoutUser } = useUserStore();

  if (!user)
    return (
      <ButtonShad asChild>
        <Link to="/auth/login">{t("utils.connect")}</Link>
      </ButtonShad>
    );

  return (
    <div className="flex items-center gap-4">
      {user.photoURL ? (
        <UserMenuDropdown photoURL={user.photoURL} logout={logoutUser} />
      ) : (
        <p>
          Connected as {user.displayName || user.email?.slice(0, 10) + "..."}
        </p>
      )}
    </div>
  );
};

export default UserBadgeDisplay;
