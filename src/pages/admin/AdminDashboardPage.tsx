import { Users, GraduationCap, Users2, CheckCircle, CreditCard, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function AdminDashboardPage() {
  // Demo data
  const stats = [
    { label: 'Total Users', value: '2,543', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Students', value: '1,820', change: '+8%', icon: GraduationCap, color: 'purple' },
    { label: 'Parents', value: '723', change: '+15%', icon: Users2, color: 'green' },
    { label: 'Pending Approvals', value: '34', change: '+5%', icon: CheckCircle, color: 'yellow' },
    { label: 'Active Paid Users', value: '456', change: '+22%', icon: CreditCard, color: 'red' },
    { label: 'Reports Generated', value: '1,245', change: '+18%', icon: FileText, color: 'indigo' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', createdAt: '2024-06-10' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Parent', status: 'Active', createdAt: '2024-06-09' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Pending', createdAt: '2024-06-08' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Student', status: 'Active', createdAt: '2024-06-07' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Parent', status: 'Active', createdAt: '2024-06-06' },
  ];

  const recentReports = [
    { id: 1, user: 'John Doe', type: 'Career Report', status: 'Completed', createdAt: '2024-06-10' },
    { id: 2, user: 'Sarah Smith', type: 'College Recommendation', status: 'In Progress', createdAt: '2024-06-09' },
    { id: 3, user: 'Emily Brown', type: 'Career Report', status: 'Completed', createdAt: '2024-06-08' },
    { id: 4, user: 'Mike Johnson', type: 'Roadmap Report', status: 'Completed', createdAt: '2024-06-07' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of platform statistics and recent activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            const isPositive = stat.change.startsWith('+');
            return (
              <div key={index} className={`${colors.bg} border ${colors.border} rounded-lg p-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {isPositive ? (
                        <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                      ) : (
                        <TrendingDown className={`w-4 h-4 ${colors.text}`} />
                      )}
                      <span className={`text-sm font-medium ${colors.text}`}>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`${colors.text}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Daily Signups</h2>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Chart placeholder - Daily signups trend</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Career Domains</h2>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Chart placeholder - Top career domains</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Most Viewed Colleges</h2>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">Chart placeholder - Top colleges by views</p>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created At</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created At</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{report.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.type}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
