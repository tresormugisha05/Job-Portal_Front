import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Briefcase,
  Users,
  FilePlus,
  Eye,
  MessageSquare,
  Settings,
  CreditCard,
} from "lucide-react";
import StatCard from "./components/StatCard";
import DashboardSection from "./components/DashboardSection";
import ApplicantTable from "./components/ApplicantTable";
import type { Applicant } from "./components/ApplicantTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getJobsByEmployer } from "../../services/jobService";
import { getEmployerById } from "../../services/employerService";
import { ApplicationService } from "../../services/application.Service";
import type { ApplicationModel } from "../../services/application.Service";
import Loader from "../../components/ui/Loader";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [employer, setEmployer] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState([
    {
      label: "Active Jobs",
      value: 0,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-blue-600",
    },
    {
      label: "Total Applicants",
      value: 0,
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-600",
    },
    {
      label: "Job Views",
      value: 0,
      icon: <Eye className="w-6 h-6" />,
      color: "bg-orange-600",
    },
    {
      label: "Shortlisted",
      value: 0,
      icon: <FilePlus className="w-6 h-6" />,
      color: "bg-green-600",
    },
  ]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        // Fetch employer profile
        const employerData = await getEmployerById(user.id);
        if (employerData) {
          setEmployer(employerData);
          const employerId = employerData.id || employerData._id || "";

          // Fetch employer's jobs and applications
          try {
            const jobsData = await getJobsByEmployer(employerId);

            const applicationsData =
              await ApplicationService.getByEmployer(employerId);
            setApplications(applicationsData);

            // Calculate stats
            const activeJobs = jobsData.filter(
              (job) => job.isActive !== false,
            ).length;
            const totalApplicants = applicationsData.length;
            const totalViews = jobsData.reduce(
              (sum, job) => sum + (job.views || 0),
              0,
            );
            const shortlistedCount = applicationsData.filter(
              (app: ApplicationModel) => app.status === "SHORTLISTED",
            ).length;

            setStats([
              {
                label: "Active Jobs",
                value: activeJobs,
                icon: <Briefcase className="w-6 h-6" />,
                color: "bg-blue-600",
              },
              {
                label: "Total Applicants",
                value: totalApplicants,
                icon: <Users className="w-6 h-6" />,
                color: "bg-purple-600",
              },
              {
                label: "Job Views",
                value: totalViews,
                icon: <Eye className="w-6 h-6" />,
                color: "bg-orange-600",
              },
              {
                label: "Shortlisted",
                value: shortlistedCount,
                icon: <FilePlus className="w-6 h-6" />,
                color: "bg-green-600",
              },
            ]);
          } catch (error) {
            console.error("Error fetching jobs and applications:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching employer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [user?.id]);

  if (loading) {
    return <Loader />;
  }

  // Convert applications to applicant format
  const recentApplicants: Applicant[] = applications
    .slice(0, 10)
    .map((app, index) => ({
      id: app.id || app._id || index,
      name: app.userId?.fullName || app.userId?.name || "Unknown Candidate",
      role: app.userId?.jobTitle || "Candidate",
      professionalTitle: app.userId?.professionalTitle || app.userId?.jobTitle || "Candidate",
      jobTitle: app.jobId?.title || "Unknown Job",
      appliedDate: app.submissionDate
        ? new Date(app.submissionDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        : "N/A",
      avatar: app.userId?.profilePicture,
    }));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Employer Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your job listings and track applicants.
        </p>
        {employer && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Company:</strong> {employer.companyName} |{" "}
              <strong>Location:</strong> {employer.location}
            </p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm mb-10 text-center border-dashed border-2 border-gray-100 hover:border-[#00b4d8] transition-colors group">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-[#00b4d8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Need to hire someone?
          </h3>
          <p className="text-gray-500 mb-6">
            Post a new job opening and reach thousands of talented candidates
            instantly.
          </p>
          <button className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 mx-auto">
            <FilePlus className="w-5 h-5" /> Post a Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DashboardSection title="Recent Applicants" className="lg:col-span-2">
          <ApplicantTable applicants={recentApplicants} />
        </DashboardSection>

        <DashboardSection title="Quick Actions">
          <div className="space-y-3">
            {[
              { label: "Manage Jobs", icon: <Briefcase className="w-4 h-4" /> },
              {
                label: "View Messages",
                icon: <MessageSquare className="w-4 h-4" />,
              },
              {
                label: "Account Settings",
                icon: <Settings className="w-4 h-4" />,
              },
              { label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
            ].map((act) => (
              <button
                key={act.label}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-sm font-bold text-gray-700 hover:bg-[#00b4d8] hover:text-white transition-all shadow-sm group"
              >
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  {act.icon}
                </span>
                {act.label}
              </button>
            ))}
          </div>
        </DashboardSection>
      </div>
    </DashboardLayout>
  );
}
