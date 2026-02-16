import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "../contexts/AuthContext";
import { Bell, Search, User } from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, role } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Dashboard Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 w-96">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search in dashboard..."
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-400 hover:text-[#00b4d8] transition-colors bg-gray-50 rounded-full border border-gray-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ff6b6b] border-2 border-white rounded-full"></span>
                        </button>

                        {/* User Profile Summary */}
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 leading-none mb-1">{user?.name || "Guest"}</p>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00b4d8] bg-[#00b4d8]/10 px-2 py-0.5 rounded">
                                    {role}
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-[#00b4d8] to-[#0077b6] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                                {user?.avatar || <User className="w-5 h-5" />}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
