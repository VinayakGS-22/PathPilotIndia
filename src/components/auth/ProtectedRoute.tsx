import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireApproved?: boolean; // kept for backwards compat, no longer used
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  const isAdminRedirect =
    requireAdmin && user && user.role !== 'admin';

  useEffect(() => {
    if (isAdminRedirect) {
      showToast('Admin access required.', 'error');
    }
  }, [isAdminRedirect]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in → login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin route guard
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Non-admin flow checks
  if (user.role !== 'admin') {
    // Onboarding not done → onboarding (skip on onboarding page itself)
    if (!user.onboarding_completed && location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
    }
  }

  return <>{children}</>;
}
