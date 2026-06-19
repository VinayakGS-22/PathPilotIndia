import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';
import Layout from '../components/layout/Layout';

export default function PaymentSuccessPage() {
  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-14 h-14 text-green-600" /></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase. Your account has been upgraded successfully.</p>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Plan</span><span className="font-medium text-gray-900">Premium Career Blueprint</span></div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Amount Paid</span><span className="font-medium text-gray-900">Rs.999</span></div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Transaction ID</span><span className="font-medium text-gray-900">TXN{Date.now().toString().slice(-8)}</span></div>
            <div className="flex items-center justify-between py-3"><span className="text-gray-600">Date</span><span className="font-medium text-gray-900">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25">Go to Dashboard <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/students/new" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-all border border-green-200"><FileText className="w-5 h-5" />Create First Report</Link>
          </div>
          <p className="mt-8 text-sm text-gray-500">A confirmation email has been sent to your registered email address.</p>
        </div>
      </div>
    </Layout>
  );
}
