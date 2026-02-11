import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { User, Lock, Bell, Shield, ChevronRight, Save } from "lucide-react";
import { useAuth } from "../../../../contexts/AuthContext";

//settings page for all dashboards with tabs for account settings, password change, notifications, and privacy settings. Uses shared components and styles for consistency across dashboards.
export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    {
      id: "account",
      label: "Account Settings",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: "password",
      label: "Change Password",
      icon: <Lock className="w-4 h-4" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500 text-sm">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs Sidebar */}
        <div className="w-full lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#00b4d8] shadow-sm font-bold border border-gray-100"
                  : "text-gray-500 hover:bg-white/50 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${activeTab === tab.id ? "rotate-90" : ""}`}
              />
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === "account" && (
            <div className="p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Account Settings
              </h2>
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-[#00b4d8] rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Enable 2FA
                        </p>
                        <p className="text-xs text-gray-500">
                          Secure your account with an extra layer of security.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00b4d8]"></div>
                    </label>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Change Password
              </h2>
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                  />
                </div>
                <div className="pt-4">
                  <button className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Job Alerts",
                    desc: "Get notified about new jobs that match your skills.",
                  },
                  {
                    title: "Application Updates",
                    desc: "Get notified when a company views or updates your application.",
                  },
                  {
                    title: "Newsletter",
                    desc: "Receive weekly updates about career growth and market trends.",
                  },
                  {
                    title: "Security Alerts",
                    desc: "Get notified about suspicious login attempts and account changes.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={i < 3}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00b4d8]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
