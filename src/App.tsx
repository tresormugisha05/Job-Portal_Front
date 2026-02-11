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
import CandidateDashboard from "./shared/components/pages/dashboard/candidate/CandidateDashboard";
import EmployerDashboard from "./shared/components/pages/dashboard/employer/EmployerDashboard";
import AdminDashboard from "./shared/components/pages/dashboard/admin/AdminDashboard";
import PostJob from "./shared/components/pages/dashboard/employer/PostJob";
import CandidateProfile from "./shared/components/pages/dashboard/candidate/CandidateProfile";

// Candidate Dashboard Pages
import AppliedJobs from "./shared/components/pages/dashboard/candidate/AppliedJobs";
import SavedJobs from "./shared/components/pages/dashboard/candidate/SavedJobs";

// Employer Dashboard Pages
import ManageJobs from "./shared/components/pages/dashboard/employer/ManageJobs";
import Applicants from "./shared/components/pages/dashboard/employer/Applicants";

// Admin Dashboard Pages
import AdminStats from "./shared/components/pages/dashboard/admin/AdminStats";
import AdminJobs from "./shared/components/pages/dashboard/admin/AdminJobs";
import AdminUsers from "./shared/components/pages/dashboard/admin/AdminUsers";
import AdminApplications from "./shared/components/pages/dashboard/admin/AdminApplications";
import AdminCategories from "./shared/components/pages/dashboard/admin/AdminCategories";

// Shared Dashboard Pages
import Settings from "./shared/components/pages/dashboard/components/Settings";

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

          {/* Candidate Dashboard */}
          <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
          <Route path="/dashboard/applied-jobs" element={<AppliedJobs />} />
          <Route path="/dashboard/saved-jobs" element={<SavedJobs />} />
          <Route path="/dashboard/profile" element={<CandidateProfile />} />

          {/* Employer Dashboard */}
          <Route path="/dashboard/employer" element={<EmployerDashboard />} />
          <Route path="/dashboard/manage-jobs" element={<ManageJobs />} />
          <Route path="/dashboard/post-job" element={<PostJob />} />
          <Route path="/dashboard/applicants" element={<Applicants />} />

          {/* Admin Dashboard */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/stats" element={<AdminStats />} />
          <Route path="/dashboard/admin/jobs" element={<AdminJobs />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/applications" element={<AdminApplications />} />
          <Route path="/dashboard/admin/categories" element={<AdminCategories />} />

          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
