import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user.store";
import { Button as ButtonShad } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import UserMenuDropdown from "./UserMenuDropdown";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { signOut } from "firebase/auth";
import { auth } from "@/service/firebase.config";

const UserBadgeDisplay = () => {
  const { t } = useTranslation(["auth"]);
  const { user, logoutUser: logoutUserInZustand } = useUserStore();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      logoutUserInZustand();
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/auth/login");
    } catch (error) {
      console.error("Error during disconnect :", error);
      throw new Error("Error during disconnect");
    }
  };

  const logoutMutation = useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!user)
    return (
      <ButtonShad asChild>
        <Link to="/auth/login">{t("utils.connect")}</Link>
      </ButtonShad>
    );

  return (
    <div className="flex items-center gap-4">
      {user.photoURL ? (
        <UserMenuDropdown photoURL={user.photoURL} logout={handleLogout} />
      ) : null}
    </div>
  );
};

export default UserBadgeDisplay;
