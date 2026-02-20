// pages/DashboardPage.jsx
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { MdPerson2 } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';
import { IoBagHandle } from 'react-icons/io5';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h1>
        <p className="text-neutral-500">Welcome back, here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Users" 
          value="1,245" 
          trend="+12% this month"
          icon={<MdPerson2 className="text-xl" />} 
        />
        <DashboardCard 
          title="Active Courses" 
          value="24" 
          trend="+2 new this week"
          icon={<FaLaptopCode className="text-xl" />} 
        />
        <DashboardCard 
          title="Total Orders" 
          value="892" 
          trend="+5% this month"
          icon={<IoBagHandle className="text-xl" />} 
        />
        <DashboardCard 
          title="Total Revenue" 
          value="₹ 1,45,000" 
          trend="+18% this month"
          icon={<span className="font-bold text-lg">₹</span>} 
        />
      </div>

      {/* Placeholder for future charts or tables */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 h-96 flex items-center justify-center text-neutral-400">
        [ Chart or Recent Orders Table Goes Here ]
      </div>

    </div>
  );
}
