import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Briefcase, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { CAREERS } from '../lib/constants';
import { Career } from '../types';

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = Array.from(new Set(CAREERS.map(c => c.category))).sort();

  const filteredCareers = CAREERS.filter(career => {
    const matchesSearch = career.name.toLowerCase().includes(searchQuery.toLowerCase()) || career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || career.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getDemandColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700';
    if (score >= 75) return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getRiskColor = (level: string) => {
    if (level === 'Low') return 'bg-green-50 text-green-700 border-green-200';
    if (level === 'Medium') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Career Paths</h1>
            <p className="text-lg text-gray-600">Explore diverse career opportunities with detailed information on roles, salaries, demand, and learning paths</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search careers by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-3 border border-gray-200 rounded-xl bg-white min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span>Showing {filteredCareers.length} careers</span>
              {(categoryFilter !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                  }}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
              <Link
                key={career.id}
                to={`/careers/${career.slug}`}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 p-5 relative">
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {career.category}
                    </span>
                  </div>
                  <Briefcase className="w-10 h-10 text-blue-600 absolute bottom-4" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1 text-lg">{career.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{career.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Salary Range</span>
                      <span className="font-medium text-gray-900">{career.salary_range}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Future Demand</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                            style={{ width: `${career.future_demand_score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getDemandColor(career.future_demand_score)}`}>
                          {career.future_demand_score}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Risk Level</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getRiskColor(career.risk_level)}`}>
                        {career.risk_level}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-400">
                      {career.skills_to_learn ? `${career.skills_to_learn.length} skills to learn` : 'View details'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No careers found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
