import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n.js";

// Components
import LoadingSpinner from "./components/LoadingSpinner";

// Main Layout
import MainLayout from "./layouts/MainLayout";

// Pages - Public
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Events from "./pages/Events";
import EventDetailsPage from "./pages/EventDetailsPage";
import News from "./pages/News";
import VacanciesPage from "./pages/VacanciesPage";
import ApplicantPage from "./pages/AdminApplicationsPage.jsx"
import Directorate from "./pages/Directorate";
import Services from "./pages/Service.jsx";  
import NewsDetailsPage from "./pages/NewsDetailPage";
import ContactPage from "./pages/ContactPage";

// Pages - Auth
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

// Pages - Admin
import AdminProgramsPage from "./pages/AdminProgramsPage";
import AdminEventsPage from "./pages/AdminEventsPage";
import AdminNewsPage from "./pages/AdminNewsPage";
import AdminDirectoratePage from "./pages/AdminDirectoratePage";
import AdminJobsPage from "./pages/AdminJobsPage";

import AdminRoute from "./routes/Admin.route";
import AdminLayout from "./layouts/AdminLayout"; // You should create this layout

// Store
import { useAuthStore } from "./store/authStore";
import AuthLayout from "./layouts/AuthLayout.jsx";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

// Redirect authenticated users away from auth pages
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="">
      <Routes>
        {/* Public Pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/directorate" element={<Directorate />} />
          <Route path="/services" element={<Services />} />
        </Route>

        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/news/:id" element={<NewsDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Route>

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="programs" element={<AdminProgramsPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="news" element={<AdminNewsPage />} />
            <Route path="directorate" element={<AdminDirectoratePage />} />
            <Route path="jobs" element={<AdminJobsPage />} />
            <Route path="applications" element={<ApplicantPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
