import React from "react";

interface DashboardSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    headerAction?: React.ReactNode;
}

export default function DashboardSection({ title, children, className = "", headerAction }: DashboardSectionProps) {
    return (
        <div className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                {headerAction}
            </div>
            {children}
        </div>
    );
}
