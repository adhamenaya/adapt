import React from 'react';
import { Task } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { format, formatDistanceToNow } from 'date-fns';
import { User, Clock, ArrowRight } from 'lucide-react';

interface RecentTasksListProps {
  tasks: Task[];
  onTaskSelect?: (task: Task) => void;
}

export const RecentTasksList: React.FC<RecentTasksListProps> = ({
  tasks,
  onTaskSelect,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-enterprise-gray-300 mx-auto mb-4" />
        <p className="text-enterprise-gray-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.slice(0, 5).map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 hover:bg-enterprise-gray-50 rounded-lg transition-colors cursor-pointer"
          onClick={() => onTaskSelect?.(task)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-sm font-medium text-enterprise-gray-900 truncate">
                {task.title}
              </h4>
              <StatusBadge status={task.status} size="sm" showIcon={false} />
              <PriorityBadge priority={task.priority} size="sm" showIcon={false} />
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-enterprise-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}</span>
              </div>
              <span>Due {format(new Date(task.dueDate), 'MMM dd')}</span>
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-enterprise-gray-400 flex-shrink-0" />
        </div>
      ))}
      
      {tasks.length > 5 && (
        <div className="text-center pt-4">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all recent activity
          </button>
        </div>
      )}
    </div>
  );
};