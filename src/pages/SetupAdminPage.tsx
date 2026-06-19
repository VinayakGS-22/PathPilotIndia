import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function SetupAdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminExists, setAdminExists] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const check = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin')
          .limit(1);
        if (data && data.length > 0) {
          setAdminExists(true);
        }
      }
      setChecking(false);
    };
    check();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

        if (signUpError) throw new Error(signUpError.message);
        if (!data.user) throw new Error('No user created.');

        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          full_name: name,
          role: 'admin',
          approval_status: 'approved',
          email_verified: true,
          onboarding_completed: true,
          notifications_enabled: true,
        });

        if (profileError) throw new Error(profileError.message);

        setDone(true);
        showToast('Admin account created successfully!', 'success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Supabase is not configured. Admin setup requires a database connection.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <Layout hideFooter>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      </Layout>
    );
  }

  if (adminExists) {
    return (
      <Layout hideFooter>
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-[#F8FAFC]">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
            <Shield className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Already Exists</h1>
            <p className="text-gray-500 mb-6 text-sm">
              An admin account has already been created. This setup page is only available for
              the initial admin creation.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (done) {
    return (
      <Layout hideFooter>
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-[#F8FAFC]">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
            <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Created!</h1>
            <p className="text-gray-500 text-sm">Redirecting to login...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-[#F8FAFC]">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Setup</h1>
              <p className="text-gray-500 text-sm mt-1">Create the first administrator account</p>
            </div>

            {error && (
              <div className="mb-5 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)} required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Admin full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password} onChange={e => setPassword(e.target.value)}
                    required minLength={8}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="At least 8 characters"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-all disabled:opacity-50 text-sm mt-2"
              >
                {loading ? 'Creating admin...' : 'Create Admin Account'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              This page is only accessible before any admin account exists.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
