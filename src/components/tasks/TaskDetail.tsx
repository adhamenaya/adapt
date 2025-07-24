import React, { useState } from 'react';
import { Task, TaskDetailProps } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { 
  X, 
  User, 
  Calendar, 
  Clock, 
  Tag, 
  Mail, 
  Edit, 
  MessageSquare,
  Brain,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

export const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  aiAnalysis,
  emailThread,
  followUpConfig,
  onUpdate,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'ai' | 'email' | 'history'>('details');

  const tabs = [
    { id: 'details', label: 'Task Details', icon: User },
    { id: 'ai', label: 'AI Insights', icon: Brain },
    { id: 'email', label: 'Email Thread', icon: Mail },
    { id: 'history', label: 'History', icon: Clock },
  ];

  const handleStatusChange = (newStatus: Task['status']) => {
    if (onUpdate) {
      onUpdate({ ...task, status: newStatus });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-enterprise-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-enterprise-gray-900">Task Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-enterprise-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-enterprise-gray-500" />
          </button>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-enterprise-gray-900">{task.title}</h3>
          <div className="flex items-center space-x-3">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-enterprise-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-enterprise-gray-500 hover:text-enterprise-gray-700'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange('in-progress')}
                className="btn-primary text-sm"
                disabled={task.status === 'in-progress'}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className="btn-outline text-sm"
                disabled={task.status === 'completed'}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </button>
              <button className="btn-outline text-sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-enterprise-gray-900">Description</label>
                <p className="mt-1 text-sm text-enterprise-gray-600">{task.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-enterprise-gray-900">Assignee</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <User className="h-4 w-4 text-enterprise-gray-400" />
                    <span className="text-sm text-enterprise-gray-600">{task.assignee}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-enterprise-gray-900">Category</label>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-enterprise-gray-900">Due Date</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-enterprise-gray-400" />
                    <span className="text-sm text-enterprise-gray-600">
                      {format(new Date(task.dueDate), 'MMM dd, yyyy h:mm a')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-enterprise-gray-900">Created</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-enterprise-gray-400" />
                    <span className="text-sm text-enterprise-gray-600">
                      {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Tracking */}
              <div>
                <label className="text-sm font-medium text-enterprise-gray-900">Time Tracking</label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-enterprise-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-enterprise-gray-900">
                      {task.actualHours || 0}h
                    </p>
                    <p className="text-xs text-enterprise-gray-500">Actual</p>
                  </div>
                  <div className="text-center p-3 bg-enterprise-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-enterprise-gray-900">
                      {task.estimatedHours || 0}h
                    </p>
                    <p className="text-xs text-enterprise-gray-500">Estimated</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-enterprise-gray-900">Tags</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-enterprise-gray-100 text-enterprise-gray-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blocker Information */}
              {task.status === 'blocked' && task.blockerReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-800">Blocked</span>
                  </div>
                  <p className="text-sm text-red-700">{task.blockerReason}</p>
                </div>
              )}

              {/* Completion Notes */}
              {task.status === 'completed' && task.completionNotes && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-800">Completion Notes</span>
                  </div>
                  <p className="text-sm text-green-700">{task.completionNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-enterprise-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-enterprise-gray-500">
                AI insights and recommendations for this task will appear here
              </p>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-enterprise-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">Email Thread</h3>
              <p className="text-sm text-enterprise-gray-500">
                Email conversation for this task will appear here
              </p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-enterprise-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">Task History</h3>
              <p className="text-sm text-enterprise-gray-500">
                Task activity timeline will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};