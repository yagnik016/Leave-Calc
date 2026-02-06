'use client';

import { useEffect, useState } from 'react';
import type { LeaveSummary } from '@/types/leave';
import { leaveService } from '@/lib/leave';

export default function LeaveSummary() {
  const [summary, setSummary] = useState<LeaveSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await leaveService.getSummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch leave summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!summary) {
    return <div className="text-red-600">Failed to load leave summary</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Yearly Quota</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{summary.yearlyQuota}</p>
        <p className="text-sm text-gray-600">days</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Accrued</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">{summary.accrued.toFixed(1)}</p>
        <p className="text-sm text-gray-600">days ({summary.currentMonth}/12 months)</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Taken</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">{summary.taken.toFixed(1)}</p>
        <p className="text-sm text-gray-600">days</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Remaining</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">{summary.remaining.toFixed(1)}</p>
        <p className="text-sm text-gray-600">days</p>
      </div>
    </div>
  );
}
