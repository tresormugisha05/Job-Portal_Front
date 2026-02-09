import React from 'react';

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}
