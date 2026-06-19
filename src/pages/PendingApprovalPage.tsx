import { Link } from 'react-router-dom';
import { Clock, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function PendingApprovalPage() {
  const { user } = useAuth();

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Under Review</h1>
          <p className="text-gray-600 mb-8">
            Thank you for signing up, {user?.name}! Your account is currently being reviewed by our team.
            You will receive an email notification once your account is approved.
          </p>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Our team will review your profile within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">You'll receive an email once approved</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">After approval, you can access all features</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
            >
              View Plans
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Have questions? Contact us at <a href="mailto:support@pathpilotindia.com" className="text-blue-600 hover:underline">support@pathpilotindia.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
