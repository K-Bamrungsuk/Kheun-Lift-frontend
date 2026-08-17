import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

const commonPath = [
    { path: "/public", element: <p>public</p> }
];

const guestRouter = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "*", element: <Navigate to="/" /> },
  ...commonPath,
]);

const userRoute = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "", Component: Home },
      { path: "profile", Component: Profile },
      { path: "*", element: <Navigate to="/" /> },
      ...commonPath,
    ],
  },
]);

function AppRouter() {
    // const user = "aaaaaa";
  const user = null;
  const finalRouter = user ? userRouter : guestRouter;

  return <RouterProvider router={finalRouter} />;
}

export default AppRouter;
