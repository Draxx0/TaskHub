import { Link } from "react-router-dom";
import { useUserStore } from "../../store/user.store";
import { Button as ButtonShad } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

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
        <img src={user.photoURL} alt="user profile picture" className="rounded-full bg-cover bg-center w-10 h-10" />
      ) : (
        <p>
          Connected as {user.displayName || user.email?.slice(0, 10) + "..."}
        </p>
      )}
      <ButtonShad onClick={logoutUser}>{t("utils.disconnect")}</ButtonShad>
    </div>
  );
};

export default UserBadgeDisplay;
