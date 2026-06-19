import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Trash2, Calendar, User, ChevronRight, Eye, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';

const sampleReports = [
  { id: 'sample-1', student_name: 'Rahul Kumar', created_at: '2024-01-15T10:30:00Z' },
  { id: 'sample-2', student_name: 'Priya Sharma', created_at: '2024-01-10T14:20:00Z' },
  { id: 'sample-3', student_name: 'Arjun Patel', created_at: '2024-01-05T09:15:00Z' }
];

export default function ReportsPage() {
  const { reports, loading, deleteReport } = useData();
  const { showToast } = useToast();
  const displayReports = reports.length > 0 ? reports : sampleReports;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      await deleteReport(id);
      showToast('Report deleted successfully', 'success');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Career Reports</h1>
            <p className="text-gray-500 mt-1">View and download your generated career reports</p>
          </div>
          <Link to="/students/new" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25">Generate New Report</Link>
        </div>

        {loading ? (
          <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div></div>
        ) : displayReports.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports yet</h3>
            <p className="text-gray-500 mb-6">Generate your first career report to see it here</p>
            <Link to="/students/new" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">Create Student Profile <ChevronRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {displayReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><FileText className="w-7 h-7 text-white" /></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Career Blueprint - {report.student_name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><User className="w-4 h-4" />{report.student_name}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(report.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to={`/reports/${report.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"><Eye className="w-4 h-4" />View</Link>
                    <a href={`/reports/${report.id}?download=true`} className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors"><Download className="w-4 h-4" />PDF</a>
                    <button onClick={() => handleDelete(report.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {reports.length === 0 && (
          <div className="bg-blue-50 rounded-xl p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-700 font-medium">Sample Reports Shown</p>
              <p className="text-sm text-blue-600 mt-1">These are sample reports for demonstration. Create a student profile to generate real reports.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
