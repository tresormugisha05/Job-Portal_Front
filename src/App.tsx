import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidatesListPage from "./shared/components/pages/CandidatesListPage";
import CandidateDetailPage from "./shared/components/pages/CandidateDetailPage";
import JobDetailPage from "./shared/components/pages/JobDetailPage";
import JobsListPage from "./shared/components/pages/JobsListPage";
import PostJobPage from "./shared/components/pages/PostJobPage";
import PricingTablesPage from "./shared/components/pages/PricingTablesPage";
import HomePage from "./shared/components/pages/HomePage";
import EmployerListPage from "./shared/components/pages/EmployerListPage";

import EmployerDetailPage from "./shared/components/pages/EmployerDetailPage";
import BlogPage from "./shared/components/pages/BlogPage";
import BlogDetailPage from "./shared/components/pages/BlogDetailPage";
import ContactPage from "./shared/components/pages/contactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsListPage />} />
        <Route path="/jobs:id" element={<JobDetailPage />} />
        <Route path="/candidates" element={<CandidatesListPage />} />
        <Route path="/candidates/:id" element={<CandidateDetailPage />} />
        <Route path="/employers" element={<EmployerListPage />} />
        <Route path="/employers/:id" element={<EmployerDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingTablesPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
      </Routes>
    </BrowserRouter>
  );
}
