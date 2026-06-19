import { useState } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface Exam {
  id: number;
  name: string;
  type: string;
  description: string;
  totalQuestions: number;
  duration: number;
  difficulty: string;
}

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([
    { id: 1, name: 'JEE Main 2024', type: 'Entrance', description: 'Joint Entrance Exam Main', totalQuestions: 90, duration: 180, difficulty: 'Hard' },
    { id: 2, name: 'NEET 2024', type: 'Medical', description: 'National Entrance Exam for Medical', totalQuestions: 180, duration: 180, difficulty: 'Hard' },
    { id: 3, name: 'UPSC Prelims', type: 'Civil Service', description: 'Union Public Service Commission', totalQuestions: 100, duration: 120, difficulty: 'Very Hard' },
    { id: 4, name: 'CAT 2024', type: 'MBA', description: 'Common Admission Test', totalQuestions: 66, duration: 120, difficulty: 'Hard' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    totalQuestions: 0,
    duration: 0,
    difficulty: 'Medium',
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', type: '', description: '', totalQuestions: 0, duration: 0, difficulty: 'Medium' });
    setShowModal(true);
  };

  const handleEdit = (exam: Exam) => {
    setEditingId(exam.id);
    setFormData({
      name: exam.name,
      type: exam.type,
      description: exam.description,
      totalQuestions: exam.totalQuestions,
      duration: exam.duration,
      difficulty: exam.difficulty,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.type) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setExams(exams.map(e => e.id === editingId ? { ...e, ...formData } : e));
    } else {
      setExams([...exams, { ...formData, id: Math.max(...exams.map(e => e.id), 0) + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(e => e.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-orange-100 text-orange-700';
      case 'Very Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
            <p className="text-gray-600 mt-2">Manage exams and entrance tests</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Exam
          </button>
        </div>

        {/* Exams Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Exam Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Questions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration (min)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{exam.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.totalQuestions}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.duration}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(exam)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exam.id)}
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
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Exam' : 'Add Exam'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter exam name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Entrance, Medical"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Questions</label>
                  <input
                    type="number"
                    value={formData.totalQuestions}
                    onChange={(e) => setFormData({ ...formData, totalQuestions: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total questions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter duration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very Hard</option>
                  </select>
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
