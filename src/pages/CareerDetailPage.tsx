import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BookOpen, Youtube, Award, Zap, Briefcase, TrendingUp, AlertCircle, MapPin, Users, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { CAREERS } from '../lib/constants';

export default function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const career = CAREERS.find(c => c.slug === slug);

  if (!career) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Career not found</h1>
            <button
              onClick={() => navigate('/careers')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const getDemandColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' };
    if (score >= 75) return { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' };
    return { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' };
  };

  const getRiskColor = (level: string) => {
    if (level === 'Low') return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
    if (level === 'Medium') return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  };

  const demandColor = getDemandColor(career.future_demand_score);
  const riskColor = getRiskColor(career.risk_level);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/careers')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Careers
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                    {career.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900">{career.name}</h1>
                  <p className="text-gray-600 mt-2 text-lg">{career.description}</p>
                </div>
                <Briefcase className="w-16 h-16 text-blue-600 flex-shrink-0" />
              </div>

              {/* Key Stats */}
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                  <div className="text-sm text-gray-600 mb-2">Salary Range</div>
                  <div className="text-2xl font-bold text-gray-900">{career.salary_range}</div>
                </div>

                <div className={`${demandColor.bg} rounded-xl p-6 border border-blue-100`}>
                  <div className="text-sm text-gray-600 mb-2">Future Demand Score</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${demandColor.bar}`}
                          style={{ width: `${career.future_demand_score}%` }}
                        />
                      </div>
                    </div>
                    <div className={`text-3xl font-bold ${demandColor.text}`}>
                      {career.future_demand_score}%
                    </div>
                  </div>
                </div>

                <div className={`${riskColor.bg} rounded-xl p-6 border ${riskColor.border}`}>
                  <div className="text-sm text-gray-600 mb-2">Risk Level</div>
                  <div className={`text-2xl font-bold ${riskColor.text}`}>
                    {career.risk_level}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What They Do */}
              {career.what_they_do && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">What They Do</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{career.what_they_do}</p>
                </div>
              )}

              {/* Who Should Choose */}
              {career.who_should_choose && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Who Should Choose This</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{career.who_should_choose}</p>
                </div>
              )}

              {/* Subjects & Skills */}
              <div className="grid sm:grid-cols-2 gap-6">
                {career.subjects_required && career.subjects_required.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">Subjects Required</h3>
                    </div>
                    <div className="space-y-2">
                      {career.subjects_required.map((subject, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {career.skills_to_learn && career.skills_to_learn.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">Skills to Learn</h3>
                    </div>
                    <div className="space-y-2">
                      {career.skills_to_learn.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tools */}
              {career.tools && career.tools.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Tools & Technologies</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmap */}
              {career.roadmap && career.roadmap.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Learning Roadmap</h3>
                  </div>
                  <div className="space-y-6">
                    {career.roadmap.map((item, idx) => (
                      <div key={idx} className="pb-6 last:pb-0 border-b border-gray-100 last:border-0">
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">{item.class}</h4>
                        <ul className="space-y-2">
                          {item.actions.map((action, actionIdx) => (
                            <li key={actionIdx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Free Courses */}
              {career.free_courses && career.free_courses.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Free Courses</h3>
                  </div>
                  <div className="space-y-3">
                    {career.free_courses.map((course, idx) => (
                      <a
                        key={idx}
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors break-words">
                            {course.name}
                          </div>
                          {course.best_for && (
                            <div className="text-xs text-gray-500 mt-1">{course.best_for}</div>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Channels */}
              {career.youtube_channels && career.youtube_channels.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-bold text-gray-900">YouTube Channels</h3>
                  </div>
                  <ul className="space-y-2">
                    {career.youtube_channels.map((channel, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                        <span>{channel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              {career.certifications && career.certifications.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
                  </div>
                  <ul className="space-y-2">
                    {career.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projects */}
              {career.projects && career.projects.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Projects to Build</h3>
                  </div>
                  <ul className="space-y-2">
                    {career.projects.map((project, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alternative Careers */}
              {career.alternative_careers && career.alternative_careers.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Similar Careers</h3>
                  </div>
                  <div className="space-y-2">
                    {career.alternative_careers.map((alt, idx) => (
                      <div key={idx} className="px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm">
                        {alt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to pursue {career.name}?</h2>
            <p className="mb-6 text-blue-100">Explore colleges, exams, and scholarships to get started on your journey</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/colleges"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Explore Colleges
              </Link>
              <Link
                to="/exams"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Check Entrance Exams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
