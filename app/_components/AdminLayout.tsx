import Header from "./Header";
import Sidebar from "./Sidebar";

export const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Header />
    </div>
  );
};
