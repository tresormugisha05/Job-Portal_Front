import React from "react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export default function StatCard({ label, value, icon, color }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all duration-300 group">
            <div className={`${color} text-white p-3 rounded-lg shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}
