import ModalManager from "@components/modal/ModalManager";
import AuthPage from "@features/Auth/page/AuthPage";
import LandingPage from "@features/Landing/page/Landing";
import AddJobPage from "@features/Main/AddJob/page/AddJobPage";
import AllJobs from "@features/Main/AllJobs/page/AllJobs";
import ShareLayout from "@features/Main/Layout/ShareLayout";
import Profile from "@features/Main/Profile/page/Profile";
import ProtectedRoute from "@features/Main/ProtectedRoute";
import SingleJob from "@features/Main/SingleJob/page/SingleJob";
import StatsPage from "@features/Main/Stats/page/StatsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <AuthPage />,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute>
        <ModalManager />
        <ShareLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AllJobs />,
      },
      {
        path: "add-job",
        element: <AddJobPage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: ":id",
        element: <SingleJob />,
      },
    ],
  },
]);
