import { Header } from "./header";
import { Sidebar } from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
