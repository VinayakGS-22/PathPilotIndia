import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FileText, Download, ArrowLeft, User, Target, Building, Award, Calendar, ChevronRight, Check, TrendingUp, Briefcase, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { CAREERS, COLLEGES, SCHOLARSHIPS, ENTRANCE_EXAMS } from '../lib/constants';
import { Report } from '../types';

const sampleReport: Report = {
  id: 'sample-report', user_id: 'demo', student_id: 'sample', student_name: 'Rahul Kumar', created_at: new Date().toISOString(),
  top_careers: CAREERS.slice(0, 5), recommended_colleges: COLLEGES.slice(0, 10),
  scholarships: SCHOLARSHIPS.slice(0, 8), exams: ENTRANCE_EXAMS.slice(0, 5), roadmap: CAREERS[0].roadmap
};

export default function ReportDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { getReport } = useData();
  const { showToast } = useToast();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const isDownload = searchParams.get('download') === 'true';

  useEffect(() => {
    const found = getReport(id || '');
    if (found) setReport(found);
    else if (id) setReport({ ...sampleReport, id });
    setLoading(false);
  }, [id, getReport]);

  useEffect(() => {
    if (isDownload) handleDownload();
  }, [isDownload]);

  const handleDownload = async () => {
    if (!report) return;
    setIsDownloading(true);
    showToast('Preparing PDF for download...', 'info');
    setTimeout(() => { window.print(); setIsDownloading(false); }, 1000);
  };

  if (loading) return (<DashboardLayout><div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div></DashboardLayout>);
  if (!report) return (<DashboardLayout><div className="text-center py-12"><FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" /><h2 className="text-xl font-semibold text-gray-900 mb-2">Report Not Found</h2><p className="text-gray-500">The report you're looking for doesn't exist</p></div></DashboardLayout>);

  return (
    <DashboardLayout>
      <div className="space-y-6" id="print-content">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <a href="/reports" className="p-2 rounded-lg hover:bg-gray-100"><ArrowLeft className="w-5 h-5" /></a>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Career Blueprint Report</h1>
              <p className="text-gray-500 mt-1">Generated for {report.student_name}</p>
            </div>
          </div>
          <button onClick={handleDownload} disabled={isDownloading} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50"><Download className="w-5 h-5" />{isDownloading ? 'Preparing...' : 'Download PDF'}</button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white print:p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"><FileText className="w-8 h-8" /></div>
            <div>
              <h2 className="text-2xl font-bold">{report.student_name}</h2>
              <p className="text-blue-100">Career Blueprint Report</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">Generated On</p><p className="font-semibold">{new Date(report.created_at).toLocaleDateString('en-IN')}</p></div>
            <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">Career Paths</p><p className="font-semibold">{report.top_careers.length}</p></div>
            <div className="bg-white/10 rounded-lg p-3"><p className="text-blue-200">College Matches</p><p className="font-semibold">{report.recommended_colleges.length}</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" />Top Career Recommendations</h2>
          </div>
          <div className="p-5 space-y-4">
            {report.top_careers.map((career, index) => (
              <div key={career.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{index + 1}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{career.name}</h3>
                    <span className="text-lg font-bold text-blue-600">{career.future_demand_score}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{career.salary_range}</span>
                    <span className={`px-2 py-1 text-xs rounded ${career.risk_level === 'Low' ? 'bg-green-100 text-green-700' : career.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{career.risk_level} Risk</span>
                    {career.entrance_exams.slice(0, 2).map(exam => (<span key={exam} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{exam}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-green-600" />Career Roadmap</h2>
          </div>
          <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {report.top_careers[0]?.roadmap.map((phase, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">{i + 1}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{phase.class}</h4>
                <ul className="space-y-2">
                  {phase.actions.map((action, j) => (<li key={j} className="flex items-start gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{action}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Building className="w-5 h-5 text-blue-600" />Recommended Colleges</h2>
            </div>
            <div className="p-5 grid gap-4">
              {report.recommended_colleges.slice(0, 6).map((college) => (
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
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Award className="w-5 h-5 text-yellow-600" />Scholarship Opportunities</h2>
            </div>
            <div className="p-5 grid gap-4">
              {report.scholarships.slice(0, 6).map((scholarship) => (
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
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Check className="w-6 h-6" />Parent Action Plan</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {['Discuss career options with your child', 'Focus on strengthening subjects', 'Enroll in entrance exam foundation courses', 'Track key exam dates and deadlines', 'Apply for eligible scholarships', 'Schedule regular progress reviews'].map((action, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">{i + 1}</div>
                <p className="text-green-50">{action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200 print:pb-16">
          <p>This report was generated by PathPilot India on {new Date(report.created_at).toLocaleDateString('en-IN')}</p>
        </div>
      </div>
      <style>{`@media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } .print\\:hidden { display: none !important; } .print\\:pb-16 { padding-bottom: 4rem; } }`}</style>
    </DashboardLayout>
  );
}
