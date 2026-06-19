import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';

export default function PaymentFailedPage() {
  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"><XCircle className="w-14 h-14 text-red-600" /></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-8">Unfortunately, your payment could not be processed. Please try again or contact support.</p>
          <div className="bg-white rounded-xl border border-red-100 shadow-sm p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Common Reasons:</h3>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li className="flex items-start gap-2"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-red-600">1</span><span>Insufficient balance in your account</span></li>
              <li className="flex items-start gap-2"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-red-600">2</span><span>Incorrect card details or UPI ID</span></li>
              <li className="flex items-start gap-2"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-red-600">3</span><span>Transaction declined by your bank</span></li>
              <li className="flex items-start gap-2"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-red-600">4</span><span>Network connectivity issues</span></li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"><RefreshCw className="w-5 h-5" />Try Again</Link>
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"><ArrowLeft className="w-5 h-5" />Back to Dashboard</Link>
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 text-blue-700 justify-center"><HelpCircle className="w-5 h-5" /><span className="text-sm">Need help? Contact us at support@pathpilotindia.com</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
