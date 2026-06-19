import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Server, AlertTriangle, Mail } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const sections = [
  {
    icon: Lock,
    title: 'Data Encryption',
    content: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3. Data stored in our database is encrypted at rest using AES-256. Passwords are hashed using bcrypt with a salt factor of 12 — we never store plaintext passwords.',
  },
  {
    icon: Shield,
    title: 'Authentication & Access Control',
    content: 'We use Supabase Auth for secure session management with JWT tokens. Role-based access control (RBAC) ensures students, parents, and admins can only access data relevant to their role. All API endpoints enforce Row-Level Security (RLS) at the database layer.',
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    content: 'We collect only the data necessary to provide our service. We do not store Aadhaar numbers or any government identity documents. Parents can only view data for students they are explicitly linked to. All profile data can be exported or deleted at any time.',
  },
  {
    icon: Server,
    title: 'Infrastructure Security',
    content: 'PathPilot India is hosted on Supabase\'s cloud infrastructure in compliance with Indian data localization requirements. We use automated security scanning, regular dependency updates, and penetration testing. Our infrastructure is protected by enterprise-grade firewalls and DDoS mitigation.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    content: 'In the event of a security breach, we will notify affected users within 72 hours as required by applicable data protection laws. We maintain an incident response plan and conduct quarterly security reviews. All security events are logged and monitored.',
  },
  {
    icon: Mail,
    title: 'Responsible Disclosure',
    content: 'If you discover a security vulnerability, please report it to security@pathpilotindia.com. We take all reports seriously and will acknowledge receipt within 24 hours. We ask that you do not publicly disclose the issue until we have had a chance to address it.',
  },
];

export default function SecurityPage() {
  return (
    <Layout>
      <div className="bg-[#0F172A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Security at PathPilot India</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We take the security of your family's data seriously. Here's how we protect the information you trust us with.
          </p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {sections.map(({ icon: Icon, title, content }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Security Commitments</h2>
            <ul className="space-y-3">
              {[
                'No Aadhaar numbers or government IDs are stored on our platform',
                'Parent accounts can only access data for linked children (with student approval)',
                'All admin actions are logged in our audit trail',
                'User data is never sold to third parties',
                'You can request full data export or deletion at any time',
                'We comply with India\'s Information Technology Act, 2000 and IT (Amendment) Act, 2008',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-emerald-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Questions about security?{' '}
              <a href="mailto:security@pathpilotindia.com" className="text-blue-600 hover:text-blue-700 font-medium">
                security@pathpilotindia.com
              </a>
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
              <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
              <Link to="/data-deletion" className="text-blue-600 hover:text-blue-700">Data Deletion</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
