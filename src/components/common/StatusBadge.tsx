import React from 'react';
import clsx from 'clsx';
import { Clock, AlertTriangle, CheckCircle, Pause, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'in-progress' | 'blocked' | 'completed' | 'overdue';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md', 
  showIcon = true 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: Clock,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'blocked':
        return {
          label: 'Blocked',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'overdue':
        return {
          label: 'Overdue',
          icon: AlertTriangle,
          className: 'bg-red-100 text-red-800 border-red-200 animate-pulse',
        };
      default:
        return {
          label: 'Unknown',
          icon: Pause,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        config.className,
        sizeClasses[size]
      )}
    >
      {showIcon && (
        <Icon className={clsx('mr-1', iconSizes[size])} />
      )}
      {config.label}
    </span>
  );
};