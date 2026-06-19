import { useState } from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const PLANS = ['Free', 'Student Pro', 'Parent Plus', 'Family Plan'];
const ROLES = ['Student', 'Parent', 'Guardian', 'Teacher', 'Other'];

export default function WaitlistPage() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', interested_plan: '', role: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const entry = { ...form, status: 'new' };
      if (isSupabaseConfigured && supabase) {
        const { error: dbError } = await supabase.from('waitlist_entries').insert(entry);
        if (dbError) throw new Error(dbError.message);
      } else {
        const existing = JSON.parse(localStorage.getItem('pathpilot_waitlist') || '[]');
        existing.push({ ...entry, id: crypto.randomUUID(), created_at: new Date().toISOString() });
        localStorage.setItem('pathpilot_waitlist', JSON.stringify(existing));
      }
      setDone(true);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#F8FAFC]">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">You're on the list!</h2>
            <p className="text-gray-500">Waitlist confirmed. We'll contact you when this plan is available.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#0F172A] py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-5">
            <Clock className="w-4 h-4" /> Limited Early Access
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Join the Waitlist</h1>
          <p className="text-white/60 text-lg">Be the first to know when premium plans go live. Get early-bird pricing.</p>
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {error && (
              <div className="mb-5 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input type="text" required value={form.full_name} onChange={e => set('full_name', e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Interested Plan *</label>
                <select required value={form.interested_plan} onChange={e => set('interested_plan', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                  <option value="">Select a plan</option>
                  {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a *</label>
                <select required value={form.role} onChange={e => set('role', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder="Any specific features you're looking for?" rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 text-sm">
                {loading ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
