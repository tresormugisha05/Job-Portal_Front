import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
  Mail,
  Terminal,
  Search,
  ShieldCheck,
  Database,
  Save,
} from "lucide-react";
import StatCard from "../components/StatCard";
import DashboardSection from "../components/DashboardSection";

//dashboard for admin users with stats on total users, active jobs, resumes, and revenue. Also includes sections for system status, pending employer approvals, critical alerts, and quick management links for admin tasks like managing emails, logs, SEO, cache, security, and backups. Uses a clean and modern design with a focus on usability and quick access to important information.
export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "4.2k",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-600",
    },
    {
      label: "Active Jobs",
      value: 156,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-[#00b4d8]",
    },
    {
      label: "Resumes",
      value: 842,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-600",
    },
    {
      label: "Revenue",
      value: "$12.4k",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-green-600",
    },
  ];

  const adminLinks = [
    { label: "Emails", icon: <Mail className="w-5 h-5" /> },
    { label: "Logs", icon: <Terminal className="w-5 h-5" /> },
    { label: "SEO", icon: <Search className="w-5 h-5" /> },
    { label: "Cache", icon: <Database className="w-5 h-5" /> },
    { label: "Security", icon: <ShieldCheck className="w-5 h-5" /> },
    { label: "Backups", icon: <Save className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Control Center
        </h1>
        <p className="text-gray-500">
          Monitor site performance and manage platform content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Platform Health */}
          <DashboardSection title="System Status">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                    Frontend API
                  </span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <p className="text-xl font-bold text-gray-900">Operational</p>
                <p className="text-xs text-green-600 mt-1">99.9% uptime</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Storage
                  </span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
                <p className="text-xl font-bold text-gray-900">42GB / 100GB</p>
                <p className="text-xs text-blue-600 mt-1">Normal usage</p>
              </div>
            </div>
          </DashboardSection>

          {/* Pending Approvals */}
          <DashboardSection title="Pending Employer Approvals">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                      T
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">TechFlow Inc.</p>
                      <p className="text-xs text-gray-500">
                        Registered {i} hour{i > 1 ? "s" : ""} ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-green-600 text-white text-[10px] font-bold rounded-lg hover:bg-green-700 transition-all uppercase shadow-sm">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-all uppercase">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="space-y-8">
          {/* Critical Alerts */}
          <div className="bg-[#2c3e50] p-6 rounded-xl text-white shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert className="w-24 h-24" />
            </div>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <ShieldAlert className="w-5 h-5 text-[#ff6b6b]" />
              Critical Alerts
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm font-bold flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-4 h-4" /> Unusual Login Activity
                </p>
                <p className="text-xs text-white/60 mt-1">
                  Multiple failed attempts from 192.168.1.1
                </p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm font-bold flex items-center gap-2 text-yellow-400">
                  <AlertCircle className="w-4 h-4" /> Server Load High
                </p>
                <p className="text-xs text-white/60 mt-1">
                  CPU at 85% for the last 15 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Quick Management */}
          <DashboardSection title="Admin Links">
            <div className="grid grid-cols-2 gap-3">
              {adminLinks.map((link) => (
                <button
                  key={link.label}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-[#00b4d8] hover:text-white transition-all group border border-transparent hover:border-[#00b4d8] shadow-sm"
                >
                  <span className="text-gray-400 group-hover:text-white mb-2 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-xs font-bold">{link.label}</span>
                </button>
              ))}
            </div>
          </DashboardSection>
        </div>
      </div>
    </DashboardLayout>
  );
}
