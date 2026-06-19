import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Building, GraduationCap, X, ExternalLink, ChevronDown } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { COLLEGES, INDIAN_STATES } from '../lib/constants';
import { College } from '../types';

export default function CollegesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  useEffect(() => {
    const collegeFromUrl = searchParams.get('college');
    if (collegeFromUrl) {
      const college = COLLEGES.find(c => c.id === collegeFromUrl);
      if (college) setSelectedCollege(college);
    }
  }, [searchParams]);

  const filteredColleges = COLLEGES.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) || college.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === 'all' || college.state === stateFilter;
    const matchesType = typeFilter === 'all' || college.type === typeFilter;
    return matchesSearch && matchesState && matchesType;
  });

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Indian Colleges Directory</h1>
            <p className="text-lg text-gray-600">Explore 40+ top Indian colleges with details on courses, fees, placements, and entrance exams</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search colleges by name or city..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="appearance-none pl-4 pr-8 py-3 border border-gray-200 rounded-xl bg-white min-w-[180px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option value="all">All States</option>
                    {INDIAN_STATES.slice(0, 15).map(s => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div className="relative">
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="appearance-none pl-4 pr-8 py-3 border border-gray-200 rounded-xl bg-white min-w-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option value="all">All Types</option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span>Showing {filteredColleges.length} colleges</span>
              {(stateFilter !== 'all' || typeFilter !== 'all' || searchQuery) && (
                <button onClick={() => { setSearchQuery(''); setStateFilter('all'); setTypeFilter('all'); setSearchParams({}); }} className="flex items-center gap-1 text-blue-600 hover:text-blue-700"><X className="w-4 h-4" />Clear filters</button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredColleges.map((college) => (
              <div key={college.id} onClick={() => setSelectedCollege(college)} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 p-5 relative">
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${college.type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{college.type === 'government' ? 'Government' : 'Private'}</span>
                  </div>
                  <GraduationCap className="w-10 h-10 text-blue-600 absolute bottom-4" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{college.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{college.city}, {college.state}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fees/Year</span>
                      <span className="font-medium text-gray-900">{college.approx_fees.split('/')[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg Package</span>
                      <span className="font-medium text-green-600">{college.average_package}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {college.accepted_exams.slice(0, 3).map(exam => (<span key={exam} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">{exam}</span>))}
                    {college.accepted_exams.length > 3 && (<span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">+{college.accepted_exams.length - 3}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {selectedCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedCollege(null)} />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-700 p-6 relative">
              <button onClick={() => setSelectedCollege(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"><X className="w-6 h-6 text-white" /></button>
              <div className="absolute bottom-6 left-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${selectedCollege.type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{selectedCollege.type === 'government' ? 'Government' : 'Private'}</span>
                <h2 className="text-2xl font-bold text-white mt-2">{selectedCollege.name}</h2>
                <p className="text-blue-100">{selectedCollege.city}, {selectedCollege.state}</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Approx. Fees (Yearly)</p>
                  <p className="text-xl font-bold text-gray-900">{selectedCollege.approx_fees}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Average Package</p>
                  <p className="text-xl font-bold text-green-600">{selectedCollege.average_package}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Courses Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCollege.courses.map(course => (<span key={course} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">{course}</span>))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Accepted Entrance Exams</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCollege.accepted_exams.map(exam => (<span key={exam} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">{exam}</span>))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"><ExternalLink className="w-5 h-5" />Visit Website</a>
                <button onClick={() => setSelectedCollege(null)} className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
