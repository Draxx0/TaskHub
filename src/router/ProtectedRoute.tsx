import { useUserStore } from "../store/user.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useUserStore();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
