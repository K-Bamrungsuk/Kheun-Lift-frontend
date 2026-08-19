import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Public from "../pages/Public";
import Leaderboard from "../pages/Leaderboard";

import ProtectRoute from "./ProtectRoute";
import GuestRoute from "./GuestRoute";

const router = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <Public />,
  },

  // Guest: Not loging in
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // User: login as a user
  {
    element: <ProtectRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard/>
      }
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);


function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
