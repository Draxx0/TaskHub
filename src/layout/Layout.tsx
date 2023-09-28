import Header from "../components/common/Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
