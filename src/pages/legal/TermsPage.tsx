import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Layout from '../../components/layout/Layout';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <Layout>
      <div className="bg-[#0F172A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: June 12, 2026</p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">

            <Section title="1. Acceptance of Terms">
              <p>By accessing or using PathPilot India ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
            </Section>

            <Section title="2. Description of Service">
              <p>PathPilot India provides an educational career guidance platform for Indian students and parents, including career roadmaps, college search, scholarship discovery, entrance exam planning, and personalized reports.</p>
              <p>We provide this information for educational guidance purposes. Career recommendations are suggestions, not guarantees of admission or employment outcomes.</p>
            </Section>

            <Section title="3. User Accounts">
              <p>You must provide accurate, complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately at support@pathpilotindia.com if you suspect unauthorized access.</p>
              <p>One person may not maintain multiple active accounts. Accounts are non-transferable.</p>
            </Section>

            <Section title="4. Parent-Child Accounts">
              <p>Parents may link to student accounts only with the student's explicit approval. Parents may view only the information of their approved linked children. Misrepresenting your relationship to a student is a violation of these terms and may result in account suspension.</p>
            </Section>

            <Section title="5. Subscriptions and Payments">
              <p>Free accounts have limited access to features. Paid subscriptions unlock additional features as described on the Pricing page. Subscriptions are billed in Indian Rupees (INR) through Razorpay.</p>
              <p>Subscription fees are non-refundable except as described in our Refund Policy. We reserve the right to change subscription prices with 30 days' notice.</p>
            </Section>

            <Section title="6. Acceptable Use">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Use the platform for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Share your account credentials with others</li>
                <li>Scrape, copy, or redistribute our content without permission</li>
                <li>Upload malicious code or disrupt service operation</li>
                <li>Provide false information about your identity or relationships</li>
              </ul>
            </Section>

            <Section title="7. Intellectual Property">
              <p>All content on PathPilot India, including career roadmaps, college data, exam information, and reports, is owned by or licensed to PathPilot India. You may not reproduce, distribute, or create derivative works without our written permission.</p>
              <p>You retain ownership of data you provide to us (your profile, preferences). You grant us a license to use this data to provide and improve the Service.</p>
            </Section>

            <Section title="8. Disclaimers">
              <p>PathPilot India provides career guidance for informational purposes only. We do not guarantee admission to any college or selection in any examination. College fee information, scholarship availability, and exam dates are subject to change by respective institutions.</p>
              <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>PathPilot India shall not be liable for indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.</p>
            </Section>

            <Section title="10. Termination">
              <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from the Settings page or by contacting support.</p>
            </Section>

            <Section title="11. Governing Law">
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka, India.</p>
            </Section>

            <Section title="12. Contact">
              <p><strong>Email:</strong> <a href="mailto:legal@pathpilotindia.com" className="text-blue-600 hover:underline">legal@pathpilotindia.com</a></p>
              <p><strong>Address:</strong> PathPilot India, Bangalore, Karnataka, India - 560001</p>
            </Section>

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
              <Link to="/refund-policy" className="text-blue-600 hover:text-blue-700">Refund Policy</Link>
              <Link to="/security" className="text-blue-600 hover:text-blue-700">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
