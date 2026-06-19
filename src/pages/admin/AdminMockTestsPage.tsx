import { useState } from 'react';
import { Edit, Trash2, Plus, X, HelpCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface MockTest {
  id: number;
  name: string;
  examType: string;
  totalQuestions: number;
  duration: number;
  passingScore: number;
  createdDate: string;
}

export default function AdminMockTestsPage() {
  const [mockTests, setMockTests] = useState<MockTest[]>([
    { id: 1, name: 'JEE Main Mock 1', examType: 'JEE Main', totalQuestions: 90, duration: 180, passingScore: 40, createdDate: '2024-06-01' },
    { id: 2, name: 'JEE Main Mock 2', examType: 'JEE Main', totalQuestions: 90, duration: 180, passingScore: 40, createdDate: '2024-06-02' },
    { id: 3, name: 'NEET Mock 1', examType: 'NEET', totalQuestions: 180, duration: 180, passingScore: 50, createdDate: '2024-06-03' },
    { id: 4, name: 'CAT Mock 1', examType: 'CAT', totalQuestions: 66, duration: 120, passingScore: 30, createdDate: '2024-06-04' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    examType: '',
    totalQuestions: 0,
    duration: 0,
    passingScore: 0,
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', examType: '', totalQuestions: 0, duration: 0, passingScore: 0 });
    setShowModal(true);
  };

  const handleEdit = (test: MockTest) => {
    setEditingId(test.id);
    setFormData({
      name: test.name,
      examType: test.examType,
      totalQuestions: test.totalQuestions,
      duration: test.duration,
      passingScore: test.passingScore,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.examType) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setMockTests(mockTests.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      setMockTests([...mockTests, { ...formData, id: Math.max(...mockTests.map(t => t.id), 0) + 1, createdDate: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this mock test?')) {
      setMockTests(mockTests.filter(t => t.id !== id));
    }
  };

  const handleAddQuestions = (testId: number) => {
    setSelectedTestId(testId);
    setShowQuestionModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleCloseQuestionModal = () => {
    setShowQuestionModal(false);
    setSelectedTestId(null);
  };

  const handleSaveQuestions = () => {
    alert(`Questions added to test ${selectedTestId}`);
    handleCloseQuestionModal();
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mock Test Management</h1>
            <p className="text-gray-600 mt-2">Manage and configure mock tests</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Mock Test
          </button>
        </div>

        {/* Mock Tests Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Test Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Exam Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Questions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration (min)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Passing Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTests.map((test) => (
                  <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{test.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {test.examType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{test.totalQuestions}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{test.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{test.passingScore}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{test.createdDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleAddQuestions(test.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap"
                        >
                          <HelpCircle className="w-4 h-4" />
                          Add Q
                        </button>
                        <button
                          onClick={() => handleEdit(test)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(test.id)}
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

        {/* Mock Test Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Mock Test' : 'Add Mock Test'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter test name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type *</label>
                  <select
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select exam type</option>
                    <option value="JEE Main">JEE Main</option>
                    <option value="NEET">NEET</option>
                    <option value="CAT">CAT</option>
                    <option value="UPSC">UPSC</option>
                  </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
                  <input
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter passing score"
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

        {/* Add Questions Modal */}
        {showQuestionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add Questions</h2>
                <button onClick={handleCloseQuestionModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter question"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                  {[1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${i}`}
                    />
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select correct option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseQuestionModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuestions}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
