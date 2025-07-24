import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  description,
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-500 text-white',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-500 text-white',
      text: 'text-green-600',
    },
    red: {
      bg: 'bg-red-50',
      icon: 'bg-red-500 text-white',
      text: 'text-red-600',
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'bg-yellow-500 text-white',
      text: 'text-yellow-600',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-500 text-white',
      text: 'text-purple-600',
    },
  };

  const changeTypeClasses = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-enterprise-gray-600',
  };

  const classes = colorClasses[color];

  return (
    <div className={clsx('card hover:shadow-enterprise-lg transition-shadow', classes.bg)}>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-enterprise-gray-600 mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-enterprise-gray-900 mb-1">
              {value}
            </p>
            <div className="flex items-center space-x-2">
              <span className={clsx('text-sm font-medium', changeTypeClasses[changeType])}>
                {change}
              </span>
              <span className="text-sm text-enterprise-gray-500">vs last period</span>
            </div>
          </div>
          
          <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', classes.icon)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-enterprise-gray-200">
          <p className="text-xs text-enterprise-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};