import { useState, useEffect } from 'react';
import { Star, Trash2, AlertCircle, MessageSquare } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface FeedbackEntry {
  id: string;
  user_email?: string;
  rating: number;
  liked?: string;
  improvement?: string;
  page_or_feature?: string;
  contact_permission: boolean;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ['new', 'reviewed', 'planned', 'resolved'];
const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  reviewed: 'bg-amber-50 text-amber-700 border-amber-200',
  planned: 'bg-violet-50 text-violet-700 border-violet-200',
  resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} className={`w-3.5 h-3.5 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

export default function AdminFeedbackPage() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error: dbErr } = await supabase
            .from('feedback_entries').select('*').order('created_at', { ascending: false });
          if (dbErr) throw new Error(dbErr.message);
          setEntries(data || []);
        } else {
          setEntries(JSON.parse(localStorage.getItem('pathpilot_feedback') || '[]'));
        }
      } catch (err) { setError((err as Error).message); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('feedback_entries').update({ status }).eq('id', id);
    } else {
      const all = JSON.parse(localStorage.getItem('pathpilot_feedback') || '[]').map(
        (e: FeedbackEntry) => e.id === id ? { ...e, status } : e
      );
      localStorage.setItem('pathpilot_feedback', JSON.stringify(all));
    }
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Delete this feedback?')) return;
    if (isSupabaseConfigured && supabase) {
      await supabase.from('feedback_entries').delete().eq('id', id);
    } else {
      const all = JSON.parse(localStorage.getItem('pathpilot_feedback') || '[]').filter(
        (e: FeedbackEntry) => e.id !== id
      );
      localStorage.setItem('pathpilot_feedback', JSON.stringify(all));
    }
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const avg = entries.length
    ? (entries.reduce((s, e) => s + e.rating, 0) / entries.length).toFixed(1)
    : null;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-500" /> Feedback
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {entries.length} entries{avg ? ` · Avg rating: ${avg}/5` : ''}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No feedback entries yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-3 mb-2">
                      <Stars rating={entry.rating} />
                      {entry.page_or_feature && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{entry.page_or_feature}</span>
                      )}
                      {entry.contact_permission && (
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">Can contact</span>
                      )}
                      <span className="text-xs text-gray-400">{new Date(entry.created_at).toLocaleDateString('en-IN')}</span>
                    </div>
                    {entry.user_email && <p className="text-xs text-gray-400 mb-2">{entry.user_email}</p>}
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                      {entry.liked && (
                        <div className="bg-emerald-50 rounded-xl p-3">
                          <p className="text-xs font-semibold text-emerald-700 mb-1">What they liked</p>
                          <p className="text-sm text-emerald-800">{entry.liked}</p>
                        </div>
                      )}
                      {entry.improvement && (
                        <div className="bg-amber-50 rounded-xl p-3">
                          <p className="text-xs font-semibold text-amber-700 mb-1">Improvement suggestion</p>
                          <p className="text-sm text-amber-800">{entry.improvement}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select value={entry.status} onChange={e => updateStatus(entry.id, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none ${statusColors[entry.status] || statusColors.new}`}>
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="text-gray-900 bg-white">
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => deleteEntry(entry.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
