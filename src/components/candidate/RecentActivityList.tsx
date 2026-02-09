import React from 'react';

export interface ActivityItem {
  id: number;
  title: string;
  subtitle: string;
  meta: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    variant: 'blue' | 'green' | 'red' | 'yellow';
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface RecentActivityListProps {
  items: ActivityItem[];
}

const badgeColors = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
};

export default function RecentActivityList({ items }: RecentActivityListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
            <p className="text-sm text-gray-500 truncate">{item.subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{item.meta}</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            {item.badge && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColors[item.badge.variant]}`}>
                {item.badge.text}
              </span>
            )}
            {item.action && (
              <button
                onClick={item.action.onClick}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
