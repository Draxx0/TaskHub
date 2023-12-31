import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/common/header/Header";
import UserBadgeDisplay from "@/components/user/UserBadgeDisplay";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";

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
            <Input placeholder="search..." className="max-w-lg" />
            <UserBadgeDisplay />
          </div>
        )}
        {children}
      </main>
      <Toaster />
    </>
  );
};

export default Layout;
