import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  Briefcase,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  BarChart3,
  FolderTree,
} from "lucide-react";
import { useAuth, type UserRole } from "../../contexts/AuthContext";

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  // Shared
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ["CANDIDATE", "EMPLOYER", "ADMIN"],
  },

  // Candidate
  {
    label: "Applied Jobs",
    path: "/dashboard/applied-jobs",
    icon: <FileText className="w-5 h-5" />,
    roles: ["CANDIDATE"],
  },
  {
    label: "Saved Jobs",
    path: "/dashboard/saved-jobs",
    icon: <Heart className="w-5 h-5" />,
    roles: ["CANDIDATE"],
  },
  {
    label: "My Profile",
    path: "/dashboard/profile",
    icon: <User className="w-5 h-5" />,
    roles: ["CANDIDATE"],
  },

  // Employer
  {
    label: "Job Post",
    path: "/dashboard/post-job",
    icon: <PlusCircle className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },
  {
    label: "My Jobs",
    path: "/dashboard/manage-jobs",
    icon: <Briefcase className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },
  {
    label: "Applicants",
    path: "/dashboard/applicants",
    icon: <Users className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },

  // Admin
  {
    label: "Statistics",
    path: "/dashboard/admin/stats",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Manage Jobs",
    path: "/dashboard/admin/jobs",
    icon: <Briefcase className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Manage Users",
    path: "/dashboard/admin/users",
    icon: <Users className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Applications",
    path: "/dashboard/admin/applications",
    icon: <FileText className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Categories",
    path: "/dashboard/admin/categories",
    icon: <FolderTree className="w-5 h-5" />,
    roles: ["ADMIN"],
  },

  // Shared
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
    roles: ["CANDIDATE", "EMPLOYER", "ADMIN"],
  },
];

export default function DashboardSidebar() {
  const { role, logout } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <aside className="w-64 bg-[#2c3e50] text-white min-h-screen flex flex-col pt-8">
      <div className="px-6 mb-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00b4d8] rounded flex items-center justify-center font-bold text-white">
            J
          </div>
          <span className="text-xl font-bold tracking-tight">
            Job<span className="text-[#00b4d8]">Portal</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? "bg-[#00b4d8] text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-[#ff6b6b] hover:bg-red-50/5 rounded-lg transition-all group"
        >
          <LogOut className="w-5 h-5 transition-colors group-hover:text-[#ff6b6b]" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
