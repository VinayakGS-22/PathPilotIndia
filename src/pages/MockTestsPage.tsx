import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Filter, HelpCircle, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { MOCK_TESTS } from '../lib/constants';

export default function MockTestsPage() {
  const [examFilter, setExamFilter] = useState('all');

  const exams = [...new Set(MOCK_TESTS.map(test => test.exam_name))];

  const filteredTests = examFilter === 'all'
    ? MOCK_TESTS
    : MOCK_TESTS.filter(test => test.exam_name === examFilter);

  const getDifficultyColor = (duration: number) => {
    if (duration <= 60) return 'bg-green-100 text-green-700';
    if (duration <= 120) return 'bg-yellow-100 text-yellow-700';
    return 'bg-orange-100 text-orange-700';
  };

  const getExamColor = (examName: string) => {
    const colors: { [key: string]: string } = {
      'KCET': 'from-blue-500 to-blue-600',
      'JEE Main': 'from-purple-500 to-purple-600',
      'NEET': 'from-green-500 to-green-600',
      'COMEDK': 'from-red-500 to-red-600',
      'MHT CET': 'from-indigo-500 to-indigo-600',
      'BITSAT': 'from-amber-500 to-amber-600',
    };
    return colors[examName] || 'from-gray-500 to-gray-600';
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Practice & Prepare
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mock Tests</h1>
            <p className="text-lg text-gray-600">Take full-length mock tests to assess your preparation and improve your score</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Filter by Exam</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setExamFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  examFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Exams
              </button>
              {exams.map(exam => (
                <button
                  key={exam}
                  onClick={() => setExamFilter(exam)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    examFilter === exam
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

          {/* Tests Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <Link
                key={test.id}
                to={`/mock-tests/${test.id}`}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-blue-200">
                  {/* Header Gradient */}
                  <div className={`h-3 bg-gradient-to-r ${getExamColor(test.exam_name)}`} />

                  <div className="p-6">
                    {/* Exam Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                      <HelpCircle className="w-3 h-3" />
                      {test.exam_name}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {test.title}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Duration */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getDifficultyColor(test.duration_minutes)}`}>
                            {test.duration_minutes}m
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">Duration</p>
                      </div>

                      {/* Questions */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-bold text-gray-900 mb-1">
                          {test.total_questions}
                        </div>
                        <p className="text-xs text-gray-600">Questions</p>
                      </div>

                      {/* Marks */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-bold text-gray-900 mb-1">
                          {test.total_marks}
                        </div>
                        <p className="text-xs text-gray-600">Total Marks</p>
                      </div>

                      {/* Subjects Count */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-bold text-gray-900 mb-1">
                          {test.subjects.length}
                        </div>
                        <p className="text-xs text-gray-600">Subject{test.subjects.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">Subjects</p>
                      <div className="flex flex-wrap gap-1.5">
                        {test.subjects.map(subject => (
                          <span
                            key={subject}
                            className="px-2.5 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Instructions Preview */}
                    {test.instructions && (
                      <p className="text-xs text-gray-600 line-clamp-2 mb-4 pb-4 border-b border-gray-100">
                        {test.instructions}
                      </p>
                    )}

                    {/* CTA Button */}
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all group-hover:from-blue-700 group-hover:to-blue-800">
                      Start Test
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tests found</h3>
              <p className="text-gray-500">Try selecting a different exam filter</p>
            </div>
          )}

          {/* Stats Footer */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{MOCK_TESTS.length}</div>
              <p className="text-gray-600 font-medium">Total Mock Tests</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{exams.length}</div>
              <p className="text-gray-600 font-medium">Exams Covered</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{MOCK_TESTS.reduce((sum, test) => sum + test.total_questions, 0)}</div>
              <p className="text-gray-600 font-medium">Total Questions</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
