import { Menu, Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setIsDarkMode,
  setIsSidebarCollapsed,
} from "../../redux/api/globalSlide";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex justify-between bg-white px-4 py-3 dark:bg-black">
      <div>
        {!isSidebarCollapsed ? null : (
          <button
            className="flex justify-center items-center text-xl font-bold"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-6 w-6 dark:text-white" />
          </button>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded dark:hover:bg-gray-700`
              : `rounded dark:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
