import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resendVerification } = useAuth();
  const email = (location.state as { email?: string })?.email || '';
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await resendVerification(email);
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your inbox</h1>
            <p className="text-gray-500 text-sm mb-2">
              We sent a verification email to:
            </p>
            {email && (
              <p className="font-semibold text-gray-900 mb-6 break-all">{email}</p>
            )}

            <div className="bg-blue-50 rounded-xl p-4 mb-8 text-left space-y-2">
              <p className="text-sm text-blue-800 font-medium">Next steps:</p>
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Open the email and click the verification link</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>You&apos;ll be redirected to complete onboarding</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Check spam/junk if you don&apos;t see it</span>
              </div>
            </div>

            <button
              onClick={handleResend}
              disabled={resending || resent}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm mb-4"
            >
              <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
              {resent ? 'Email resent!' : resending ? 'Resending...' : 'Resend verification email'}
            </button>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
