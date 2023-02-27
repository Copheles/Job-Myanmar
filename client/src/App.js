import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddJob from "./pages/main/AddJob";
import AllJobs from "./pages/main/AllJobs";
import Job from "./pages/main/Job";
import Profile from "./pages/main/Profile";
import ShareLayout from "./pages/main/ShareLayout";
import Stats from "./pages/main/Stats";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ShareLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="stats" element={<Stats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job/:id" element={<Job />} />
        </Route>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
