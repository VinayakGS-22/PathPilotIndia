import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  GraduationCap,
  BookOpen,
  Briefcase,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  Building2,
  Award,
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { STATES_DATA } from '../lib/statesData';
import { COLLEGES, SCHOLARSHIPS, ENTRANCE_EXAMS } from '../lib/constants';

const regionColors: Record<string, string> = {
  South: 'bg-emerald-100 text-emerald-700',
  North: 'bg-blue-100 text-blue-700',
  West: 'bg-orange-100 text-orange-700',
  East: 'bg-violet-100 text-violet-700',
  Northeast: 'bg-cyan-100 text-cyan-700',
  Central: 'bg-amber-100 text-amber-700',
  UT: 'bg-gray-100 text-gray-600',
};

export default function StateDetailPage() {
  const { state: stateParam } = useParams<{ state: string }>();
  const stateName = decodeURIComponent(stateParam || '');

  const stateInfo = STATES_DATA.find(
    s => s.name.toLowerCase() === stateName.toLowerCase()
  );

  if (!stateInfo) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">State Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn&apos;t find information for &ldquo;{stateName}&rdquo;.</p>
            <Link
              to="/states"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to States
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const stateColleges = COLLEGES.filter(
    c => c.state.toLowerCase() === stateInfo.name.toLowerCase()
  ).slice(0, 12);

  const stateExams = ENTRANCE_EXAMS.filter(
    e =>
      stateInfo.topExams.some(te =>
        e.name.toLowerCase().includes(te.toLowerCase()) ||
        te.toLowerCase().includes(e.name.toLowerCase())
      )
  ).slice(0, 8);

  const stateScholarships = SCHOLARSHIPS.filter(
    s =>
      s.state.toLowerCase() === stateInfo.name.toLowerCase() ||
      s.state.toLowerCase() === 'all india'
  ).slice(0, 6);

  const regionColor = regionColors[stateInfo.region] || 'bg-gray-100 text-gray-600';

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-[#0F172A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/states"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All States
          </Link>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold text-xl">{stateInfo.code}</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{stateInfo.name}</h1>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${regionColor}`}>
                  {stateInfo.isUT ? 'Union Territory' : stateInfo.region}
                </span>
              </div>
              <p className="text-white/50 text-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Capital: {stateInfo.capital}
                {stateInfo.boardName && (
                  <span className="ml-4">Board: {stateInfo.boardName}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Admission Guidance */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Admission Guidance
            </h2>
            <p className="text-gray-600 leading-relaxed">{stateInfo.admissionGuidance}</p>
            {stateInfo.officialBoardWebsite && (
              <a
                href={stateInfo.officialBoardWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Official Board Website
              </a>
            )}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
              label="Top Exams"
              value={stateInfo.topExams.slice(0, 3).join(', ')}
            />
            <StatCard
              icon={<Building2 className="w-5 h-5 text-emerald-600" />}
              label="College Categories"
              value={stateInfo.topCollegeCategories.slice(0, 3).join(', ')}
            />
            <StatCard
              icon={<Briefcase className="w-5 h-5 text-amber-600" />}
              label="Popular Careers"
              value={stateInfo.popularCareers.slice(0, 2).join(', ')}
            />
            <StatCard
              icon={<Award className="w-5 h-5 text-violet-600" />}
              label="Key Industries"
              value={stateInfo.keyIndustries.slice(0, 2).join(', ')}
            />
          </div>

          {/* Top Exams */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Key Entrance Exams</h2>
              <Link
                to="/exams"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                All Exams <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {stateInfo.topExams.map(exam => (
                <span
                  key={exam}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
                >
                  {exam}
                </span>
              ))}
            </div>
            {stateExams.length > 0 && (
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {stateExams.map(exam => (
                  <div
                    key={exam.id}
                    className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                  >
                    <p className="font-semibold text-gray-900 text-sm">{exam.name}</p>
                    <p className="text-xs text-blue-600 mt-0.5">{exam.category}</p>
                    {exam.eligibility && (
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{exam.eligibility}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Colleges in this State */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Colleges in {stateInfo.name}
                {stateColleges.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    (showing {stateColleges.length})
                  </span>
                )}
              </h2>
              <Link
                to={`/colleges?state=${encodeURIComponent(stateInfo.name)}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {stateColleges.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stateColleges.map(college => (
                  <div
                    key={college.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {college.name}
                      </h3>
                      <span
                        className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${
                          college.type === 'government'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {college.type === 'government' ? 'Govt' : 'Pvt'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {college.city} · {college.category}
                    </p>
                    {college.average_package && (
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Avg Package:</span> {college.average_package}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {college.exams.slice(0, 2).map(e => (
                        <span
                          key={e}
                          className="text-xs bg-gray-50 border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
                <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No college data available for {stateInfo.name} yet.</p>
                <Link
                  to="/colleges"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Browse all colleges <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Scholarships */}
          {stateScholarships.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Available Scholarships</h2>
                <Link
                  to="/scholarships"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  All Scholarships <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stateScholarships.map(sch => (
                  <div
                    key={sch.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{sch.name}</h3>
                    <p className="text-xs text-emerald-600 font-medium mb-2">{sch.amount}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{sch.eligibility}</p>
                    <p className="text-xs text-gray-400 mt-1.5">Deadline: {sch.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career & Industries */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-500" /> Popular Careers
              </h2>
              <div className="space-y-2">
                {stateInfo.popularCareers.map(career => (
                  <div key={career} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-700">{career}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/careers"
                className="inline-flex items-center gap-1 mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Explore all careers <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-violet-500" /> Key Industries
              </h2>
              <div className="space-y-2">
                {stateInfo.keyIndustries.map(industry => (
                  <div key={industry} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-700">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
            <strong>Note:</strong> College and exam data shown is for general guidance only. Fees,
            eligibility, and other details may change annually. Always verify with official college
            websites before applying.
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-sm text-gray-700 font-medium leading-snug">{value}</p>
    </div>
  );
}
