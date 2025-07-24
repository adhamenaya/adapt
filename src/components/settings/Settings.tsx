import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { User } from '../../types';

interface SettingsProps {
  user: User | null;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-16">
        <SettingsIcon className="h-24 w-24 text-enterprise-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-enterprise-gray-900 mb-2">
          Settings & Configuration
        </h2>
        <p className="text-lg text-enterprise-gray-500 mb-8">
          User preferences, system settings, and configuration options
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">User Profile</h3>
              <p className="text-sm text-enterprise-gray-500">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-lg font-medium text-enterprise-gray-900 mb-2">Notifications</h3>
              <p className="text-sm text-enterprise-gray-500">
                Configure email and push notification settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};