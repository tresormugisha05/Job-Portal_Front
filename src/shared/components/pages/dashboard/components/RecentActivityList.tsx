import React from "react";

export interface ActivityItem {
    id: string | number;
    title: string;
    subtitle: string;
    meta?: string;
    icon?: React.ReactNode;
    badge?: {
        text: string;
        variant: "blue" | "green" | "yellow" | "red" | "gray";
    };
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface RecentActivityListProps {
    items: ActivityItem[];
    emptyMessage?: string;
}

export default function RecentActivityList({ items, emptyMessage = "No recent activity" }: RecentActivityListProps) {
    const badgeColors = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-green-600 bg-green-50",
        yellow: "text-yellow-600 bg-yellow-50",
        red: "text-red-600 bg-red-50",
        gray: "text-gray-600 bg-gray-50",
    };

    if (items.length === 0) {
        return <p className="text-center py-8 text-gray-500 italic">{emptyMessage}</p>;
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-white border border-transparent hover:border-gray-200 transition-all shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-4">
                        {item.icon && (
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-500">
                                {item.icon}
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors line-clamp-1">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.subtitle} {item.meta && `• ${item.meta}`}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {item.badge && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${badgeColors[item.badge.variant]}`}>
                                {item.badge.text}
                            </span>
                        )}
                        {item.action && (
                            <button
                                onClick={item.action.onClick}
                                className="text-xs font-bold text-[#00b4d8] hover:underline"
                            >
                                {item.action.label}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
