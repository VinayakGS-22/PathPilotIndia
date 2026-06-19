import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, CheckCircle, Mail, AlertTriangle } from 'lucide-react';
import Layout from '../../components/layout/Layout';

export default function DataDeletionPage() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-[#0F172A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Data Deletion Request</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Request the deletion of your personal data from PathPilot India. We will process your request within 30 days.
          </p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm mb-1">Before you proceed</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Deleting your data is permanent and irreversible. All your reports, saved exams, career plans, and account information will be permanently deleted. You will need to create a new account if you wish to use PathPilot India again.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">What gets deleted</h2>
            <p className="text-gray-500 text-sm mb-5">When we process your deletion request, the following data will be permanently removed:</p>
            <ul className="space-y-2.5">
              {[
                'Your account profile (name, email, education details)',
                'All generated career reports and recommendations',
                'Saved colleges, scholarships, and exam plans',
                'Mock test history and scores',
                'Parent-child links (from both ends)',
                'Subscription history and payment records (after legal retention period)',
                'Analytics events linked to your account',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <Trash2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              Note: Transaction records may be retained for up to 7 years as required by Indian tax laws. These records will be anonymized where possible.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Faster option: Delete from Settings</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              If you have access to your account, you can delete it immediately from the Settings page. This is faster than submitting a manual request.
            </p>
            <Link
              to="/settings"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Go to Settings
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manual Deletion Request</h2>
            <p className="text-gray-500 text-sm mb-6">Use this form if you can't access your account or prefer to submit a formal request.</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Request Received</h3>
                <p className="text-gray-600 text-sm max-w-sm mx-auto">
                  We've received your data deletion request. You'll receive a confirmation email within 24 hours, and your data will be deleted within 30 days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Reason (optional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                    placeholder="Help us improve by sharing why you're leaving..."
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" required id="confirm-delete" className="w-4 h-4 mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <label htmlFor="confirm-delete" className="text-sm text-gray-600">
                    I understand that this action is permanent and irreversible. All my data will be deleted.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Submit Deletion Request
                </button>
              </form>
            )}
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-500 mb-2">Questions? Contact our privacy team</p>
            <a href="mailto:privacy@pathpilotindia.com" className="text-blue-600 hover:text-blue-700 font-medium">privacy@pathpilotindia.com</a>
            <div className="mt-4 flex justify-center gap-5">
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
              <Link to="/security" className="text-blue-600 hover:text-blue-700">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
