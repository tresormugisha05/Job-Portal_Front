import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidatesListPage from "./shared/components/pages/CandidatesListPage";
import JobDetailPage from "./shared/components/pages/JobDetailPage";
import JobsListPage from "./shared/components/pages/JobsListPage";
import PostJobPageIntegrated from "./shared/components/pages/PostJobPageIntegrated";
import PricingTablesPage from "./shared/components/pages/PricingTablesPage";
import HomePage from "./shared/components/pages/HomePage";
import EmployerListPage from "./shared/components/pages/EmployerListPage";
import ApplicationsPage from "./shared/components/pages/ApplicationsPage";
import ApplicationPageRoute from "./shared/components/pages/auth/ApplicationPageRoute";
import ProtectedRoute from "./shared/components/pages/ProtectedRoute";
import EmployerDashboard from "./shared/components/pages/EmployerDashboard";
import ProfilePage from "./shared/components/pages/ProfilePage";
import AdminDashboard from "./shared/components/pages/AdminDashboard";
import AnalyticsPage from "./shared/components/pages/AnalyticsPage";

import EmployerDetailPage from "./shared/components/pages/EmployerDetailPage";
import BlogPage from "./shared/components/pages/BlogPage";
import BlogDetailPage from "./shared/components/pages/BlogDetailPage";
import ContactPage from "./shared/components/pages/contactPage";
import { AuthProvider } from "./shared/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/applications" element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          } />
          <Route path="/apply/:jobId" element={
            <ProtectedRoute>
              <ApplicationPageRoute />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="Employer">
              <EmployerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute requiredRole="Admin">
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={<JobsListPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/candidates" element={<CandidatesListPage />} />
          <Route path="/employers" element={<EmployerListPage />} />
          <Route path="/employers/:id" element={<EmployerDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingTablesPage />} />
          <Route path="/post-job" element={
            <ProtectedRoute requiredRole="Employer">
              <PostJobPageIntegrated />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
