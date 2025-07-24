import React from 'react';
import { 
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  Users,
  Mail,
  Calendar,
  Filter,
  Bookmark,
  ChevronLeft,
  Brain
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  open: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
  onToggle: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  children?: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  currentView,
  onViewChange,
  onToggle,
}) => {
  const navigationItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'tasks',
      label: 'Task Management',
      icon: CheckSquare,
      badge: 12,
      children: [
        { id: 'tasks-all', label: 'All Tasks', icon: CheckSquare },
        { id: 'tasks-my', label: 'My Tasks', icon: Users },
        { id: 'tasks-overdue', label: 'Overdue', icon: Calendar, badge: 5 },
        { id: 'tasks-pending', label: 'Pending Review', icon: Filter, badge: 7 },
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'email-threads',
      label: 'Email Threads',
      icon: Mail,
      badge: 3,
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Brain,
    },
  ];

  const savedViews = [
    { id: 'view-high-priority', label: 'High Priority', count: 8 },
    { id: 'view-engineering', label: 'Engineering Tasks', count: 15 },
    { id: 'view-this-week', label: 'Due This Week', count: 12 },
    { id: 'view-blocked', label: 'Blocked Tasks', count: 4 },
  ];

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isActive = currentView === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          onClick={() => onViewChange(item.id)}
          className={clsx(
            'w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left',
            level > 0 && 'ml-4 text-sm',
            {
              'bg-primary-600 text-white shadow-md': isActive,
              'text-enterprise-gray-600 hover:bg-enterprise-gray-100 hover:text-enterprise-gray-900': !isActive,
            }
          )}
        >
          <div className="flex items-center space-x-3">
            <item.icon className={clsx(
              'h-5 w-5',
              isActive ? 'text-white' : 'text-enterprise-gray-500'
            )} />
            {open && (
              <span className="font-medium">
                {item.label}
              </span>
            )}
          </div>
          
          {open && item.badge && (
            <span className={clsx(
              'px-2 py-1 text-xs font-medium rounded-full',
              isActive 
                ? 'bg-white/20 text-white' 
                : 'bg-enterprise-gray-200 text-enterprise-gray-700'
            )}>
              {item.badge}
            </span>
          )}
        </button>

        {hasChildren && open && (
          <div className="mt-2 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <div className={clsx(
        'fixed left-0 top-0 h-full bg-white border-r border-enterprise-gray-200 shadow-enterprise-lg z-20 transition-all duration-300',
        open ? 'w-64' : 'w-16'
      )}>
        {/* Header */}
        <div className="p-4 border-b border-enterprise-gray-200">
          <div className="flex items-center justify-between">
            {open && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-enterprise-gray-900">
                    AI Follow-Up
                  </h2>
                  <p className="text-xs text-enterprise-gray-500">
                    Command Center
                  </p>
                </div>
              </div>
            )}
            
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-enterprise-gray-100 transition-colors"
              aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <ChevronLeft className={clsx(
                'h-4 w-4 text-enterprise-gray-500 transition-transform duration-200',
                !open && 'rotate-180'
              )} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <div className="space-y-1">
            {navigationItems.map(item => renderNavItem(item))}
          </div>

          {/* Saved Views Section */}
          {open && (
            <>
              <div className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-enterprise-gray-500 uppercase tracking-wider">
                    Saved Views
                  </h3>
                  <button className="p-1 rounded hover:bg-enterprise-gray-100">
                    <Bookmark className="h-3 w-3 text-enterprise-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-1">
                  {savedViews.map(view => (
                    <button
                      key={view.id}
                      onClick={() => onViewChange(view.id)}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-sm text-enterprise-gray-600 hover:bg-enterprise-gray-100 hover:text-enterprise-gray-900 transition-colors"
                    >
                      <span>{view.label}</span>
                      <span className="px-2 py-0.5 text-xs bg-enterprise-gray-200 text-enterprise-gray-700 rounded-full">
                        {view.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-6">
                <h3 className="text-xs font-semibold text-enterprise-gray-500 uppercase tracking-wider mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-1">
                  <button className="w-full p-2 text-sm text-enterprise-gray-600 hover:bg-enterprise-gray-100 rounded-lg transition-colors text-left">
                    Create New Task
                  </button>
                  <button className="w-full p-2 text-sm text-enterprise-gray-600 hover:bg-enterprise-gray-100 rounded-lg transition-colors text-left">
                    Bulk Update
                  </button>
                  <button className="w-full p-2 text-sm text-enterprise-gray-600 hover:bg-enterprise-gray-100 rounded-lg transition-colors text-left">
                    Export Data
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-enterprise-gray-200">
          <button
            onClick={() => onViewChange('settings')}
            className={clsx(
              'w-full flex items-center space-x-3 p-3 rounded-lg transition-colors',
              currentView === 'settings' 
                ? 'bg-primary-600 text-white' 
                : 'text-enterprise-gray-600 hover:bg-enterprise-gray-100'
            )}
          >
            <Settings className="h-5 w-5" />
            {open && (
              <span className="font-medium">Settings</span>
            )}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};