import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutApp from "./LayoutApp";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LayoutApp />,
      children: [
        {
          path: "/",
          element: <div>Hello World</div>,
        },
        {
          path: "/timeline",
          element: <div>Timeline</div>,
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
