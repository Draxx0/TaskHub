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
        <Link to="/auth/login">Se connecter</Link>
      </ButtonShad>
    );

  return (
    <div className="flex gap-4">
      {user.photoURL ? (
        <div
          className={`bg-[url("${user.photoURL}")] rounded-full bg-cover bg-center w-10 h-10`}
        ></div>
      ) : (
        <p>
          Connected as{" "}
          <span className="font-bold">{user.email?.slice(0, 10) + "..."}</span>
        </p>
      )}
      <ButtonShad onClick={logoutUser}>{t("utils.disconnect")}</ButtonShad>
    </div>
  );
};

export default UserBadgeDisplay;
