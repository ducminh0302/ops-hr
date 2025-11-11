
import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-center space-x-4">
      <div className="p-3 bg-secondary rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="text-2xl font-bold text-text-main">{value}</p>
      </div>
    </div>
  );
};
