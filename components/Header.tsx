
import React from 'react';
import { AIOpsLogo } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <AIOpsLogo className="h-8 w-8 text-primary" />
            <span className="ml-3 text-xl font-bold text-gray-800">AI OPS</span>
          </div>
        </div>
      </div>
    </header>
  );
};
