import React from 'react';
import { BarChart3 } from 'lucide-react';
import { DashboardMetrics, Task } from '../../types';

interface AnalyticsProps {
  metrics: DashboardMetrics | null;
  tasks: Task[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ metrics, tasks }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-16">
        <BarChart3 className="h-24 w-24 text-enterprise-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-enterprise-gray-900 mb-2">
          Advanced Analytics
        </h2>
        <p className="text-lg text-enterprise-gray-500 mb-8">
          Detailed analytics and reporting features will be available here
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-sm text-enterprise-gray-500">
                Team and individual performance tracking
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">Trend Analysis</h3>
              <p className="text-sm text-enterprise-gray-500">
                Historical trends and forecasting
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">Custom Reports</h3>
              <p className="text-sm text-enterprise-gray-500">
                Exportable reports and dashboards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};