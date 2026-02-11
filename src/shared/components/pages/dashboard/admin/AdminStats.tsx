import DashboardLayout from "../../../layouts/DashboardLayout";
import { Users, Briefcase, TrendingUp, BarChart3, PieChart, Activity, ArrowUpRight } from "lucide-react";
import StatCard from "../components/StatCard";

export default function AdminStats() {
    const stats = [
        { label: "Total Users", value: "4,285", icon: <Users className="w-6 h-6" />, color: "bg-blue-600" },
        { label: "Total Jobs", value: "852", icon: <Briefcase className="w-6 h-6" />, color: "bg-[#00b4d8]" },
        { label: "Active Subs", value: "142", icon: <Activity className="w-6 h-6" />, color: "bg-purple-600" },
        { label: "Total Revenue", value: "$42.5k", icon: <TrendingUp className="w-6 h-6" />, color: "bg-green-600" },
    ];

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Platform Statistics</h1>
                <p className="text-gray-500 text-sm">Real-time overview of platform activity and growth.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[#00b4d8]" /> User Growth
                        </h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +12%
                        </span>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm font-medium">Growth Chart Visualization</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-purple-600" /> Job Categories
                        </h3>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm font-medium">Distribution Pie Chart</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Recent Platform Events</h3>
                <div className="space-y-4">
                    {[
                        { title: "New Employer Registered", time: "2 mins ago", desc: "TechFlow Inc. joined the platform", color: "bg-blue-100 text-blue-600" },
                        { title: "Subscription Renewed", time: "15 mins ago", desc: "Premium plan renewed for Digital Art Ltd", color: "bg-purple-100 text-purple-600" },
                        { title: "Job Post Reported", time: "1 hour ago", desc: "Suspicious content report for 'Easy Money' job", color: "bg-red-100 text-red-600" },
                        { title: "Large Batch Application", time: "3 hours ago", desc: "150+ applications received for 'React Dev' position", color: "bg-green-100 text-green-600" },
                    ].map((event, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 group">
                            <div className={`w-10 h-10 ${event.color} rounded-full flex items-center justify-center font-bold`}>
                                {event.title.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-bold text-gray-900 text-sm group-hover:text-[#00b4d8] transition-colors">{event.title}</p>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{event.time}</span>
                                </div>
                                <p className="text-xs text-gray-500">{event.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
