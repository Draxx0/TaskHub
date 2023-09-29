import UserBadgeDisplay from "../components/User/UserBadgeDisplay";
import Header from "../components/common/Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header />
      <main className="ml-[13%] pt-6 px-8">
        <div className="bg-red-300 flex items-center justify-between">
          <p>search ?</p>
          <UserBadgeDisplay />
        </div>
        {children}
      </main>
    </>
  );
};

export default Layout;
