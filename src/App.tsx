import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/AuthContext";
import HomePage from "./shared/components/pages/HomePage";
import JobsListPage from "./shared/components/pages/JobsListPage";
import JobDetailPage from "./shared/components/pages/JobDetailPage";
import CandidatesListPage from "./shared/components/pages/CandidatesListPage";
import CandidateDetailPage from "./shared/components/pages/CandidateDetailPage";
import EmployerListPage from "./shared/components/pages/EmployerListPage";
import EmployerDetailPage from "./shared/components/pages/EmployerDetailPage";
import BlogPage from "./shared/components/pages/BlogPage";
import BlogDetailPage from "./shared/components/pages/BlogDetailPage";
import ContactPage from "./shared/components/pages/contactPage";
import PricingTablesPage from "./shared/components/pages/PricingTablesPage";
import PostJobPage from "./shared/components/pages/PostJobPage";
import LoginPage from "./shared/components/pages/LoginPage";
import RegisterPage from "./shared/components/pages/RegisterPage";

// Dashboards
import DashboardRedirect from "./shared/components/pages/dashboard/DashboardRedirect";
import CandidateDashboard from "./shared/components/pages/dashboard/CandidateDashboard";
import EmployerDashboard from "./shared/components/pages/dashboard/EmployerDashboard";
import AdminDashboard from "./shared/components/pages/dashboard/AdminDashboard";
import PostJob from "./shared/components/pages/dashboard/PostJob";
import CandidateProfile from "./shared/components/pages/dashboard/CandidateProfile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsListPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/candidates" element={<CandidatesListPage />} />
          <Route path="/candidates/:id" element={<CandidateDetailPage />} />
          <Route path="/employers" element={<EmployerListPage />} />
          <Route path="/employers/:id" element={<EmployerDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingTablesPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/dashboard/applied-jobs" element={<CandidateDashboard />} />
          <Route path="/dashboard/saved-jobs" element={<CandidateDashboard />} />
          <Route path="/dashboard/profile" element={<CandidateProfile />} />

          <Route path="/dashboard/manage-jobs" element={<EmployerDashboard />} />
          <Route path="/dashboard/post-job" element={<PostJob />} />
          <Route path="/dashboard/applicants" element={<EmployerDashboard />} />

          <Route path="/dashboard/admin/stats" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/jobs" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AdminDashboard />} />

          <Route path="/dashboard/settings" element={<CandidateDashboard />} /> {/* Shared settings placeholder */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
