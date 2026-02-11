import DashboardLayout from "../../../layouts/DashboardLayout";
import { Search, Filter, Mail, Shield, UserX, UserCheck, MoreVertical } from "lucide-react";

export default function AdminUsers() {
    const users = [
        {
            id: 1,
            name: "Jhon Doe",
            email: "jhon.doe@example.com",
            role: "CANDIDATE",
            status: "Active",
            joined: "Oct 24, 2024",
            avatar: "J"
        },
        {
            id: 2,
            name: "TechFlow Inc.",
            email: "hiring@techflow.com",
            role: "EMPLOYER",
            status: "Active",
            joined: "Oct 22, 2024",
            avatar: "T"
        },
        {
            id: 3,
            name: "Sarah Smith",
            email: "sarah.s@example.com",
            role: "CANDIDATE",
            status: "Suspended",
            joined: "Oct 15, 2024",
            avatar: "S"
        }
    ];

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Users</h1>
                    <p className="text-gray-500 text-sm">Registered candidates and employers on the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-10 h-10 border-4 border-white rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                {i < 4 ? "U" : "+4.2k"}
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Total Users</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8]">
                            <option>All Roles</option>
                            <option>Candidate</option>
                            <option>Employer</option>
                        </select>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> Status
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                                                {user.avatar}
                                            </div>
                                            <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">{user.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 flex items-center gap-1.5 font-medium">
                                            <Mail className="w-3.5 h-3.5 text-gray-400" /> {user.email}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${user.role === 'EMPLOYER' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.joined}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${user.status === 'Active' ? 'text-green-600 bg-green-50 border-green-100' :
                                            'text-red-600 bg-red-50 border-red-100'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {user.status === 'Suspended' ? (
                                                <button className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Activate">
                                                    <UserCheck className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Suspend">
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                                <Shield className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
