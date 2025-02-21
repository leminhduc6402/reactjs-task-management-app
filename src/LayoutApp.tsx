import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAppSelector } from "./redux/hook";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

const LayoutApp = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  return (
    <div className="flex min-h-screen w-full bg-gray-100 ">
      {isAuthenticated && <Sidebar />}
      <main
        className={`flex w-full flex-col dark:bg-gray-800 dark:text-white ${
          isAuthenticated && !isSidebarCollapsed ? "md:pl-64" : ""
        }`}
      >
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutApp;
