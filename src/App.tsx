import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

// Public pages
import LandingPage from './pages/LandingPage';
import SecurityPage from './pages/legal/SecurityPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsPage from './pages/legal/TermsPage';
import RefundPolicyPage from './pages/legal/RefundPolicyPage';
import DataDeletionPage from './pages/legal/DataDeletionPage';
import StatesPage from './pages/StatesPage';
import StateDetailPage from './pages/StateDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PricingPage from './pages/PricingPage';
import SampleReportPage from './pages/SampleReportPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailedPage from './pages/PaymentFailedPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import SetupAdminPage from './pages/SetupAdminPage';

// Semi-protected (logged in but may not be fully onboarded)
import OnboardingPage from './pages/OnboardingPage';
import PendingApprovalPage from './pages/PendingApprovalPage';

// Protected pages
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import NewStudentPage from './pages/NewStudentPage';
import StudentDetailPage from './pages/StudentDetailPage';
import CollegesPage from './pages/CollegesPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import ExamsPage from './pages/ExamsPage';
import RoadmapPage from './pages/RoadmapPage';
import ReportsPage from './pages/ReportsPage';
import ReportDetailPage from './pages/ReportDetailPage';
import SettingsPage from './pages/SettingsPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import MockTestsPage from './pages/MockTestsPage';
import MockTestPage from './pages/MockTestPage';
import GovernmentExamsPage from './pages/GovernmentExamsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectHelpPage from './pages/ProjectHelpPage';
import FamilyPage from './pages/FamilyPage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCollegesPage from './pages/admin/AdminCollegesPage';
import AdminExamsPage from './pages/admin/AdminExamsPage';
import AdminMockTestsPage from './pages/admin/AdminMockTestsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminWaitlistPage from './pages/admin/AdminWaitlistPage';
import AdminFeedbackPage from './pages/admin/AdminFeedbackPage';

// Extra public pages
import WaitlistPage from './pages/WaitlistPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Fully public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/setup-admin" element={<SetupAdminPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/sample-report" element={<SampleReportPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/payment-failed" element={<PaymentFailedPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/data-deletion" element={<DataDeletionPage />} />
              <Route path="/states" element={<StatesPage />} />
              <Route path="/states/:state" element={<StateDetailPage />} />
              {/* Keep legacy pending-approval URL accessible */}
              <Route path="/pending-approval" element={<PendingApprovalPage />} />

              {/* Auth-required: onboarding (email verified, not yet onboarded) */}
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
              <Route path="/students/new" element={<ProtectedRoute><NewStudentPage /></ProtectedRoute>} />
              <Route path="/students/:id" element={<ProtectedRoute><StudentDetailPage /></ProtectedRoute>} />
              <Route path="/colleges" element={<ProtectedRoute><CollegesPage /></ProtectedRoute>} />
              <Route path="/colleges/state/:state" element={<ProtectedRoute><CollegesPage /></ProtectedRoute>} />
              <Route path="/colleges/category/:category" element={<ProtectedRoute><CollegesPage /></ProtectedRoute>} />
              <Route path="/scholarships" element={<ProtectedRoute><ScholarshipsPage /></ProtectedRoute>} />
              <Route path="/exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
              <Route path="/government-exams" element={<ProtectedRoute><GovernmentExamsPage /></ProtectedRoute>} />
              <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
              <Route path="/reports/:id" element={<ProtectedRoute><ReportDetailPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
              <Route path="/careers/:slug" element={<ProtectedRoute><CareerDetailPage /></ProtectedRoute>} />
              <Route path="/mock-tests" element={<ProtectedRoute><MockTestsPage /></ProtectedRoute>} />
              <Route path="/mock-tests/:id" element={<ProtectedRoute><MockTestPage /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
              <Route path="/projects/:branch" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
              <Route path="/project-help" element={<ProtectedRoute><ProjectHelpPage /></ProtectedRoute>} />
              <Route path="/family" element={<ProtectedRoute><FamilyPage /></ProtectedRoute>} />
              <Route path="/family/members" element={<ProtectedRoute><FamilyPage /></ProtectedRoute>} />
              <Route path="/family/add-parent" element={<ProtectedRoute><FamilyPage /></ProtectedRoute>} />
              <Route path="/family/requests" element={<ProtectedRoute><FamilyPage /></ProtectedRoute>} />

              {/* Admin routes */}
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsersPage /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/colleges" element={<ProtectedRoute requireAdmin><AdminCollegesPage /></ProtectedRoute>} />
              <Route path="/admin/scholarships" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/exams" element={<ProtectedRoute requireAdmin><AdminExamsPage /></ProtectedRoute>} />
              <Route path="/admin/mock-tests" element={<ProtectedRoute requireAdmin><AdminMockTestsPage /></ProtectedRoute>} />
              <Route path="/admin/waitlist" element={<ProtectedRoute requireAdmin><AdminWaitlistPage /></ProtectedRoute>} />
              <Route path="/admin/feedback" element={<ProtectedRoute requireAdmin><AdminFeedbackPage /></ProtectedRoute>} />
              <Route path="/admin/payments" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/content" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettingsPage /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

function NotFoundPage() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
            Go Home
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default App;
