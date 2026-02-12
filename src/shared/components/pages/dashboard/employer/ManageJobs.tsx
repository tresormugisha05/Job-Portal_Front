import DashboardLayout from "../../../layouts/DashboardLayout";
import { Briefcase, Eye, Edit3, Trash2, Search, Filter, Plus, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobsByEmployer, deleteJob } from "../../../../services/jobService";
import type { JobData } from "../../../../services/jobService";
import { useAuth } from "../../../../contexts/AuthContext";

export default function ManageJobs() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<JobData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!user?.id) return;
            
            try {
                setLoading(true);
                const jobs = await getJobsByEmployer(user.id);
                setJobs(jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchJobs();
    }, [user?.id]);

    const handleDelete = async (jobId: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return;
        try {
            await deleteJob(jobId);
            setJobs(jobs.filter(job => (job._id || job.id) !== jobId));
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete job");
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b4d8]"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
                    <p className="text-gray-500 text-sm">You have {jobs.length} total job listings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/dashboard/post-job"
                        className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Post New Job
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicants</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Posted Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No jobs posted yet. <Link to="/dashboard/post-job" className="text-[#00b4d8] hover:underline">Post your first job</Link>
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr key={job._id || job.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">{job.title}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Briefcase className="w-3 h-3" /> {job.jobType || job.type}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {job.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-bold text-gray-700">
                                                <Users className="w-4 h-4 text-[#00b4d8]" />
                                                {job.applicationCount || 0}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                                job.isActive ? "text-green-600 bg-green-50 border-green-100" : "text-gray-600 bg-gray-50 border-gray-100"
                                            }`}>
                                                {job.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/dashboard/applicants/${job._id || job.id}`} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Applicants">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link to={`/dashboard/edit-job/${job._id || job.id}`} className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                    <Edit3 className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(job._id || job.id || '')} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
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
