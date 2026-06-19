import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, GraduationCap, MapPin, Award, MoreVertical } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';

const sampleStudents = [
  { id: 'sample-1', name: 'Rahul Kumar', class: '10', board: 'CBSE', state: 'Karnataka', city: 'Bangalore', marks_percentage: 85, career_interests: ['Engineering', 'Technology'], created_at: '2024-01-15' },
  { id: 'sample-2', name: 'Priya Sharma', class: '12', board: 'ICSE', state: 'Maharashtra', city: 'Mumbai', marks_percentage: 92, career_interests: ['Medicine'], created_at: '2024-01-10' },
  { id: 'sample-3', name: 'Arjun Patel', class: '11', board: 'CBSE', state: 'Gujarat', city: 'Ahmedabad', marks_percentage: 78, career_interests: ['Business'], created_at: '2024-01-08' }
];

export default function StudentsPage() {
  const { students, loading, deleteStudent } = useData();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const displayStudents = students.length > 0 ? students : sampleStudents;
  const filteredStudents = displayStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this student profile?')) {
      await deleteStudent(id);
      showToast('Student profile deleted', 'success');
    }
  };
  const classes = ['8', '9', '10', '11', '12'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-500 mt-1">Manage your child profiles and track their career journey</p>
          </div>
          <Link to="/students/new" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"><Plus className="w-5 h-5" />Add Student</Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search by name or city..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div className="relative">
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="pl-4 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[150px]">
              <option value="all">All Classes</option>
              {classes.map(c => (<option key={c} value={c}>Class {c}</option>))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div></div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No students found</p>
            <Link to="/students/new" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"><Plus className="w-4 h-4" />Add your first student</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-xl">{student.name.charAt(0)}</span></div>
                    <div className="relative">
                      <button onClick={() => setShowDropdown(showDropdown === student.id ? null : student.id)} className="p-2 rounded-lg hover:bg-gray-100"><MoreVertical className="w-5 h-5 text-gray-400" /></button>
                      {showDropdown === student.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <Link to={`/students/${student.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Profile</Link>
                          <Link to={`/students/${student.id}?edit=true`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</Link>
                          <button onClick={() => handleDelete(student.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{student.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3"><GraduationCap className="w-4 h-4" />Class {student.class} - {student.board}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4"><MapPin className="w-4 h-4" />{student.city}, {student.state}</div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{student.marks_percentage}%</p>
                      <p className="text-xs text-gray-500">Marks</p>
                    </div>
                    <div className="flex -space-x-2">
                      {student.career_interests?.slice(0, 3).map((interest, i) => (
                        <div key={i} className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white" title={interest}><Award className="w-4 h-4 text-blue-600" /></div>
                      ))}
                    </div>
                  </div>
                </div>
                <Link to={`/students/${student.id}`} className="block w-full text-center py-3 bg-gray-50 text-blue-600 font-medium hover:bg-blue-50 transition-colors">View Profile</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
