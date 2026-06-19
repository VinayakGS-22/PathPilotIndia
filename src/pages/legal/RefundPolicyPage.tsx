import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const eligibleRefunds = [
  'Duplicate payment: Charged twice for the same subscription',
  'Technical failure: Unable to access paid features for more than 48 hours due to our platform issues',
  'Billing error: Charged an incorrect amount',
  'Subscription not activated: Payment processed but plan not activated within 24 hours',
];

const ineligibleRefunds = [
  'Change of mind after accessing premium features',
  'Partial use of the subscription period',
  'Account suspension due to Terms of Service violations',
  'Requests made after 7 days of the transaction date',
  'Downgrade from a higher plan',
];

export default function RefundPolicyPage() {
  return (
    <Layout>
      <div className="bg-[#0F172A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Refund Policy</h1>
          <p className="text-white/60">Last updated: June 12, 2026</p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              At PathPilot India, we strive to provide maximum value. We offer refunds in specific circumstances described below. All refund requests must be submitted within 7 days of the transaction date.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <h2 className="text-xl font-bold text-gray-900">Eligible for Refund</h2>
            </div>
            <ul className="space-y-3">
              {eligibleRefunds.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <h2 className="text-xl font-bold text-gray-900">Not Eligible for Refund</h2>
            </div>
            <ul className="space-y-3">
              {ineligibleRefunds.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <h2 className="text-xl font-bold text-gray-900">Refund Process & Timeline</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600 text-xs">1</div>
                <p><strong>Submit Request:</strong> Email refunds@pathpilotindia.com with your registered email, transaction ID (from Razorpay), and reason for refund within 7 days of payment.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600 text-xs">2</div>
                <p><strong>Review:</strong> Our team will review your request within 2 business days and notify you of approval or rejection.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600 text-xs">3</div>
                <p><strong>Processing:</strong> Approved refunds are processed within 5-7 business days. The amount will be credited to your original payment method.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact for Refunds</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Email: <a href="mailto:refunds@pathpilotindia.com" className="text-blue-600 hover:underline">refunds@pathpilotindia.com</a><br />
              Include: Registered email, transaction ID, date of payment, and reason for refund request.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
              <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
