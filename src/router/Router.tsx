import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Workshops from "../pages/Workshops";
import NotFoundPage from "../pages/NotFoundPage";
import AlreadyLogProtect from "./AlreadyLogProtect";
import Auth from "../pages/Auth/Auth";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*---------- Auth Routes ----------*/}
      <Route element={<AlreadyLogProtect />}>
        <Route path="/auth/signin" element={<Auth type="signin" />} />
        <Route path="/auth/login" element={<Auth type="login" />} />
      </Route>
      {/*---------- Auth Routes ----------*/}
      {/*---------- Protected Routes ----------*/}
      <Route element={<ProtectedRoute />}>
        <Route path="/workshops" element={<Workshops />} />
      </Route>
      {/*---------- Protected Routes ----------*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
