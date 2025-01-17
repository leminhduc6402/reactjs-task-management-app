import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutApp from "./LayoutApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />,
    children: [
      {
        path: "/",
        element: <div>Hello World</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
