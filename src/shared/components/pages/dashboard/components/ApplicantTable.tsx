import { Eye } from "lucide-react";

export interface Applicant {
    id: string | number;
    name: string;
    professionalTitle: string;
    jobTitle: string;
    appliedDate: string;
    avatar?: string;
}

interface ApplicantTableProps {
    applicants: Applicant[];
}

export default function ApplicantTable({ applicants }: ApplicantTableProps) {
    if (applicants.length === 0) {
        return <p className="text-center py-8 text-gray-500 italic">No applicants found</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50">
                        <th className="pb-4">Candidate</th>
                        <th className="pb-4">Applied Job</th>
                        <th className="pb-4">Applied Date</th>
                        <th className="pb-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {applicants.map((applicant) => (
                        <tr key={applicant.id} className="group hover:bg-gray-50 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm overflow-hidden">
                                        {applicant.avatar ? (
                                            <img src={applicant.avatar} alt={applicant.name} className="w-full h-full object-cover" />
                                        ) : (
                                            applicant.name.split(" ").map(n => n[0]).join("").toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{applicant.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{applicant.professionalTitle}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 text-sm text-gray-600 font-medium">{applicant.jobTitle}</td>
                            <td className="py-4 text-sm text-gray-500">{applicant.appliedDate}</td>
                            <td className="py-4 text-right pr-2">
                                <button className="text-gray-400 hover:text-[#00b4d8] transition-colors p-2 rounded-lg bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
