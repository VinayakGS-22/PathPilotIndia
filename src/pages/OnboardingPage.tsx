import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Target, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { CAREER_INTERESTS, EDUCATION_STAGES } from '../lib/constants';
import Layout from '../components/layout/Layout';
import { EducationStage } from '../types';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [planningFor, setPlanningFor] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, completeOnboarding } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const planningOptions = [
    { id: 'school', label: 'School (Class 8-12)', icon: '🏫' },
    { id: 'college', label: 'College after 12th', icon: '🎓' },
    { id: 'diploma', label: 'Diploma Course', icon: '📜' },
    { id: 'undergraduate', label: 'Undergraduate Career', icon: '💼' },
    { id: 'government', label: 'Government Exams', icon: '🏛️' },
    { id: 'professional', label: 'Professional Course', icon: '📊' },
    { id: 'skills', label: 'Skill-based Career', icon: '🔧' },
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : prev.length < 5
        ? [...prev, interest]
        : prev
    );
  };

  const handleComplete = async () => {
    if (!planningFor) {
      showToast('Please select what you are planning for', 'error');
      return;
    }

    setLoading(true);
    const educationStageMap: Record<string, EducationStage> = {
      'school': 'school_11_12',
      'college': 'school_11_12',
      'diploma': 'diploma',
      'undergraduate': 'undergraduate',
      'government': 'graduate',
      'professional': 'undergraduate',
      'skills': 'diploma'
    };

    const { error } = await completeOnboarding(
      educationStageMap[planningFor] || 'school_11_12',
      selectedInterests
    );

    if (error) {
      showToast('Failed to save preferences', 'error');
    } else {
      showToast('Welcome to PathPilot! Your preferences have been saved.', 'success');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to PathPilot!</h1>
            <p className="text-gray-500 mt-2">Let's personalize your experience</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>

          {/* Step 1: What are you planning for */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">What are you planning for?</h2>
              <p className="text-gray-500 mb-6">Select the option that best describes your goals</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {planningOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPlanningFor(option.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      planningFor === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mr-3">{option.icon}</span>
                    <span className="font-medium text-gray-900">{option.label}</span>
                    {planningFor === option.id && (
                      <Check className="w-5 h-5 text-blue-600 float-right mt-1" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (!planningFor) {
                    showToast('Please select an option', 'error');
                  } else {
                    setStep(2);
                  }
                }}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Career Interests */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">What career domains interest you?</h2>
              <p className="text-gray-500 mb-6">Select up to 5 domains (you can change this later)</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {CAREER_INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all ${
                      selectedInterests.includes(interest)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <Check className="w-4 h-4 inline-block ml-1" />
                    )}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Selected: {selectedInterests.length}/5 {selectedInterests.length > 0 && `(${selectedInterests.join(', ')})`}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Skip option */}
          <p className="text-center mt-6">
            <button
              onClick={handleComplete}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
}
