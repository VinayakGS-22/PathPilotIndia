import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, BookOpen, ExternalLink, Plus, Check, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { ENTRANCE_EXAMS } from '../lib/constants';
import { EntranceExam } from '../types';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [streamFilter, setStreamFilter] = useState('all');
  const { addSavedExam, savedExams, removeSavedExam } = useData();
  const { showToast } = useToast();
  const streams = [...new Set(ENTRANCE_EXAMS.map(e => e.career_stream))];

  const filteredExams = ENTRANCE_EXAMS.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) || exam.career_stream.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStream = streamFilter === 'all' || exam.career_stream === streamFilter;
    return matchesSearch && matchesStream;
  });

  const isExamSaved = (examId: string) => savedExams.some(e => e.exam_id === examId);

  const handleToggleExam = async (exam: EntranceExam) => {
    const saved = savedExams.find(e => e.exam_id === exam.id);
    if (saved) { await removeSavedExam(saved.id); showToast(`${exam.name} removed from your plan`, 'info'); }
    else { await addSavedExam({ user_id: '', exam_id: exam.id, exam_name: exam.name }); showToast(`${exam.name} added to your plan`, 'success'); }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4"><Calendar className="w-4 h-4" />Track Important Dates</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Entrance Exam Planner</h1>
            <p className="text-lg text-gray-600">Plan ahead with all major Indian entrance exams, dates, and preparation resources</p>
          </div>

          {savedExams.length > 0 && (
            <div className="bg-purple-100 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-purple-800 font-medium">{savedExams.length} exam{savedExams.length !== 1 ? 's' : ''} saved to your plan</span>
              </div>
              <Link to="/dashboard" className="text-purple-700 font-medium hover:text-purple-800">View Dashboard</Link>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search exams..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select value={streamFilter} onChange={(e) => setStreamFilter(e.target.value)} className="appearance-none pl-12 pr-8 py-3 border border-gray-200 rounded-xl bg-white min-w-[200px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                  <option value="all">All Streams</option>
                  {streams.map(s => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div key={exam.id} className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-lg transition-all overflow-hidden ${isExamSaved(exam.id) ? 'border-purple-300 bg-purple-50' : 'border-gray-100'}`}>
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{exam.name}</h3>
                      <p className="text-sm text-purple-600">{exam.career_stream}</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><BookOpen className="w-5 h-5 text-purple-600" /></div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Eligibility</p>
                      <p className="text-sm text-gray-700">{exam.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Subjects</p>
                      <div className="flex flex-wrap gap-1">
                        {exam.subjects.slice(0, 4).map(subject => (<span key={subject} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">{subject}</span>))}
                        {exam.subjects.length > 4 && (<span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">+{exam.subjects.length - 4}</span>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4" /><span>Timeline: {exam.timeline}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleToggleExam(exam)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${isExamSaved(exam.id) ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <Plus className={`w-4 h-4 ${isExamSaved(exam.id) ? 'rotate-45' : ''}`} />{isExamSaved(exam.id) ? 'Saved' : 'Add to Plan'}
                    </button>
                    <a href={exam.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"><ExternalLink className="w-4 h-4" />Website</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-500">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
