import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutApp from "./LayoutApp";
import Project from "./pages/projects";
import ProtectedRoute from "./components/Protected-Route";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LayoutApp />,
      children: [
        {
          path: "/",
          element: <div className="dark:text-gray-400">Hello World</div>,
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/timeline",
          element: <ProtectedRoute children={<div>Timeline </div>} />,
        },
        {
          path: "/search",
          element: <div>Search</div>,
        },
        {
          path: "/home",
          element: <div>Home</div>,
        },
        {
          path: "/settings",
          element: <div>Settings</div>,
        },
        {
          path: "/users",
          element: <div>Users</div>,
        },
        {
          path: "/teams",
          element: <div>Team</div>,
        },
        { path: "/projects/:id", element: <Project /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
