import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Menu,
  ChevronDown,
  LogOut,
  UserCircle
} from 'lucide-react';
import { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType | null;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onSidebarToggle, 
  sidebarOpen 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const mockNotifications = [
    {
      id: '1',
      title: 'Security Audit task is overdue',
      message: 'Sarah Connor\'s task needs immediate attention',
      time: '5 min ago',
      type: 'urgent'
    },
    {
      id: '2',
      title: 'Q4 Financial Report due soon',
      message: 'Due in 2 days - Michael Chen assigned',
      time: '1 hour ago',
      type: 'reminder'
    },
    {
      id: '3',
      title: 'New task assigned',
      message: 'API Documentation Update - John Smith',
      time: '3 hours ago',
      type: 'info'
    }
  ];

  return (
    <header className="bg-white border-b border-enterprise-gray-200 shadow-enterprise z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-enterprise-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-enterprise-gray-600" />
          </button>

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-semibold text-enterprise-gray-900">
              AI Task Follow-Up Command Center
            </h1>
            <p className="text-sm text-enterprise-gray-500 mt-1">
              Track. Remind. Resolve.
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enterprise-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, assignees, or email threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-enterprise-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg hover:bg-enterprise-gray-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-enterprise-gray-600" />
              {mockNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {mockNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-enterprise-lg border border-enterprise-gray-200 z-50">
                <div className="p-4 border-b border-enterprise-gray-200">
                  <h3 className="text-sm font-medium text-enterprise-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-enterprise-gray-100 hover:bg-enterprise-gray-50 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'urgent' ? 'bg-red-500' :
                          notification.type === 'reminder' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-enterprise-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-enterprise-gray-500 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-enterprise-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-enterprise-gray-200">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            className="p-2 rounded-lg hover:bg-enterprise-gray-100 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-enterprise-gray-600" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-enterprise-gray-100 transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircle className="h-8 w-8 text-enterprise-gray-400" />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-enterprise-gray-900">
                  {user?.name || 'Guest User'}
                </p>
                <p className="text-xs text-enterprise-gray-500">
                  {user?.role || 'No role assigned'}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-enterprise-gray-400" />
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-enterprise-lg border border-enterprise-gray-200 z-50">
                <div className="p-4 border-b border-enterprise-gray-200">
                  <p className="text-sm font-medium text-enterprise-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-sm text-enterprise-gray-500">
                    {user?.email}
                  </p>
                  <p className="text-xs text-enterprise-gray-400 mt-1">
                    {user?.department}
                  </p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-enterprise-gray-700 hover:bg-enterprise-gray-50">
                    <User className="h-4 w-4 mr-3" />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-enterprise-gray-700 hover:bg-enterprise-gray-50">
                    <Settings className="h-4 w-4 mr-3" />
                    Preferences
                  </button>
                </div>
                <div className="border-t border-enterprise-gray-200 py-2">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(userMenuOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};