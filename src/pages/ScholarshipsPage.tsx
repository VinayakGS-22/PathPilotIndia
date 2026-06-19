import { useState } from 'react';
import { Search, MapPin, Award, ExternalLink, X, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { SCHOLARSHIPS, INDIAN_STATES } from '../lib/constants';
import { Scholarship } from '../types';

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('all');

  const filteredScholarships = SCHOLARSHIPS.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) || scholarship.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === 'all' || scholarship.applicable_state === 'All India' || scholarship.applicable_state === stateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <Layout>
      <div className="bg-gradient-to-br from-yellow-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4"><Award className="w-4 h-4" />25+ Scholarships Listed</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Indian Scholarship Directory</h1>
            <p className="text-lg text-gray-600">Discover scholarships for Indian students with eligibility criteria and application deadlines</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search scholarships..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="appearance-none pl-12 pr-8 py-3 border border-gray-200 rounded-xl bg-white min-w-[200px] focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none">
                  <option value="all">All States</option>
                  <option value="All India">All India Scholarships</option>
                  {INDIAN_STATES.slice(0, 10).map(s => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span>Showing {filteredScholarships.length} scholarships</span>
              {(stateFilter !== 'all' || searchQuery) && (<button onClick={() => { setSearchQuery(''); setStateFilter('all'); }} className="flex items-center gap-1 text-blue-600 hover:text-blue-700"><X className="w-4 h-4" />Clear filters</button>)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-500" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{scholarship.name}</h3>
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-yellow-600" /></div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{scholarship.eligibility}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-4 h-4" />{scholarship.applicable_state}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500"><Calendar className="w-4 h-4" />Deadline: {scholarship.deadline}</div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-semibold text-green-600">{scholarship.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Income Limit</p>
                      <p className="text-sm text-gray-700">{scholarship.income_limit}</p>
                    </div>
                  </div>
                  <a href={scholarship.website} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-yellow-50 text-yellow-700 rounded-lg font-medium hover:bg-yellow-100 transition-colors"><ExternalLink className="w-4 h-4" />Apply Now</a>
                </div>
              </div>
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
