import DashboardLayout from "../../layouts/DashboardLayout";
import { Briefcase, Users, FilePlus, Eye, MessageSquare, Settings, CreditCard } from "lucide-react";
import StatCard from "./components/StatCard";
import DashboardSection from "./components/DashboardSection";
import ApplicantTable from "./components/ApplicantTable";
import type { Applicant } from "./components/ApplicantTable";

export default function EmployerDashboard() {
    const stats = [
        { label: "Active Jobs", value: 4, icon: <Briefcase className="w-6 h-6" />, color: "bg-blue-600" },
        { label: "Total Applicants", value: 85, icon: <Users className="w-6 h-6" />, color: "bg-purple-600" },
        { label: "Job Views", value: "1.2k", icon: <Eye className="w-6 h-6" />, color: "bg-orange-600" },
        { label: "Shortlisted", value: 12, icon: <FilePlus className="w-6 h-6" />, color: "bg-green-600" },
    ];

    const recentApplicants: Applicant[] = [
        { id: 1, name: "Jhon Doe", professionalTitle: "Project Manager", jobTitle: "Senior Health and Food", appliedDate: "24 Oct, 2024" },
        { id: 2, name: "Sarah Smith", professionalTitle: "UI Designer", jobTitle: "Product Designer", appliedDate: "25 Oct, 2024" },
        { id: 3, name: "Mike Johnson", professionalTitle: "Frontend Dev", jobTitle: "React Developer", appliedDate: "26 Oct, 2024" },
        { id: 4, name: "Emma Wilson", professionalTitle: "UX Researcher", jobTitle: "Product Designer", appliedDate: "27 Oct, 2024" },
    ];

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
                <p className="text-gray-500">Manage your job listings and track applicants.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-10 text-center border-dashed border-2 hover:border-[#00b4d8] transition-colors group">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-blue-50 text-[#00b4d8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Need to hire someone?</h3>
                    <p className="text-gray-500 mb-6">Post a new job opening and reach thousands of talented candidates instantly.</p>
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
                            { label: "View Messages", icon: <MessageSquare className="w-4 h-4" /> },
                            { label: "Account Settings", icon: <Settings className="w-4 h-4" /> },
                            { label: "Billing", icon: <CreditCard className="w-4 h-4" /> }
                        ].map(act => (
                            <button key={act.label} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-sm font-bold text-gray-700 hover:bg-[#00b4d8] hover:text-white transition-all shadow-sm group">
                                <span className="text-gray-400 group-hover:text-white transition-colors">{act.icon}</span>
                                {act.label}
                            </button>
                        ))}
                    </div>
                </DashboardSection>
            </div>
        </DashboardLayout>
    );
}

