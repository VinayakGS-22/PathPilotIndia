import { useState } from 'react';
import { Star, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const FEATURES = ['Dashboard', 'Career Explorer', 'College Finder', 'Scholarships', 'Exam Planner', 'Mock Tests', 'Roadmap', 'Reports', 'Pricing', 'Other'];

export default function FeedbackPage() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [form, setForm] = useState({ liked: '', improvement: '', page_or_feature: '', contact_permission: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError('Please select a rating.'); return; }
    setError('');
    setLoading(true);
    try {
      const entry = {
        user_id: user?.id || null,
        user_email: user?.email || null,
        rating,
        liked: form.liked || null,
        improvement: form.improvement || null,
        page_or_feature: form.page_or_feature || null,
        contact_permission: form.contact_permission,
        status: 'new',
      };
      if (isSupabaseConfigured && supabase) {
        const { error: dbError } = await supabase.from('feedback_entries').insert(entry);
        if (dbError) throw new Error(dbError.message);
      } else {
        const existing = JSON.parse(localStorage.getItem('pathpilot_feedback') || '[]');
        existing.push({ ...entry, id: crypto.randomUUID(), created_at: new Date().toISOString() });
        localStorage.setItem('pathpilot_feedback', JSON.stringify(existing));
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank you!</h2>
            <p className="text-gray-500">Thanks for your feedback. This helps us improve PathPilot.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#0F172A] py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-5">
            <MessageSquare className="w-4 h-4" /> Share Your Experience
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Give Feedback</h1>
          <p className="text-white/60 text-lg">Help us make PathPilot better for every student and parent in India.</p>
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" onClick={() => setRating(n)}
                      onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)}
                      className="p-0.5 transition-transform hover:scale-110">
                      <Star className={`w-8 h-8 transition-colors ${n <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                {rating > 0 && <p className="text-xs text-gray-500 mt-1">{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">What did you like?</label>
                <textarea value={form.liked} onChange={e => setForm(f => ({ ...f, liked: e.target.value }))}
                  placeholder="Tell us what's working well..." rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">What should we improve?</label>
                <textarea value={form.improvement} onChange={e => setForm(f => ({ ...f, improvement: e.target.value }))}
                  placeholder="Any suggestions or issues you faced..." rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Which page or feature?</label>
                <select value={form.page_or_feature} onChange={e => setForm(f => ({ ...f, page_or_feature: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                  <option value="">Select a feature</option>
                  {FEATURES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.contact_permission}
                  onChange={e => setForm(f => ({ ...f, contact_permission: e.target.checked }))}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">I'm okay with PathPilot contacting me about this feedback.</span>
              </label>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 text-sm">
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
