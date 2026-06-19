import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, GraduationCap, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import Layout from '../components/layout/Layout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: resetError } = await resetPassword(email);
    if (resetError) { setError(resetError.message); setLoading(false); }
    else { setSuccess(true); setLoading(false); }
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
              <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
              <p className="text-gray-500 mt-2">We'll send you a link to reset your password</p>
            </div>
            {!isSupabaseConfigured && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-700">Password reset requires Supabase configuration. This is a demo mode.</p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
                <p className="text-gray-600 mb-6">We've sent a password reset link to <strong>{email}</strong></p>
                <Link to="/login" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"><ArrowLeft className="w-4 h-4" />Back to login</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="you@example.com" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/25">{loading ? 'Sending...' : 'Send Reset Link'}</button>
              </form>
            )}
            <p className="mt-6 text-center text-sm text-gray-500">Remember your password? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
