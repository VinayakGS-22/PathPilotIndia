import { useState } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface College {
  id: number;
  name: string;
  location: string;
  country: string;
  type: string;
  ranking: number;
}

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([
    { id: 1, name: 'Stanford University', location: 'California', country: 'USA', type: 'Private', ranking: 4 },
    { id: 2, name: 'MIT', location: 'Massachusetts', country: 'USA', type: 'Private', ranking: 2 },
    { id: 3, name: 'Harvard University', location: 'Massachusetts', country: 'USA', type: 'Private', ranking: 3 },
    { id: 4, name: 'IIT Delhi', location: 'Delhi', country: 'India', type: 'Public', ranking: 1 },
    { id: 5, name: 'University of Cambridge', location: 'Cambridge', country: 'UK', type: 'Public', ranking: 5 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: '',
    type: 'Public',
    ranking: 0,
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', location: '', country: '', type: 'Public', ranking: 0 });
    setShowModal(true);
  };

  const handleEdit = (college: College) => {
    setEditingId(college.id);
    setFormData({
      name: college.name,
      location: college.location,
      country: college.country,
      type: college.type,
      ranking: college.ranking,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.location) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setColleges(colleges.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setColleges([...colleges, { ...formData, id: Math.max(...colleges.map(c => c.id), 0) + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this college?')) {
      setColleges(colleges.filter(c => c.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">College Management</h1>
            <p className="text-gray-600 mt-2">Manage colleges in the system</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add College
          </button>
        </div>

        {/* Colleges Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">College Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ranking</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{college.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{college.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{college.country}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {college.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">#{college.ranking}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(college)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(college.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit College' : 'Add College'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter college name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Global Ranking</label>
                  <input
                    type="number"
                    value={formData.ranking}
                    onChange={(e) => setFormData({ ...formData, ranking: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter ranking"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
