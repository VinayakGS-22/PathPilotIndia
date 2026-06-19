import { useState, useEffect } from 'react';
import { User, Bell, Shield, Save, Check } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { INDIAN_STATES } from '../lib/constants';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    role: 'parent' as 'parent' | 'student',
    state: '',
    city: '',
    notifications_enabled: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '', role: user.role || 'parent', state: user.state || '',
        city: user.city || '', notifications_enabled: user.notifications_enabled ?? true
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await updateProfile(form);
    if (error) showToast('Failed to update settings', 'error');
    else showToast('Settings updated successfully', 'success');
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account preferences and profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
              <div>
                <h2 className="font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-500">Update your personal details</p>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setForm({ ...form, role: 'parent' })} className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${form.role === 'parent' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{form.role === 'parent' && <Check className="w-5 h-5" />}Parent</button>
                  <button type="button" onClick={() => setForm({ ...form, role: 'student' })} className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${form.role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{form.role === 'student' && <Check className="w-5 h-5" />}Student</button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input id="city" type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Bell className="w-5 h-5 text-yellow-600" /></div>
              <div>
                <h2 className="font-semibold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about exam dates, scholarships, and more</p>
                </div>
                <button type="button" onClick={() => setForm({ ...form, notifications_enabled: !form.notifications_enabled })} className={`relative w-12 h-6 rounded-full transition-colors ${form.notifications_enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.notifications_enabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Shield className="w-5 h-5 text-purple-600" /></div>
              <div>
                <h2 className="font-semibold text-gray-900">Account</h2>
                <p className="text-sm text-gray-500">Your account details</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Email</span><span className="font-medium text-gray-900">{user?.email || 'demo@example.com'}</span></div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Account Type</span><span className="font-medium text-gray-900">Free Plan</span></div>
              <div className="flex items-center justify-between py-3"><span className="text-gray-600">Member Since</span><span className="font-medium text-gray-900">{user ? new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'January 2024'}</span></div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50"><Save className="w-5 h-5" />{loading ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
