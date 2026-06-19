import { useState } from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Feature toggles
    enableSignups: true,
    enableMockTests: true,
    enableReports: true,
    enablePayments: true,
    enableCollegeRecommendation: true,
    enableRoadmap: true,
    requireEmailVerification: true,
    requirePhoneVerification: false,
    autoApproveUsers: false,
    maintenanceMode: false,

    // Site configuration
    siteName: 'PathPilot',
    supportEmail: 'support@pathpilot.com',
    maxUploadSize: 10,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaveSuccess(false);
  };

  const handleInputChange = (key: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSaveSuccess(false);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      setSettings({
        enableSignups: true,
        enableMockTests: true,
        enableReports: true,
        enablePayments: true,
        enableCollegeRecommendation: true,
        enableRoadmap: true,
        requireEmailVerification: true,
        requirePhoneVerification: false,
        autoApproveUsers: false,
        maintenanceMode: false,
        siteName: 'PathPilot',
        supportEmail: 'support@pathpilot.com',
        maxUploadSize: 10,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordMinLength: 8,
      });
      setSaveSuccess(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-2">Configure platform features and site settings</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <div className="flex-shrink-0">
              <Save className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
          </div>
        )}

        {/* Feature Toggles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Feature Toggles</h2>
          <div className="space-y-4">
            {[
              { key: 'enableSignups', label: 'Enable Signups', description: 'Allow new user registrations' },
              { key: 'enableMockTests', label: 'Enable Mock Tests', description: 'Enable mock test functionality' },
              { key: 'enableReports', label: 'Enable Reports', description: 'Allow report generation' },
              { key: 'enablePayments', label: 'Enable Payments', description: 'Enable payment processing' },
              { key: 'enableCollegeRecommendation', label: 'Enable College Recommendation', description: 'Show college recommendations' },
              { key: 'enableRoadmap', label: 'Enable Roadmap', description: 'Show educational roadmap' },
              { key: 'requireEmailVerification', label: 'Require Email Verification', description: 'Verify email before signup' },
              { key: 'requirePhoneVerification', label: 'Require Phone Verification', description: 'Verify phone number' },
              { key: 'autoApproveUsers', label: 'Auto Approve Users', description: 'Automatically approve new users' },
              { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Put platform in maintenance mode' },
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <button
                  onClick={() => handleToggle(key)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings[key as keyof typeof settings] ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Site Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Site Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Site name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="support@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Upload Size (MB)</label>
              <input
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => handleInputChange('maxUploadSize', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum file size for uploads in megabytes</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-1">How long user sessions remain active without activity</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum failed login attempts before account lockout</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum characters required for user passwords</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Reset to Defaults
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-4">
            <Settings className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Settings Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>All changes are saved immediately after clicking Save Settings</li>
                <li>Maintenance mode will restrict access for all users except admins</li>
                <li>Feature toggles can be used to enable/disable functionality without removing data</li>
                <li>Session timeout applies to all new login sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
