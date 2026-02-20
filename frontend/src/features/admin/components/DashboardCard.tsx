// components/DashboardCard.jsx
import React from 'react';

type CardProps = {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode
}

export default function DashboardCard({ title, value, icon, trend }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-500">{title}</h3>
        {/* Optional Icon slot */}
        <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div>
        <p className="text-3xl font-bold text-neutral-900">{value}</p>
        {/* Optional trend indicator (e.g., "+5% this week") */}
        {trend && (
          <p className="text-sm text-emerald-600 font-medium mt-1">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}