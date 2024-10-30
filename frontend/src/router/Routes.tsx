import AuthPage from "@features/Auth/page/AuthPage";
import LandingPage from "@features/Landing/page/Landing";
import AllJobs from "@features/Main/AllJobs/page/AllJobs";
import ShareLayout from "@features/Main/Layout/ShareLayout";
import Profile from "@features/Main/Profile/page/Profile";
import ProtectedRoute from "@features/Main/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ShareLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AllJobs />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
