import React from 'react';
import clsx from 'clsx';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  priority, 
  size = 'md', 
  showIcon = true 
}) => {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'high':
        return {
          label: 'High',
          icon: ArrowUp,
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'medium':
        return {
          label: 'Medium',
          icon: ArrowRight,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'low':
        return {
          label: 'Low',
          icon: ArrowDown,
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      default:
        return {
          label: 'Unknown',
          icon: ArrowRight,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const config = getPriorityConfig();
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