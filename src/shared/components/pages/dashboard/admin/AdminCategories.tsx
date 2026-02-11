import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  FolderTree,
  Briefcase,
} from "lucide-react";

export default function AdminCategories() {
  const [categories] = useState([
    {
      id: 1,
      name: "Technology",
      jobCount: 450,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Healthcare",
      jobCount: 220,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      name: "Finance",
      jobCount: 180,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      name: "Education",
      jobCount: 130,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 5,
      name: "Marketing",
      jobCount: 95,
      color: "bg-rose-100 text-rose-600",
    },
    { id: 6, name: "Sales", jobCount: 75, color: "bg-cyan-100 text-cyan-600" },
  ]);

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Job Categories
          </h1>
          <p className="text-gray-500 text-sm">
            Organize and manage job sectors on the platform.
          </p>
        </div>
        <button className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/30">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Associated Jobs
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center`}
                      >
                        <FolderTree className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">
                        {cat.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Briefcase className="w-4 h-4 text-[#00b4d8]" />
                      {cat.jobCount} Jobs
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
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
