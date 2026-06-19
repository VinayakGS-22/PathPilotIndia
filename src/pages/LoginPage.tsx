import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, GraduationCap, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import Layout from '../components/layout/Layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingRedirect, setPendingRedirect] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const didNavigate = useRef(false);

  // For Supabase mode: user updates asynchronously via onAuthStateChange
  useEffect(() => {
    if (pendingRedirect && user && !didNavigate.current) {
      didNavigate.current = true;
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, pendingRedirect, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    didNavigate.current = false;
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      // Demo/localStorage mode: user is set synchronously, navigate immediately
      // Supabase mode: user arrives via onAuthStateChange, useEffect handles it
      if (!isSupabaseConfigured) {
        // user is already set in context synchronously for demo mode
        setPendingRedirect(true);
      } else {
        setPendingRedirect(true);
      }
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 mt-2">Sign in to your PathPilot account</p>
            </div>
            {!isSupabaseConfigured && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">Demo mode: Enter any email and password to sign in. Your data will be stored locally.</p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</Link>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/25">{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">Sign up for free</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
