import { useState } from 'react';
import { Search, Check, X, Filter } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo data
  const allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', approvalStatus: 'Approved', educationStage: '12th Grade', createdAt: '2024-06-10' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Parent', approvalStatus: 'Approved', educationStage: 'N/A', createdAt: '2024-06-09' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', approvalStatus: 'Pending', educationStage: '11th Grade', createdAt: '2024-06-08' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Student', approvalStatus: 'Approved', educationStage: '10th Grade', createdAt: '2024-06-07' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Parent', approvalStatus: 'Approved', educationStage: 'N/A', createdAt: '2024-06-06' },
    { id: 6, name: 'Jessica Lee', email: 'jessica@example.com', role: 'Student', approvalStatus: 'Pending', educationStage: '12th Grade', createdAt: '2024-06-05' },
    { id: 7, name: 'Robert Taylor', email: 'robert@example.com', role: 'Student', approvalStatus: 'Approved', educationStage: '11th Grade', createdAt: '2024-06-04' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Parent', approvalStatus: 'Approved', educationStage: 'N/A', createdAt: '2024-06-03' },
  ];

  // Filter users
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.approvalStatus === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleApprove = (userId: number) => {
    alert(`Approved user ${userId}`);
  };

  const handleReject = (userId: number) => {
    alert(`Rejected user ${userId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage and approve platform users</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search by name or email</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Showing {filteredUsers.length} of {allUsers.length} users
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Education</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.approvalStatus === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.approvalStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.educationStage}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                      <td className="px-6 py-4 text-sm">
                        {user.approvalStatus === 'Pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
