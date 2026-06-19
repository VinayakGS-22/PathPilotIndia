import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { STATES_DATA, StateInfo } from '../lib/statesData';

const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Northeast', 'Central', 'UT'];

const regionColors: Record<string, string> = {
  South: 'bg-emerald-100 text-emerald-700',
  North: 'bg-blue-100 text-blue-700',
  West: 'bg-orange-100 text-orange-700',
  East: 'bg-violet-100 text-violet-700',
  Northeast: 'bg-cyan-100 text-cyan-700',
  Central: 'bg-amber-100 text-amber-700',
  UT: 'bg-gray-100 text-gray-600',
};

export default function StatesPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  const filtered = STATES_DATA.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.capital.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'All' || s.region === region;
    return matchSearch && matchRegion;
  });

  const states = filtered.filter(s => !s.isUT);
  const uts = filtered.filter(s => s.isUT);

  return (
    <Layout>
      <div className="bg-[#0F172A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-5">
            <MapPin className="w-4 h-4" /> India-Wide Coverage
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Education by State</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore colleges, entrance exams, scholarships, and career guidance tailored to each
            state and union territory across India.
          </p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search states or capitals..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map(r => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    region === r
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {states.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pt-4">States ({states.length})</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {states.map(state => (
                  <StateCard key={state.name} state={state} />
                ))}
              </div>
            </>
          )}

          {uts.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Union Territories ({uts.length})
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {uts.map(state => (
                  <StateCard key={state.name} state={state} />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No results found for &ldquo;{search}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function StateCard({ state }: { state: StateInfo }) {
  const regionColor = regionColors[state.region] || 'bg-gray-100 text-gray-600';
  return (
    <Link
      to={`/states/${encodeURIComponent(state.name)}`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">{state.code}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${regionColor}`}>
          {state.region}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">
        {state.name}
      </h3>
      <p className="text-xs text-gray-500 mb-3">{state.capital}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {state.topCollegeCategories.slice(0, 3).map(cat => (
          <span
            key={cat}
            className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200"
          >
            {cat}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View State Guide <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
