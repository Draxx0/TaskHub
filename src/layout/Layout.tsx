import { useLocation } from "react-router-dom";
import UserBadgeDisplay from "../components/User/UserBadgeDisplay";
import Header from "../components/common/Header";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactElement }) => {
  const [isAuthPage, setIsAuthPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/auth/")) {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [location.pathname]);

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={!isAuthPage ? "pt-6 px-8 ml-[13%]" : ""}>
        {!isAuthPage && (
          <div className="flex items-center justify-between mb-12">
            <UserBadgeDisplay />
          </div>
        )}
        {children}
      </main>
    </>
  );
};

export default Layout;
