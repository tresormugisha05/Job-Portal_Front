import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import JobsListPage from "./pages/Jobs/JobsListPage";
import JobDetailPage from "./pages/Jobs/JobDetailPage";
import CandidatesListPage from "./pages/Candidates/CandidatesListPage";
import CandidateDetailPage from "./pages/Candidates/CandidateDetailPage";
import EmployerListPage from "./pages/Employer/EmployerListPage";
import EmployerDetailPage from "./pages/Employer/EmployerDetailPage";
import BlogPage from "./pages/Blogs/BlogPage";
import BlogDetailPage from "./pages/Blogs/BlogDetailPage";
import ContactPage from "./pages/contactPage";
import PricingTablesPage from "./pages/PricingTablesPage";
import PostJobPage from "./pages/Jobs/PostJobPage";
import LoginPage from "./pages/Authentication/LoginPage";
import RegisterPage from "./pages/Authentication/RegisterPage";
import PendingVerification from "./pages/PendingVerification";
import DashboardRedirect from "./pages/dashboard/DashboardRedirect";
import CandidateDashboard from "./pages/dashboard/candidate/CandidateDashboard";
import EmployerDashboard from "./pages/dashboard/employer/EmployerDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import PostJob from "./pages/dashboard/employer/PostJob";
import CandidateProfile from "./pages/dashboard/candidate/CandidateProfile";
import CompanyProfile from "./pages/dashboard/employer/CompanyProfile";
import AppliedJobs from "./pages/dashboard/candidate/AppliedJobs";
import SavedJobs from "./pages/dashboard/candidate/SavedJobs";
import ManageJobs from "./pages/dashboard/employer/ManageJobs";
import Applicants from "./pages/dashboard/employer/Applicants";
import AdminStats from "./pages/dashboard/admin/AdminStats";
import AdminJobs from "./pages/dashboard/admin/AdminJobs";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminApplications from "./pages/dashboard/admin/AdminApplications";
import AdminCategories from "./pages/dashboard/admin/AdminCategories";
import AdminEmployers from "./pages/dashboard/admin/AdminEmployers";
import Settings from "./pages/dashboard/components/Settings";
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
          <Route
            path="/pending-verification"
            element={<PendingVerification />}
          />

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
          <Route
            path="/dashboard/company-profile"
            element={<CompanyProfile />}
          />

          {/* Admin Dashboard */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/stats" element={<AdminStats />} />
          <Route path="/dashboard/admin/jobs" element={<AdminJobs />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route
            path="/dashboard/admin/applications"
            element={<AdminApplications />}
          />
          <Route
            path="/dashboard/admin/categories"
            element={<AdminCategories />}
          />
          <Route
            path="/dashboard/admin/employers"
            element={<AdminEmployers />}
          />

          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
