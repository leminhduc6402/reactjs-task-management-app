import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAppSelector } from "./redux/hook";
import { useEffect } from "react";

const LayoutApp = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.account.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.account.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg`}>
        <div>Navbar</div>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutApp;
