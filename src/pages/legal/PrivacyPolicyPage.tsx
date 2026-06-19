import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Layout from '../../components/layout/Layout';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="bg-[#0F172A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: June 12, 2026</p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">

            <Section title="1. Introduction">
              <p>PathPilot India ("we," "our," or "us") is committed to protecting the privacy of students, parents, and users of our platform. This Privacy Policy explains how we collect, use, and safeguard your information when you use PathPilot India at pathpilotindia.com.</p>
              <p>By using our platform, you agree to the collection and use of information in accordance with this policy.</p>
            </Section>

            <Section title="2. Information We Collect">
              <p><strong>Account Information:</strong> When you sign up, we collect your name, email address, and role (student or parent). We do not collect Aadhaar numbers, PAN numbers, or other government identity documents.</p>
              <p><strong>Profile Information:</strong> Educational details such as class level, education stage, city, state, interests, and career goals you voluntarily provide.</p>
              <p><strong>Usage Data:</strong> Pages visited, features used, and interactions with the platform to improve our service.</p>
              <p><strong>Payment Information:</strong> If you purchase a subscription, payment processing is handled by Razorpay. We do not store your card details.</p>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Provide personalized career roadmaps and college recommendations</li>
                <li>Match you with relevant scholarships and entrance exams</li>
                <li>Enable parent-child account linking (only with student's consent)</li>
                <li>Send important notifications about your account and services</li>
                <li>Improve our recommendation algorithms and platform features</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </Section>

            <Section title="4. Data Sharing">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Service Providers:</strong> Supabase (database hosting), Razorpay (payments) — under strict confidentiality agreements</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect the rights and safety of our users</li>
              </ul>
              <p>Parents can only access their linked children's data. Students must approve any parent-child link.</p>
            </Section>

            <Section title="5. Data Retention">
              <p>We retain your account data for as long as your account is active. If you delete your account, we will permanently delete your personal data within 30 days, except where retention is required by law.</p>
            </Section>

            <Section title="6. Your Rights">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Access all personal data we hold about you</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              <p>To exercise these rights, contact us at <a href="mailto:privacy@pathpilotindia.com" className="text-blue-600 hover:underline">privacy@pathpilotindia.com</a> or visit the <Link to="/data-deletion" className="text-blue-600 hover:underline">Data Deletion</Link> page.</p>
            </Section>

            <Section title="7. Cookies">
              <p>We use essential cookies for authentication and session management. We do not use third-party tracking cookies or advertising cookies. You can disable cookies in your browser settings, though this may affect platform functionality.</p>
            </Section>

            <Section title="8. Children's Privacy">
              <p>PathPilot India is designed for use by students aged 13 and above. For students under 18, we require parental consent via our parent-child linking system. We do not knowingly collect personal information from children under 13.</p>
            </Section>

            <Section title="9. Changes to This Policy">
              <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our platform. Your continued use after changes constitutes acceptance of the updated policy.</p>
            </Section>

            <Section title="10. Contact Us">
              <p>For privacy-related inquiries:</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@pathpilotindia.com" className="text-blue-600 hover:underline">privacy@pathpilotindia.com</a></p>
              <p><strong>Address:</strong> PathPilot India, Bangalore, Karnataka, India - 560001</p>
            </Section>

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
              <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
              <Link to="/refund-policy" className="text-blue-600 hover:text-blue-700">Refund Policy</Link>
              <Link to="/security" className="text-blue-600 hover:text-blue-700">Security</Link>
              <Link to="/data-deletion" className="text-blue-600 hover:text-blue-700">Data Deletion</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
