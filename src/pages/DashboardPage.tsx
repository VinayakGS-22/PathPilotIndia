import { Link } from 'react-router-dom';
import { Plus, GraduationCap, Award, Calendar, FileText, ArrowRight, Users, BookOpen, Map, Star } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { COLLEGES, SCHOLARSHIPS, ENTRANCE_EXAMS } from '../lib/constants';

export default function DashboardPage() {
  const { user } = useAuth();
  const { students, reports, savedExams, loading } = useData();
  const isStudent = user?.role === 'student';
  const isParent = user?.role === 'parent';

  const topColleges = COLLEGES.slice(0, 4);
  const upcomingExams = ENTRANCE_EXAMS.slice(0, 3);
  const recommendedScholarships = SCHOLARSHIPS.slice(0, 3);

  // --- Student view ---
  if (isStudent) {
    const myReports = reports.length > 0 ? reports : [];
    const sampleReports = [
      { id: 'sample-1', student_name: user?.name || 'You', created_at: '2024-01-15' },
    ];
    const displayReports = myReports.length > 0 ? myReports : sampleReports;

    const studentQuickActions = [
      { name: 'View Colleges', href: '/colleges', icon: GraduationCap, color: 'bg-green-600' },
      { name: 'Find Scholarships', href: '/scholarships', icon: Award, color: 'bg-yellow-600' },
      { name: 'Exam Planner', href: '/exams', icon: Calendar, color: 'bg-blue-600' },
      { name: 'My Roadmap', href: '/roadmap', icon: Map, color: 'bg-rose-600' },
      { name: 'Careers', href: '/careers', icon: BookOpen, color: 'bg-teal-600' },
      { name: 'Mock Tests', href: '/mock-tests', icon: Star, color: 'bg-orange-600' },
    ];

    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-gray-500 mt-1">Here's your career planning overview</p>
          </div>

          {/* Stats — student-specific */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'My Reports', value: displayReports.length, icon: FileText, color: 'green', trend: 'Generated' },
              { label: 'Saved Colleges', value: 8, icon: GraduationCap, color: 'blue', trend: '4 new matches' },
              { label: 'Exams Tracked', value: savedExams.length || 3, icon: Calendar, color: 'purple', trend: '2 upcoming' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <span className="text-xs text-gray-500">{stat.trend}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick actions — no Add Student */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {studentQuickActions.map((action) => (
              <Link key={action.name} to={action.href} className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-gray-900 text-sm">{action.name}</p>
              </Link>
            ))}
          </div>

          {/* My Recent Reports */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">My Recent Reports</h2>
                  <Link to="/reports" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : displayReports.slice(0, 4).map((report) => (
                    <Link key={report.id} to={`/reports/${report.id}`} className="block p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{report.student_name}</p>
                          <p className="text-xs text-gray-500">{new Date(report.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Upcoming Exams</h2>
                  <Link to="/exams" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{exam.name}</p>
                          <p className="text-xs text-gray-500">{exam.exam_date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Colleges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Recommended Colleges</h2>
              <Link to="/colleges" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topColleges.map((college) => (
                <Link key={college.id} to={`/colleges?college=${college.id}`} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><GraduationCap className="w-5 h-5 text-blue-600" /></div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${college.type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{college.type === 'government' ? 'Govt' : 'Private'}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{college.name}</h3>
                  <p className="text-sm text-gray-500">{college.city}, {college.state}</p>
                  <p className="text-sm text-blue-600 mt-2">{college.average_package}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recommended Scholarships</h2>
              <Link to="/scholarships" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recommendedScholarships.map((scholarship) => (
                <a key={scholarship.id} href={scholarship.website} target="_blank" rel="noopener noreferrer" className="block p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-yellow-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{scholarship.name}</p>
                      <p className="text-sm text-gray-500">{scholarship.amount}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // --- Parent / default view ---
  const sampleReports = [
    { id: 'sample-1', student_name: 'Rahul Kumar', created_at: '2024-01-15' },
    { id: 'sample-2', student_name: 'Priya Sharma', created_at: '2024-01-10' },
  ];
  const displayReports = reports.length > 0 ? reports : sampleReports;
  const sampleStudents = [
    { id: 's1', name: 'Rahul Kumar', class: '10', board: 'CBSE', state: 'Karnataka', city: 'Bangalore', marks_percentage: 85, career_interests: ['Engineering'], created_at: new Date().toISOString() },
    { id: 's2', name: 'Priya Sharma', class: '12', board: 'ICSE', state: 'Maharashtra', city: 'Mumbai', marks_percentage: 92, career_interests: ['Medicine'], created_at: new Date().toISOString() },
  ];
  const displayStudents = students.length > 0 ? students : sampleStudents;

  const parentQuickActions = [
    { name: 'Add Student', href: '/students/new', icon: Plus, color: 'bg-blue-600' },
    { name: 'View Colleges', href: '/colleges', icon: GraduationCap, color: 'bg-green-600' },
    { name: 'Find Scholarships', href: '/scholarships', icon: Award, color: 'bg-yellow-600' },
    { name: 'Exam Planner', href: '/exams', icon: Calendar, color: 'bg-blue-500' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0] || 'Parent'}!
            </h1>
            <p className="text-gray-500 mt-1">Here's your career planning overview</p>
          </div>
          <Link to="/students/new" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25">
            <Plus className="w-5 h-5" /> Add Student
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Students', value: displayStudents.length, icon: Users, color: 'blue', trend: '+2 this month' },
            { label: 'Reports Generated', value: displayReports.length, icon: FileText, color: 'green', trend: '1 pending' },
            { label: 'Saved Colleges', value: 8, icon: GraduationCap, color: 'purple', trend: '4 new matches' },
            { label: 'Exams Tracked', value: savedExams.length || 3, icon: Calendar, color: 'orange', trend: '2 upcoming' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <span className="text-xs text-gray-500">{stat.trend}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {parentQuickActions.map((action) => (
            <Link key={action.name} to={action.href} className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <p className="font-medium text-gray-900">{action.name}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Your Students</h2>
                <Link to="/students" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : displayStudents.slice(0, 3).map((student) => (
                  <Link key={student.id} to={`/students/${student.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">Class {student.class} - {student.board}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{student.marks_percentage}%</p>
                      <p className="text-xs text-gray-500">Marks</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Reports</h2>
                <Link to="/reports" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
              </div>
              <div>
                {displayReports.slice(0, 4).map((report) => (
                  <Link key={report.id} to={`/reports/${report.id}`} className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-green-600" /></div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{report.student_name}</p>
                        <p className="text-xs text-gray-500">{new Date(report.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recommended Colleges</h2>
            <Link to="/colleges" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">View All Colleges <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topColleges.map((college) => (
              <Link key={college.id} to={`/colleges?college=${college.id}`} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><GraduationCap className="w-5 h-5 text-blue-600" /></div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${college.type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{college.type === 'government' ? 'Govt' : 'Private'}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{college.name}</h3>
                <p className="text-sm text-gray-500">{college.city}, {college.state}</p>
                <p className="text-sm text-blue-600 mt-2">{college.average_package}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Upcoming Exams</h2>
              <Link to="/exams" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Calendar className="w-5 h-5 text-purple-600" /></div>
                      <div>
                        <p className="font-medium text-gray-900">{exam.name}</p>
                        <p className="text-sm text-gray-500">{exam.career_stream}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{exam.exam_date}</p>
                      <p className="text-xs text-gray-500">Exam Date</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recommended Scholarships</h2>
              <Link to="/scholarships" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recommendedScholarships.map((scholarship) => (
                <a key={scholarship.id} href={scholarship.website} target="_blank" rel="noopener noreferrer" className="block p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-yellow-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{scholarship.name}</p>
                      <p className="text-sm text-gray-500">{scholarship.amount}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
