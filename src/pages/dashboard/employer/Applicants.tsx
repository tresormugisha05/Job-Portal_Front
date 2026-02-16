import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Search, Filter, Download, Mail, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { ApplicationService, type ApplicationModel } from "../../../services/application.Service";
import { useAuth } from "../../../contexts/AuthContext";
import Loader from "../../../components/ui/Loader";

export default function Applicants() {
    const { user } = useAuth();
    const [applicants, setApplicants] = useState<ApplicationModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchApplicants = async () => {
        // Try to get employerId from user object
        let employerIdString = (user as any)?.employerId;

        // Handle object case if populated
        if (employerIdString && typeof employerIdString === 'object') {
            employerIdString = employerIdString._id;
        }

        // If not found and user is an employer, use their own ID
        if (!employerIdString && (user as any)?.role === 'EMPLOYER') {
            employerIdString = (user as any).id || (user as any)._id;
        }

        if (!employerIdString) {
            setIsLoading(false);
            return;
        }

        try {
            const data = await ApplicationService.getByEmployer(employerIdString);
            setApplicants(data);
        } catch (error) {
            console.error("Error fetching applicants:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchApplicants();
        }
    }, [user]);

    const handleStatusUpdate = async (id: string, newStatus: "SHORTLISTED" | "REJECTED") => {
        try {
            await ApplicationService.updateStatus(id, newStatus);
            // Refresh list or update local state
            setApplicants(prev => prev.map(app =>
                (app._id === id || app.id === id) ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'SHORTLISTED': return 'text-green-600 bg-green-50 border-green-100';
            case 'REJECTED': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-blue-600 bg-blue-50 border-blue-100';
        }
    };

    if (isLoading) return <Loader />;

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Applicants</h1>
                    <p className="text-gray-500 text-sm">You have {applicants.length} candidates who applied for your jobs.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <Download className="w-4 h-4" /> Download Report
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8]">
                            <option>All Jobs</option>
                            {/* Dynamic job options could be added here */}
                        </select>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> More Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Applied</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applicants.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No applicants found yet.
                                    </td>
                                </tr>
                            ) : (
                                applicants.map((cand) => (
                                    <tr key={cand._id || cand.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#00b4d8] text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                                                    {cand.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">{cand.name}</p>
                                                    {/* Title removed as it's not in ApplicationModel usually, unless populated from User */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                                                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {cand.email}
                                                </p>
                                                {/* Phone would need to be populated from User model if not in Application */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-700">
                                                {(cand as any).jobId?.title || "Unknown Job"}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {cand.submissionDate ? new Date(cand.submissionDate).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(cand.status)}`}>
                                                {cand.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(cand._id || cand.id || "", "SHORTLISTED")}
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                                    title="Shortlist"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(cand._id || cand.id || "", "REJECTED")}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Reject"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
