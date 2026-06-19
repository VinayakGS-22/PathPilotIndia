import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Youtube, Shield, Lock, Globe, Award } from 'lucide-react';

const trustBadges = [
  { icon: Shield, label: 'India-Wide Guidance' },
  { icon: Lock, label: 'Privacy First' },
  { icon: Award, label: 'Verified Sources' },
  { icon: Globe, label: 'Official Data' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PathPilot<span className="text-blue-400">India</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Empowering Indian students and parents with personalized career roadmaps, college matching, and scholarship discovery.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/6 rounded-lg flex items-center justify-center hover:bg-blue-600/80 hover:text-white transition-all border border-white/8 text-gray-500">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: 'Career Roadmaps', href: '/roadmap' },
                { label: 'College Search', href: '/colleges' },
                { label: 'Scholarships', href: '/scholarships' },
                { label: 'Exam Planner', href: '/exams' },
                { label: 'Mock Tests', href: '/mock-tests' },
                { label: 'Sample Reports', href: '/sample-report' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-gray-500 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Refund Policy', href: '/refund-policy' },
                { label: 'Data Deletion', href: '/data-deletion' },
                { label: 'Security', href: '/security' },
                { label: 'Pricing', href: '/pricing' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-gray-500 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-500">support@pathpilotindia.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-500">+91 80 4567 8900</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-500">Bangalore, Karnataka, India</span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 rounded-lg border border-white/8">
                  <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} PathPilot India. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Refund Policy', href: '/refund-policy' },
              { label: 'Security', href: '/security' },
            ].map((item) => (
              <Link key={item.label} to={item.href} className="text-sm text-gray-600 hover:text-gray-400 transition-colors">{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
