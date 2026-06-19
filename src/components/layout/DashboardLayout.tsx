import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, GraduationCap, Award, Calendar, Map,
  Settings, Menu, X, ChevronLeft, LogOut, GraduationCap as LogoIcon,
  BookOpen, Code, Users2, Shield, Clock, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps { children: ReactNode; }

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const studentNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Colleges', href: '/colleges', icon: GraduationCap },
    { name: 'Scholarships', href: '/scholarships', icon: Award },
    { name: 'Exam Planner', href: '/exams', icon: Calendar },
    { name: 'Careers', href: '/careers', icon: BookOpen },
    { name: 'Mock Tests', href: '/mock-tests', icon: Code },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const parentNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Colleges', href: '/colleges', icon: GraduationCap },
    { name: 'Scholarships', href: '/scholarships', icon: Award },
    { name: 'Exam Planner', href: '/exams', icon: Calendar },
    { name: 'Family', href: '/family', icon: Users2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const adminNav = [
    { name: 'Admin Dashboard', href: '/admin', icon: Shield },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Colleges', href: '/admin/colleges', icon: GraduationCap },
    { name: 'Exams', href: '/admin/exams', icon: Calendar },
    { name: 'Mock Tests', href: '/admin/mock-tests', icon: Code },
    { name: 'Waitlist', href: '/admin/waitlist', icon: Clock },
    { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const navigation = user?.role === 'admin' ? adminNav : user?.role === 'parent' ? parentNav : studentNav;
  const isActive = (path: string) => location.pathname === path || (path !== '/dashboard' && path !== '/admin' && location.pathname.startsWith(path + '/'));
  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const roleBadgeColor = user?.role === 'admin'
    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    : user?.role === 'parent'
    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    : 'bg-blue-500/20 text-blue-400 border-blue-500/30';

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/8 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
            <LogoIcon className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-white text-base">PathPilot<span className="text-blue-400">India</span></span>}
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors">
          <ChevronLeft className={`w-4 h-4 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive(item.href)
                ? 'bg-blue-600/20 text-white border border-blue-500/30'
                : 'text-white/55 hover:text-white hover:bg-white/8'
            }`}
            title={!sidebarOpen ? item.name : undefined}
          >
            <item.icon className={`w-4.5 h-4.5 w-5 h-5 flex-shrink-0 ${isActive(item.href) ? 'text-blue-400' : 'text-white/40'}`} />
            {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/8 flex-shrink-0">
        {sidebarOpen ? (
          <div className="rounded-xl bg-white/6 border border-white/10 p-3">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-white/40 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${roleBadgeColor}`}>
                {user?.role}
              </span>
              <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleSignOut} className="w-full p-2.5 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors flex items-center justify-center" title="Sign Out">
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0F172A] border-b border-white/10 z-40 shadow-lg">
        <div className="flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <LogoIcon className="w-4.5 h-4.5 w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">PathPilot<span className="text-blue-400">India</span></span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-[#0F172A] border-r border-white/8 transition-all duration-300 flex flex-col ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarOpen ? 'lg:w-64' : 'lg:w-[72px]'} w-64`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-[72px]'} pt-14 lg:pt-0 min-h-screen`}>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
