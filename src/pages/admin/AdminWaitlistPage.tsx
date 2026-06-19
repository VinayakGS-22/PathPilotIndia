import { useState, useEffect } from 'react';
import { Clock, Trash2, AlertCircle, Users } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface WaitlistEntry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  interested_plan: string;
  role: string;
  message?: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'];
const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  converted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  closed: 'bg-gray-100 text-gray-500 border-gray-200',
};

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error: dbErr } = await supabase
            .from('waitlist_entries').select('*').order('created_at', { ascending: false });
          if (dbErr) throw new Error(dbErr.message);
          setEntries(data || []);
        } else {
          setEntries(JSON.parse(localStorage.getItem('pathpilot_waitlist') || '[]'));
        }
      } catch (err) { setError((err as Error).message); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('waitlist_entries').update({ status }).eq('id', id);
    } else {
      const all = JSON.parse(localStorage.getItem('pathpilot_waitlist') || '[]').map(
        (e: WaitlistEntry) => e.id === id ? { ...e, status } : e
      );
      localStorage.setItem('pathpilot_waitlist', JSON.stringify(all));
    }
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    if (isSupabaseConfigured && supabase) {
      await supabase.from('waitlist_entries').delete().eq('id', id);
    } else {
      const all = JSON.parse(localStorage.getItem('pathpilot_waitlist') || '[]').filter(
        (e: WaitlistEntry) => e.id !== id
      );
      localStorage.setItem('pathpilot_waitlist', JSON.stringify(all));
    }
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-500" /> Waitlist
          </h1>
          <p className="text-gray-500 text-sm mt-1">{entries.length} entries</p>
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
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No waitlist entries yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Name', 'Email', 'Phone', 'Plan', 'Role', 'Message', 'Status', 'Date', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {entries.map(entry => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{entry.full_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{entry.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{entry.phone}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{entry.interested_plan}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{entry.role}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-[160px]">
                        <span className="line-clamp-2">{entry.message || '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select value={entry.status} onChange={e => updateStatus(entry.id, e.target.value)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg border cursor-pointer outline-none ${statusColors[entry.status] || statusColors.new}`}>
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s} className="text-gray-900 bg-white">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => deleteEntry(entry.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
