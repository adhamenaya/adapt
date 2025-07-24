import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  BarChart3,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react';
import { DashboardMetrics, Task } from '../../types';
import { MetricCard } from './MetricCard';
import { TaskStatusChart } from './TaskStatusChart';
import { TrendsChart } from './TrendsChart';
import { RecentTasksList } from './RecentTasksList';
import { format } from 'date-fns';

interface DashboardProps {
  metrics: DashboardMetrics | null;
  recentTasks: Task[];
  onTaskSelect?: (task: Task) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  metrics,
  recentTasks,
  onTaskSelect,
}) => {
  if (!metrics) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-enterprise-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-enterprise-gray-200 rounded-lg" />
          <div className="h-96 bg-enterprise-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  const metricCards = [
    {
      id: 'total-active',
      title: 'Active Tasks',
      value: metrics.totalActiveTasks.toString(),
      change: '+12%',
      changeType: 'increase' as const,
      icon: Clock,
      color: 'blue' as const,
      description: 'Tasks currently in progress'
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: `${metrics.completionRate}%`,
      change: '+3.2%',
      changeType: 'increase' as const,
      icon: CheckCircle,
      color: 'green' as const,
      description: 'Tasks completed on time'
    },
    {
      id: 'overdue-rate',
      title: 'Overdue Tasks',
      value: metrics.tasksByStatus.overdue.toString(),
      change: '-2',
      changeType: 'decrease' as const,
      icon: AlertTriangle,
      color: 'red' as const,
      description: 'Tasks past due date'
    },
    {
      id: 'avg-response',
      title: 'Avg Response Time',
      value: `${metrics.averageResponseTime}d`,
      change: '-0.5d',
      changeType: 'decrease' as const,
      icon: TrendingUp,
      color: 'purple' as const,
      description: 'Average time to respond'
    },
  ];

  const urgentTasks = recentTasks.filter(task => 
    task.priority === 'high' && task.status !== 'completed'
  );

  const overdueTasks = recentTasks.filter(task => 
    task.status === 'overdue'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-enterprise-gray-900 mb-2">
                Welcome to Your Follow-Up Dashboard
              </h1>
              <p className="text-lg text-enterprise-gray-600 mb-4">
                AI-powered task management with real-time insights and automated follow-ups
              </p>
              <div className="flex items-center space-x-6 text-sm text-enterprise-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {format(new Date(), 'MMM dd, yyyy - HH:mm')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>87.5% completion rate this month</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* Alerts and Quick Actions */}
      {(urgentTasks.length > 0 || overdueTasks.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Urgent Tasks Alert */}
          {urgentTasks.length > 0 && (
            <div className="card border-l-4 border-l-red-500">
              <div className="card-body">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-enterprise-gray-900">
                    High Priority Tasks Require Attention
                  </h3>
                </div>
                <p className="text-enterprise-gray-600 mb-4">
                  {urgentTasks.length} high priority tasks need immediate focus
                </p>
                <div className="space-y-2">
                  {urgentTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-red-900">{task.title}</span>
                      <span className="text-xs text-red-600">{task.assignee}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 flex items-center text-sm text-red-600 hover:text-red-700 font-medium">
                  View all urgent tasks
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Overdue Tasks Alert */}
          {overdueTasks.length > 0 && (
            <div className="card border-l-4 border-l-yellow-500">
              <div className="card-body">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-enterprise-gray-900">
                    Overdue Tasks
                  </h3>
                </div>
                <p className="text-enterprise-gray-600 mb-4">
                  {overdueTasks.length} tasks are past their due date
                </p>
                <div className="space-y-2">
                  {overdueTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-900">{task.title}</span>
                      <span className="text-xs text-yellow-600">
                        {format(new Date(task.dueDate), 'MMM dd')}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 flex items-center text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                  Resolve overdue tasks
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-enterprise-gray-900">
              Task Status Distribution
            </h3>
            <p className="text-sm text-enterprise-gray-500">
              Current breakdown of all tasks by status
            </p>
          </div>
          <div className="card-body">
            <TaskStatusChart data={metrics.tasksByStatus} />
          </div>
        </div>

        {/* Trends Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-enterprise-gray-900">
              Task Activity Trends
            </h3>
            <p className="text-sm text-enterprise-gray-500">
              Weekly task creation and completion trends
            </p>
          </div>
          <div className="card-body">
            <TrendsChart data={metrics.trendsData} />
          </div>
        </div>
      </div>

      {/* Team Performance and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-enterprise-gray-900">
              Team Performance
            </h3>
            <p className="text-sm text-enterprise-gray-500">
              Task distribution and performance by assignee
            </p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {metrics.tasksByAssignee.map((assignee) => (
                <div key={assignee.assignee} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-enterprise-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-enterprise-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-enterprise-gray-900">
                        {assignee.assignee}
                      </p>
                      <p className="text-xs text-enterprise-gray-500">
                        {assignee.count} total tasks
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">
                      {assignee.onTime} on time
                    </p>
                    {assignee.overdue > 0 && (
                      <p className="text-xs text-red-600">
                        {assignee.overdue} overdue
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-enterprise-gray-900">
              Recent Task Activity
            </h3>
            <p className="text-sm text-enterprise-gray-500">
              Latest updates and changes
            </p>
          </div>
          <div className="card-body">
            <RecentTasksList 
              tasks={recentTasks} 
              onTaskSelect={onTaskSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};