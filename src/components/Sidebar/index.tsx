import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Home,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { setIsSidebarCollapsed } from "../../redux/api/globalSlide";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import queryString from "query-string";
import { IProject } from "../../types/backend";
import { callFetchProject } from "../../config/api";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const user = useAppSelector((state) => state.account.user);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const queryParams = queryString.stringify({
    current: 1,
    pageSize: 1000,
    createdBy: user._id || "",
    populate: "createdBy",
    fields: "createdBy.name,createdBy.email,createdBy.avatar",
  });
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (user._id) {
      const res = await callFetchProject(queryParams);
      if (res && res.data) {
        setProjects(res.data.results || []);
      }
    }
  };

  const [showProjects, setShowProjects] = useState(false);
  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl 
  transition-all duration-300 h-full text-sm z-40 dark:bg-black overflow-y-auto bg-white ${
    isSidebarCollapsed ? "w-0 hidden" : "w-64"
  }
  `;
  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%]  w-full flex-col justify-start">
        <div className="flex justify-end items-center px-6 py-3 border-r border-gray-700">
          {/* <div className="text-xl font-bold">DTT</div> */}

          {isSidebarCollapsed ? null : (
            <button
              className="h-6 w-6 hover:text-gray-400"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="dark:text-white" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <img
            src={`http://localhost:8080/images/${user.avatar}`}
            alt="Logo"
            className="object-cover"
            width={40}
            height={40}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              {user.name || ""}
            </h3>
            <div className="mt-1 flex items-start gap-3">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p
                className={`text-xs ${
                  user.active ? "text-green-500" : "text-red-600"
                }`}
              >
                {user.active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Team" href="/teams" />
        </nav>
        {/* Projects */}
        <button
          onClick={() => setShowProjects(!showProjects)}
          className="flex justify-between px-6 py-4 border-y font-bold text-lg"
        >
          <span className="dark:text-white">Projects</span>
          {showProjects ? (
            <ChevronDown className="dark:text-white" />
          ) : (
            <ChevronRight className="dark:text-white" />
          )}
        </button>
        {/* Projects List */}
        {showProjects &&
          projects &&
          projects.map((project) => (
            <SidebarLink
              key={project._id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project._id}`}
            />
          ))}

        {/* href={`/projects/${project.id}` */}
      </div>
    </div>
  );
};

export default Sidebar;

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = (props: SidebarLinkProps) => {
  const { icon: Icon, label, href } = props;
  const location = useLocation();
  const isActive =
    location.pathname === href ||
    (location.pathname === "/" && href === "/dashboard");

  return (
    <Link to={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-700"></div>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};
