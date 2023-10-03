import { Link } from "react-router-dom";
import { useUserStore } from "../../store/user.store";
import { Button as ButtonShad } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { getAuth, updateProfile } from "firebase/auth";

const UserBadgeDisplay = () => {
  const { t } = useTranslation(["auth"]);
  const { user, logoutUser, insertUser } = useUserStore();

  if (!user)
    return (
      <ButtonShad asChild>
        <Link to="/auth/login">{t("utils.connect")}</Link>
      </ButtonShad>
    );

  //! WORKS
  const testChangeUserName = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: "",
      }).then(() => {
        insertUser(currentUser);
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user.photoURL ? (
        <div
          className={`bg-[url("${user.photoURL}")] rounded-full bg-cover bg-center w-10 h-10`}
        ></div>
      ) : (
        <p>
          Connected as {user.displayName || user.email?.slice(0, 10) + "..."}
        </p>
      )}
      <ButtonShad onClick={logoutUser}>{t("utils.disconnect")}</ButtonShad>

      <ButtonShad onClick={testChangeUserName}>Change name</ButtonShad>
    </div>
  );
};

export default UserBadgeDisplay;
