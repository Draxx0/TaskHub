import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const AlreadyLogProtect = () => {
  const { user } = useUserStore();

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default AlreadyLogProtect;
