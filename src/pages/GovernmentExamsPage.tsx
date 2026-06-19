import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Plus, Check, BookOpen, Award, Briefcase } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { EXAMS } from '../lib/constants';
import { Exam } from '../types';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';

interface CategoryGroup {
  title: string;
  description: string;
  icon: React.ReactNode;
  exams: Exam[];
}

export default function GovernmentExamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addSavedExam, savedExams, removeSavedExam } = useData();
  const { showToast } = useToast();

  const categories: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
    'Government (12th Pass)': {
      title: '12th Pass Exams',
      description: 'Government exams accessible after 12th standard completion',
      icon: <BookOpen className="w-6 h-6" />,
    },
    'Government (Graduate)': {
      title: 'Graduate Exams',
      description: 'Government exams for graduation degree holders',
      icon: <Award className="w-6 h-6" />,
    },
    'Government (Engineering)': {
      title: 'Engineering Graduate Exams',
      description: 'Specialized government exams for engineering graduates',
      icon: <Briefcase className="w-6 h-6" />,
    },
  };

  const groupedExams: Record<string, Exam[]> = {
    'Government (12th Pass)': [],
    'Government (Graduate)': [],
    'Government (Engineering)': [],
  };

  EXAMS.forEach((exam) => {
    if (groupedExams[exam.category]) {
      groupedExams[exam.category].push(exam);
    }
  });

  // Apply search filter to all groups
  const filteredGroups: CategoryGroup[] = Object.entries(groupedExams)
    .filter(([key]) => categories[key])
    .map(([key, exams]) => ({
      title: categories[key].title,
      description: categories[key].description,
      icon: categories[key].icon,
      exams: exams.filter(
        (exam) =>
          exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exam.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exam.pattern && exam.pattern.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((group) => group.exams.length > 0 || searchQuery === '');

  const isExamSaved = (examId: string) => savedExams.some((e) => e.exam_id === examId);

  const handleToggleExam = async (exam: Exam) => {
    const saved = savedExams.find((e) => e.exam_id === exam.id);
    if (saved) {
      await removeSavedExam(saved.id);
      showToast(`${exam.name} removed from your plan`, 'info');
    } else {
      await addSavedExam({ user_id: '', exam_id: exam.id, exam_name: exam.name });
      showToast(`${exam.name} added to your plan`, 'success');
    }
  };

  const totalSavedInCategory = (categoryExams: Exam[]) =>
    categoryExams.filter((exam) => isExamSaved(exam.id)).length;

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              Government Career Path
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Government Exam Planner</h1>
            <p className="text-lg text-gray-600">
              Explore and plan your journey through major Indian government exams across all qualification levels
            </p>
          </div>

          {/* Saved Exams Summary */}
          {savedExams.length > 0 && (
            <div className="bg-blue-100 rounded-xl p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  {savedExams.length} exam{savedExams.length !== 1 ? 's' : ''} saved to your plan
                </span>
              </div>
              <Link to="/dashboard" className="text-blue-700 font-medium hover:text-blue-800">
                View Dashboard
              </Link>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by exam name, eligibility, or exam pattern..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Categories */}
          {filteredGroups.length > 0 ? (
            <div className="space-y-12">
              {filteredGroups.map((group) => (
                <div key={group.title}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {group.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{group.title}</h2>
                      <p className="text-gray-600">{group.description}</p>
                    </div>
                    {totalSavedInCategory(group.exams) > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        <Check className="w-4 h-4" />
                        {totalSavedInCategory(group.exams)} saved
                      </div>
                    )}
                  </div>

                  {/* Exam Cards Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {group.exams.map((exam) => (
                      <div
                        key={exam.id}
                        className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-lg transition-all overflow-hidden ${
                          isExamSaved(exam.id) ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
                        }`}
                      >
                        {/* Top colored bar */}
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />

                        {/* Card Content */}
                        <div className="p-5">
                          {/* Title and Icon */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{exam.name}</h3>
                              <p className="text-sm text-blue-600 font-medium">{exam.category}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="space-y-3 mb-5">
                            {/* Eligibility */}
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Eligibility</p>
                              <p className="text-sm text-gray-700">{exam.eligibility}</p>
                            </div>

                            {/* Age Limit */}
                            {exam.age_limit && (
                              <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Age Limit</p>
                                <p className="text-sm text-gray-700">{exam.age_limit}</p>
                              </div>
                            )}

                            {/* Exam Pattern */}
                            {exam.pattern && (
                              <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Exam Pattern</p>
                                <p className="text-sm text-gray-700">{exam.pattern}</p>
                              </div>
                            )}

                            {/* Timeline */}
                            {exam.timeline && (
                              <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Timeline</p>
                                <p className="text-sm text-gray-700">{exam.timeline}</p>
                              </div>
                            )}

                            {/* Subjects */}
                            {exam.subjects && exam.subjects.length > 0 && (
                              <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Subjects</p>
                                <div className="flex flex-wrap gap-1">
                                  {exam.subjects.slice(0, 3).map((subject) => (
                                    <span
                                      key={subject}
                                      className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                                    >
                                      {subject}
                                    </span>
                                  ))}
                                  {exam.subjects.length > 3 && (
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                      +{exam.subjects.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleToggleExam(exam)}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
                                isExamSaved(exam.id)
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Plus
                                className={`w-4 h-4 transition-transform ${isExamSaved(exam.id) ? 'rotate-45' : ''}`}
                              />
                              {isExamSaved(exam.id) ? 'Saved' : 'Add to Plan'}
                            </button>
                            <a
                              href={exam.official_website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Website
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search or browse by category</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
