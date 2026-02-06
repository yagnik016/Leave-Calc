'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import LeaveSummary from '@/components/LeaveSummary';
import LeaveForm from '@/components/LeaveForm';
import LeaveList from '@/components/LeaveList';

export default function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLeaveCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your leave requests and track your leave balance
          </p>
        </div>

        <div className="space-y-8">
          <LeaveSummary />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeaveForm onSuccess={handleLeaveCreated} />
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Quick Stats</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Leave Requests This Month</span>
                    <span className="text-sm font-bold text-gray-900">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Pending Approval</span>
                    <span className="text-sm font-bold text-yellow-600">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Total Requests</span>
                    <span className="text-sm font-bold text-gray-900">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LeaveList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </Layout>
  );
}
