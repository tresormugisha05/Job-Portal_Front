import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Building2, CheckCircle, XCircle, Mail, Phone } from "lucide-react";
import { getAllEmployers } from "../../../services/employerService";
import api from "../../../services/ApiSetter";
import Loader from "../../../components/ui/Loader";

interface Employer {
    _id: string;
    companyName: string;
    email?: string;
    phone?: string;
    isVerified: boolean;
    createdAt?: string;
}

export default function AdminEmployers() {
    const [employers, setEmployers] = useState<Employer[]>([]);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployers();
    }, []);

    const fetchEmployers = async () => {
        try {
            setLoading(true);
            const data = await getAllEmployers();
            setEmployers(data as Employer[]);
        } catch (error) {
            console.error("Error fetching employers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyToggle = async (
        employerId: string,
        currentStatus: boolean,
    ) => {
        try {
            setVerifying(employerId);
            const response = await api.patch(
                `/employers/${employerId}/verify`,
                { isVerified: !currentStatus }
            );

            if (response.data.success) {
                // Update local state
                setEmployers((prev) =>
                    prev.map((emp) =>
                        emp._id === employerId
                            ? { ...emp, isVerified: !currentStatus }
                            : emp,
                    ),
                );
            }
        } catch (error) {
            console.error("Error updating verification status:", error);
            alert("Failed to update verification status");
        } finally {
            setVerifying(null);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        Employer Management
                    </h1>
                    <p className="text-gray-600">Verify and manage employer accounts</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Employers</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {employers.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Verified</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {employers.filter((e) => e.isVerified).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {employers.filter((e) => !e.isVerified).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employers Table */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Registered
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            No employers found
                                        </td>
                                    </tr>
                                ) : (
                                    employers.map((employer) => (
                                        <tr
                                            key={employer._id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <Building2 className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">
                                                            {employer.companyName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Mail className="w-4 h-4" />
                                                        {employer.email}
                                                    </div>
                                                    {employer.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Phone className="w-4 h-4" />
                                                            {employer.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {employer.isVerified ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                                        <XCircle className="w-3 h-3" />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {employer.createdAt
                                                    ? new Date(employer.createdAt).toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() =>
                                                        handleVerifyToggle(
                                                            employer._id,
                                                            employer.isVerified,
                                                        )
                                                    }
                                                    disabled={verifying === employer._id}
                                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${employer.isVerified
                                                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    {verifying === employer._id
                                                        ? "Processing..."
                                                        : employer.isVerified
                                                            ? "Unverify"
                                                            : "Verify"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
