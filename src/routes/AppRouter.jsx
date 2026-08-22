import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Public from "../pages/Public";
import Register from "../pages/Register";

import GuestRoute from "../routes/GuestRoute";
import ProtectRoute from "../routes/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
  },

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

  {
    element: <ProtectRoute />,
    children: [
      {
        element: <MainLayout />,
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
            element: <Leaderboard />,
          },
        ],
      },
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
