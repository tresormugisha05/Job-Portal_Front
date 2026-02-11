import DashboardLayout from "../../../layouts/DashboardLayout";
import { Briefcase, Heart, Bell, CheckCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import DashboardSection from "../components/DashboardSection";
import RecentActivityList from "../components/RecentActivityList";
import type { ActivityItem } from "../components/RecentActivityList";

export default function CandidateDashboard() {
  const stats = [
    {
      label: "Applied Jobs",
      value: 12,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      label: "Saved Jobs",
      value: 8,
      icon: <Heart className="w-6 h-6" />,
      color: "bg-red-500",
    },
    {
      label: "Job Alerts",
      value: 5,
      icon: <Bell className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      label: "Shortlisted",
      value: 3,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-500",
    },
  ];

  const recentApplications: ActivityItem[] = [
    {
      id: 1,
      title: "UI Designer",
      subtitle: "LWPtech Inc.",
      meta: "2 days ago",
      icon: <span className="font-bold text-blue-600">L</span>,
      badge: { text: "Pending", variant: "blue" },
    },
    {
      id: 2,
      title: "Frontend Developer",
      subtitle: "Google",
      meta: "3 days ago",
      icon: <span className="font-bold text-red-600">G</span>,
      badge: { text: "Shortlisted", variant: "green" },
    },
    {
      id: 3,
      title: "UX Researcher",
      subtitle: "Airbnb",
      meta: "5 days ago",
      icon: <span className="font-bold text-pink-600">A</span>,
      badge: { text: "Rejected", variant: "red" },
    },
  ];

  const recommendedJobs: ActivityItem[] = [
    {
      id: 4,
      title: "Product Manager",
      subtitle: "Apus Inc.",
      meta: "$40k - $45k",
      icon: <span className="font-bold text-green-600">A</span>,
      action: { label: "View", onClick: () => console.log("View job") },
    },
    {
      id: 5,
      title: "Senior React Dev",
      subtitle: "Meta",
      meta: "$120k - $150k",
      icon: <span className="font-bold text-blue-500">M</span>,
      action: { label: "View", onClick: () => console.log("View job") },
    },
    {
      id: 6,
      title: "Designer",
      subtitle: "Spotify",
      meta: "$80k - $90k",
      icon: <span className="font-bold text-green-500">S</span>,
      action: { label: "View", onClick: () => console.log("View job") },
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Jhon!
        </h1>
        <p className="text-gray-500">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardSection title="Recent Applications">
          <RecentActivityList items={recentApplications} />
        </DashboardSection>

        <DashboardSection title="Recommended Jobs">
          <RecentActivityList items={recommendedJobs} />
        </DashboardSection>
      </div>
    </DashboardLayout>
  );
}
