import { Link } from 'react-router-dom';
import { ArrowRight, Check, GraduationCap } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { CAREERS, COLLEGES, SCHOLARSHIPS, ENTRANCE_EXAMS } from '../lib/constants';
import { Career, College, Scholarship, EntranceExam } from '../types';

const sampleReport = {
  id: 'sample', student_name: 'Rahul Kumar', created_at: new Date().toISOString(),
  top_careers: CAREERS.slice(0, 5), recommended_colleges: COLLEGES.slice(0, 10),
  scholarships: SCHOLARSHIPS.slice(0, 8), exams: ENTRANCE_EXAMS.slice(0, 5), roadmap: CAREERS[0].roadmap
};

export default function SampleReportPage() {
  return (
    <Layout>
      <div className="py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">Sample Report</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">See What You'll Get with PathPilot Premium</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">This is an example of the detailed career blueprint report you'll receive for your child</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"><span className="text-3xl font-bold">RK</span></div>
                <div>
                  <h2 className="text-2xl font-bold">{sampleReport.student_name}</h2>
                  <p className="text-blue-100">Class 10 - CBSE - Bangalore</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">Marks</p><p className="font-semibold">85%</p></div>
                <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">Career Matches</p><p className="font-semibold">{sampleReport.top_careers.length}</p></div>
                <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">Colleges</p><p className="font-semibold">{sampleReport.recommended_colleges.length}</p></div>
                <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">Scholarships</p><p className="font-semibold">{sampleReport.scholarships.length}</p></div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Career Recommendations</h3>
                <div className="space-y-4">
                  {sampleReport.top_careers.map((career: Career, index: number) => (
                    <div key={career.id} className="bg-gray-50 rounded-xl p-5 flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>{index + 1}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">{career.name}</h4>
                          <span className="text-lg font-bold text-blue-600">{career.future_demand_score}%</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">{career.salary_range}</span>
                          <span className={`px-3 py-1 text-sm rounded-full ${career.risk_level === 'Low' ? 'bg-green-100 text-green-700' : career.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{career.risk_level} Risk</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Roadmap: Software Engineering</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sampleReport.roadmap.map((phase, i) => (
                    <div key={i} className="bg-white rounded-lg p-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">{i + 1}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{phase.class}</h4>
                      <ul className="space-y-1 text-sm text-gray-600">{phase.actions.slice(0, 2).map((action, j) => (<li key={j}>- {action}</li>))}</ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Entrance Exams to Prepare</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {sampleReport.exams.slice(0, 3).map((exam: EntranceExam) => (
                    <div key={exam.id} className="bg-purple-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900">{exam.name}</h4>
                      <p className="text-sm text-purple-600">{exam.career_stream}</p>
                      <p className="text-sm text-gray-600 mt-2">Timeline: {exam.timeline}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Colleges</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleReport.recommended_colleges.slice(0, 6).map((college: College) => (
                    <div key={college.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{college.name}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${college.type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{college.type === 'government' ? 'Govt' : 'Private'}</span>
                      </div>
                      <p className="text-sm text-gray-500">{college.city}, {college.state}</p>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-600">{college.approx_fees.split('/')[0]}/yr</span>
                        <span className="font-medium text-green-600">{college.average_package}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scholarship Matches</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sampleReport.scholarships.slice(0, 4).map((scholarship: Scholarship) => (
                    <div key={scholarship.id} className="bg-yellow-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900">{scholarship.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{scholarship.eligibility}</p>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="font-medium text-green-600">{scholarship.amount}</span>
                        <span className="text-gray-500">Deadline: {scholarship.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Your Child's Personalized Report?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Sign up for free to create a student profile and generate a detailed career blueprint with AI-powered recommendations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all">Get Started Free</Link>
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all">View Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
