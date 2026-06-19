import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard, GraduationCap, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Colleges', href: '/colleges' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Exams', href: '/exams' },
    { name: 'Careers', href: '/careers' },
    { name: 'States', href: '/states' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Pricing', href: '/pricing' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname.startsWith(path);
  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const headerShadow = scrolled ? 'shadow-md' : 'shadow-sm';

  return (
    <header
      className={`sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-gray-200 transition-shadow duration-300 ${headerShadow}`}
      style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-[#0F172A]">
                PathPilot<span className="text-[#2563EB]">India</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[#2563EB] bg-blue-50'
                    : 'text-[#334155] hover:text-[#2563EB] hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors border bg-gray-50 hover:bg-gray-100 border-gray-200"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate text-gray-800">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform text-gray-400 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors">
                        <Shield className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 w-full text-left transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#334155] hover:text-[#2563EB] transition-colors"
                >
                  Login
                </Link>
                <Link to="/signup" className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-600/25">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-[#334155] hover:text-[#0F172A] hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
          <div className="space-y-1 mb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[#2563EB] bg-blue-50'
                    : 'text-[#334155] hover:text-[#2563EB] hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-1">
            {user ? (
              <>
                <div className="px-4 py-2 mb-2 flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#334155] hover:text-[#0F172A] hover:bg-gray-100">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#334155] hover:text-[#0F172A] hover:bg-gray-100">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50">
                    <Shield className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#334155] hover:text-[#2563EB] hover:bg-blue-50">Login</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-blue-600 text-white text-center rounded-xl font-semibold hover:bg-blue-700 transition-colors">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
