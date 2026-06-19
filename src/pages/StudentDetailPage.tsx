import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, MapPin, Award, Calendar, FileText, ChevronRight, TrendingUp, Target, Briefcase, BookOpen, Building, Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { CAREERS, COLLEGES, SCHOLARSHIPS, ENTRANCE_EXAMS } from '../lib/constants';
import { Student, Career, College, Scholarship, EntranceExam } from '../types';

const sampleStudent: Student = {
  id: 'sample', user_id: 'demo', name: 'Rahul Kumar', class: '10', board: 'CBSE', state: 'Karnataka', city: 'Bangalore',
  marks_percentage: 85, favorite_subjects: ['Mathematics', 'Physics', 'Computer Science'], weak_subjects: ['English'],
  career_interests: ['Engineering', 'Technology', 'Design'], hobbies: [],
  budget: '10_20', preferred_state: 'Karnataka', willing_to_relocate: true, created_at: new Date().toISOString()
};

function generateCareerRecommendations(student: Student): Career[] {
  const interests = student.career_interests.map(i => i.toLowerCase());
  const subjects = student.favorite_subjects.map(s => s.toLowerCase());
  return CAREERS.filter(career => {
    const careerName = career.name.toLowerCase();
    const matchesInterest = interests.some(i => careerName.includes(i) || i.split(' ')[0] === careerName.split(' ')[0]);
    const matchesSubject = career.required_subjects.some(s => subjects.includes(s.toLowerCase()));
    return matchesInterest || matchesSubject;
  }).slice(0, 5);
}

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudent, addReport, students } = useData();
  const { showToast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'careers' | 'colleges' | 'scholarships' | 'exams'>('careers');
  const [careers, setCareers] = useState<Career[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [exams, setExams] = useState<EntranceExam[]>([]);

  useEffect(() => {
    const found = getStudent(id || '');
    if (found) setStudent(found);
    else if (id) setStudent({ ...sampleStudent, id });
    setLoading(false);
  }, [id, getStudent]);

  useEffect(() => {
    if (student) {
      const careerRecs = generateCareerRecommendations(student);
      if (careerRecs.length === 0) careerRecs.push(...CAREERS.slice(0, 5));
      setCareers(careerRecs);
      const examsSet = new Set<string>();
      careerRecs.forEach(c => c.entrance_exams.forEach(e => examsSet.add(e)));
      const filteredColleges = COLLEGES.filter(college => college.accepted_exams.some(e => examsSet.has(e)) || student.willing_to_relocate || college.state === student.state).slice(0, 15);
      setColleges(filteredColleges.length > 0 ? filteredColleges : COLLEGES.slice(0, 10));
      setScholarships(SCHOLARSHIPS.slice(0, 10));
      setExams(ENTRANCE_EXAMS.filter(e => careerRecs.some(c => c.entrance_exams.includes(e.name))).slice(0, 5));
    }
  }, [student]);

  const handleGenerateReport = async () => {
    if (!student) return;
    setGeneratingReport(true);
    try {
      const report = await addReport({
        user_id: student.user_id, student_id: student.id, student_name: student.name,
        top_careers: careers, recommended_colleges: colleges, scholarships: scholarships,
        exams: exams, roadmap: careers[0]?.roadmap || []
      });
      showToast('Report generated successfully!', 'success');
      navigate(`/reports/${report.id}`);
    } catch (error) { showToast('Failed to generate report', 'error'); }
    finally { setGeneratingReport(false); }
  };

  if (loading) return (<DashboardLayout><div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div></DashboardLayout>);
  if (!student) return (<DashboardLayout><div className="text-center py-12"><h2 className="text-xl font-semibold text-gray-900">Student not found</h2><Link to="/students" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">Back to Students</Link></div></DashboardLayout>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/students')} className="p-2 rounded-lg hover:bg-gray-100"><ArrowLeft className="w-5 h-5" /></button>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-xl">{student.name.charAt(0)}</span></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" />Class {student.class} - {student.board}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{student.city}, {student.state}</span>
              </div>
            </div>
          </div>
          <button onClick={handleGenerateReport} disabled={generatingReport} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50">
            <FileText className="w-5 h-5" />{generatingReport ? 'Generating...' : 'Generate Report'}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Marks Percentage', value: `${student.marks_percentage}%`, icon: Target, color: 'blue' },
            { label: 'Top Career Match', value: careers[0]?.name || 'Analyzing...', icon: Award, color: 'green' },
            { label: 'College Matches', value: colleges.length, icon: Building, color: 'purple' },
            { label: 'Career Paths', value: careers.length, icon: TrendingUp, color: 'orange' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'careers', label: 'Career Paths', icon: Briefcase },
                  { id: 'colleges', label: 'Colleges', icon: Building },
                  { id: 'scholarships', label: 'Scholarships', icon: Award },
                  { id: 'exams', label: 'Exams', icon: Calendar }
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                    <tab.icon className="w-4 h-4" />{tab.label}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeTab === 'careers' && (
                  <div className="space-y-4">
                    {careers.map((career, index) => (
                      <div key={career.id} className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-xs text-gray-500">#{index + 1} Recommendation</span>
                            <h3 className="text-lg font-semibold text-gray-900">{career.name}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{careers[0]?.future_demand_score || 90}%</p>
                            <p className="text-xs text-gray-500">Future Demand</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{career.description}</p>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div><span className="text-gray-500">Salary Range:</span><span className="font-medium text-gray-900 ml-2">{career.salary_range}</span></div>
                          <div><span className="text-gray-500">Risk Level:</span><span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${career.risk_level === 'Low' ? 'bg-green-100 text-green-700' : career.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{career.risk_level}</span></div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Required Subjects:</p>
                          <div className="flex flex-wrap gap-2">
                            {career.required_subjects.map(subject => (<span key={subject} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">{subject}</span>))}
                          </div>
                        </div>
                        <Link to={`/roadmap?career=${career.id}`} className="mt-4 inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700">View Full Roadmap <ChevronRight className="w-4 h-4" /></Link>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'colleges' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {colleges.length === 0 ? (
                      <p className="col-span-2 text-center text-gray-500 py-8">No colleges found.</p>
                    ) : colleges.slice(0, 10).map(college => (
                      <Link key={college.id} to={`/colleges?college=${college.id}`} className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{college.name}</h4>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${college.type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{college.type}</span>
                        </div>
                        <p className="text-sm text-gray-500">{college.city}, {college.state}</p>
                        <p className="text-sm text-blue-600 mt-2">{college.average_package}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {activeTab === 'scholarships' && (
                  <div className="space-y-3">
                    {scholarships.slice(0, 8).map(scholarship => (
                      <a key={scholarship.id} href={scholarship.website} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{scholarship.name}</h4>
                            <p className="text-sm text-gray-500">{scholarship.eligibility}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">{scholarship.amount}</p>
                            <p className="text-xs text-gray-500">Deadline: {scholarship.deadline}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
                {activeTab === 'exams' && (
                  <div className="space-y-3">
                    {exams.map((exam: EntranceExam) => (
                      <div key={exam.id} className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exam.name}</h4>
                            <p className="text-sm text-gray-500">{exam.career_stream}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">{exam.exam_date}</p>
                            <a href={exam.website} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600">Official Website</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Profile Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Favorite Subjects</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {student.favorite_subjects.map(s => (<span key={s} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">{s}</span>))}
                  </div>
                </div>
                {student.weak_subjects.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Areas to Improve</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {student.weak_subjects.map(s => (<span key={s} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">{s}</span>))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Career Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {student.career_interests.map(i => (<span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">{i}</span>))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium text-gray-900">
                    {student.budget === 'below_5' && 'Below Rs.5 lakh'}
                    {student.budget === '5_10' && 'Rs.5-10 lakh'}
                    {student.budget === '10_20' && 'Rs.10-20 lakh'}
                    {student.budget === 'above_20' && 'Rs.20 lakh+'}
                  </p>
                </div>
              </div>
              <Link to={`/students/${student.id}?edit=true`} className="mt-4 block w-full text-center py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors">Edit Profile</Link>
            </div>

            {careers[0] && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Career Roadmap Preview</h3>
                <p className="text-sm text-gray-500 mb-4">For {careers[0].name}</p>
                <div className="space-y-3">
                  {careers[0].roadmap.slice(0, 3).map((phase, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-blue-600 font-medium text-sm">{i + 1}</span></div>
                      <div>
                        <p className="font-medium text-gray-900">{phase.class}</p>
                        <p className="text-sm text-gray-500">{phase.actions[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to={`/roadmap?career=${careers[0].id}`} className="mt-4 block w-full text-center py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">View Full Roadmap</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
