import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { INDIAN_STATES, SUBJECTS, CAREER_INTERESTS } from '../lib/constants';

export default function NewStudentPage() {
  const navigate = useNavigate();
  const { addStudent } = useData();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [form, setForm] = useState({
    name: '', class: '' as '8' | '9' | '10' | '11' | '12', board: '' as 'CBSE' | 'ICSE' | 'State Board',
    state: '', city: '', marks_percentage: '', favorite_subjects: [] as string[], weak_subjects: [] as string[],
    career_interests: [] as string[], hobbies: [] as string[], budget: '' as 'below_5' | '5_10' | '10_20' | 'above_20',
    preferred_state: '', willing_to_relocate: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateForm = (updates: Partial<typeof form>) => { setForm(prev => ({ ...prev, ...updates })); setErrors({}); };
  const toggleArrayValue = (field: 'favorite_subjects' | 'weak_subjects' | 'career_interests' | 'hobbies', value: string) => {
    setForm(prev => ({ ...prev, [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value] }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = 'Name is required';
      if (!form.class) newErrors.class = 'Class is required';
      if (!form.board) newErrors.board = 'Board is required';
      if (!form.state) newErrors.state = 'State is required';
      if (!form.city.trim()) newErrors.city = 'City is required';
    }
    if (step === 2) {
      if (!form.marks_percentage) newErrors.marks_percentage = 'Marks percentage is required';
      else if (Number(form.marks_percentage) < 0 || Number(form.marks_percentage) > 100) newErrors.marks_percentage = 'Enter a valid percentage (0-100)';
      if (form.favorite_subjects.length === 0) newErrors.favorite_subjects = 'Select at least one favorite subject';
    }
    if (step === 3) {
      if (form.career_interests.length === 0) newErrors.career_interests = 'Select at least one career interest';
      if (!form.budget) newErrors.budget = 'Select a budget range';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep()) { if (step < totalSteps) setStep(step + 1); else handleSubmit(); } };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const student = await addStudent({
        user_id: user?.id || '',
        name: form.name,
        class: form.class,
        board: form.board,
        state: form.state,
        city: form.city,
        marks_percentage: Number(form.marks_percentage),
        favorite_subjects: form.favorite_subjects,
        weak_subjects: form.weak_subjects,
        career_interests: form.career_interests,
        hobbies: form.hobbies,
        budget: form.budget,
        preferred_state: form.preferred_state || form.state,
        willing_to_relocate: form.willing_to_relocate
      });
      showToast('Student profile created successfully!', 'success');
      navigate(`/students/${student.id}`);
    } catch (error) {
      showToast('Failed to create student profile', 'error');
    } finally { setLoading(false); }
  };

  const budgetOptions = [
    { value: 'below_5', label: 'Below Rs.5 lakh' },
    { value: '5_10', label: 'Rs.5-10 lakh' },
    { value: '10_20', label: 'Rs.10-20 lakh' },
    { value: 'above_20', label: 'Rs.20 lakh+' }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/students')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />{step > 1 ? 'Previous Step' : 'Back to Students'}
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${s <= step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{s < step ? <Check className="w-5 h-5" /> : s}</div>
                {s < 3 && (<div className={`hidden sm:block w-24 h-1 mx-2 rounded ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />)}
              </div>
            ))}
          </div>
          <div className="flex text-sm text-gray-500">
            <span className="w-1/3 text-center">Basic Info</span>
            <span className="w-1/3 text-center">Academic Profile</span>
            <span className="w-1/3 text-center">Preferences</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name <span className="text-red-500">*</span></label>
                <input type="text" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.name ? 'border-red-300' : 'border-gray-200'}`} placeholder="Enter student's full name" />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class <span className="text-red-500">*</span></label>
                  <select value={form.class} onChange={(e) => updateForm({ class: e.target.value as typeof form.class })} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.class ? 'border-red-300' : 'border-gray-200'}`}>
                    <option value="">Select Class</option>
                    {['8', '9', '10', '11', '12'].map(c => (<option key={c} value={c}>Class {c}</option>))}
                  </select>
                  {errors.class && <p className="mt-1 text-sm text-red-500">{errors.class}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Board <span className="text-red-500">*</span></label>
                  <select value={form.board} onChange={(e) => updateForm({ board: e.target.value as typeof form.board })} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.board ? 'border-red-300' : 'border-gray-200'}`}>
                    <option value="">Select Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                  {errors.board && <p className="mt-1 text-sm text-red-500">{errors.board}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State <span className="text-red-500">*</span></label>
                  <select value={form.state} onChange={(e) => updateForm({ state: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.state ? 'border-red-300' : 'border-gray-200'}`}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => (<option key={s} value={s}>{s}</option>))}
                  </select>
                  {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                  <input type="text" value={form.city} onChange={(e) => updateForm({ city: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.city ? 'border-red-300' : 'border-gray-200'}`} placeholder="Enter city" />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Academic Profile</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marks Percentage <span className="text-red-500">*</span></label>
                <input type="number" min={0} max={100} value={form.marks_percentage} onChange={(e) => updateForm({ marks_percentage: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.marks_percentage ? 'border-red-300' : 'border-gray-200'}`} placeholder="Enter percentage (e.g., 85)" />
                {errors.marks_percentage && <p className="mt-1 text-sm text-red-500">{errors.marks_percentage}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Subjects <span className="text-red-500">*</span></label>
                <p className="text-sm text-gray-500 mb-3">Select at least one</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECTS.map(subject => (
                    <button key={subject} type="button" onClick={() => toggleArrayValue('favorite_subjects', subject)} className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.favorite_subjects.includes(subject) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{subject}</button>
                  ))}
                </div>
                {errors.favorite_subjects && <p className="mt-2 text-sm text-red-500">{errors.favorite_subjects}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weak Subjects (Optional)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECTS.map(subject => (
                    <button key={subject} type="button" onClick={() => toggleArrayValue('weak_subjects', subject)} className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.weak_subjects.includes(subject) ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{subject}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Career Preferences</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Career Interests <span className="text-red-500">*</span></label>
                <p className="text-sm text-gray-500 mb-3">Select at least one</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CAREER_INTERESTS.map(interest => (
                    <button key={interest} type="button" onClick={() => toggleArrayValue('career_interests', interest)} className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.career_interests.includes(interest) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{interest}</button>
                  ))}
                </div>
                {errors.career_interests && <p className="mt-2 text-sm text-red-500">{errors.career_interests}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range <span className="text-red-500">*</span></label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {budgetOptions.map(option => (
                    <button key={option.value} type="button" onClick={() => updateForm({ budget: option.value as typeof form.budget })} className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${form.budget === option.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{option.label}</button>
                  ))}
                </div>
                {errors.budget && <p className="mt-2 text-sm text-red-500">{errors.budget}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred State (Optional)</label>
                  <select value={form.preferred_state} onChange={(e) => updateForm({ preferred_state: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option value="">Same as current state</option>
                    {INDIAN_STATES.map(s => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Willing to Relocate?</label>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => updateForm({ willing_to_relocate: true })} className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${form.willing_to_relocate ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}>Yes</button>
                    <button type="button" onClick={() => updateForm({ willing_to_relocate: false })} className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${!form.willing_to_relocate ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}>No</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/students')} className="px-6 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors">{step > 1 ? 'Previous' : 'Cancel'}</button>
            <button onClick={handleNext} disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25">
              {loading ? 'Creating...' : step === totalSteps ? 'Create Profile' : (<><span>Next Step</span><ChevronRight className="w-5 h-5" /></>)}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
