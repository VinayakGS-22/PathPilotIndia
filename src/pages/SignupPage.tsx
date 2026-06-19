import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, Mail, Lock, User, GraduationCap,
  AlertCircle, CheckCircle, Briefcase,
} from 'lucide-react';
import { useAuth, ALLOWED_DOMAINS } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { EDUCATION_STAGES } from '../lib/constants';
import Layout from '../components/layout/Layout';
import { EducationStage } from '../types';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'student'>('student');
  const [educationStage, setEducationStage] = useState<EducationStage | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateEmailDomain = (value: string): string => {
    const domain = value.split('@')[1]?.toLowerCase();
    if (!domain) return '';
    if (!ALLOWED_DOMAINS.includes(domain)) {
      return 'Please sign up using a Gmail or Yahoo email address.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const domainError = validateEmailDomain(email);
    if (domainError) { setError(domainError); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (!educationStage) { setError('Please select your education stage'); return; }

    setLoading(true);
    const { error: signUpError } = await signUp(
      email, password, name, role, educationStage || undefined
    );
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
              <p className="text-gray-500 mt-1 text-sm">Gmail or Yahoo email required</p>
            </div>

            {!isSupabaseConfigured && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">
                  Demo mode: Try student@demo.com / parent@demo.com (password: demo123)
                </p>
              </div>
            )}

            {error && (
              <div className="mb-5 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="Your full name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['student', 'parent'] as const).map(r => (
                    <button key={r} type="button" onClick={() => setRole(r)}
                      className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-center gap-2 text-sm font-medium ${
                        role === r ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                      {role === r && <CheckCircle className="w-4 h-4" />}
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  {role === 'parent' ? 'Planning for' : 'Current stage'}
                </label>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {EDUCATION_STAGES.map(stage => (
                    <button key={stage.value} type="button" onClick={() => setEducationStage(stage.value)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        educationStage === stage.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{stage.label}</p>
                          <p className="text-xs text-gray-500">{stage.description}</p>
                        </div>
                        {educationStage === stage.value && <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-gray-400 font-normal text-xs">(Gmail or Yahoo only)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="email" type="email" value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    onBlur={() => { const err = validateEmailDomain(email); if (err) setError(err); }}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="you@gmail.com or you@yahoo.com" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="password" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} required minLength={6}
                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="At least 6 characters" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="confirmPassword" type={showPassword ? 'text' : 'password'} value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="Repeat your password" />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" required className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/25 text-sm">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
