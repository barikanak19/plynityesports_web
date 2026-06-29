/**
 * UpcomingPage — shows registered matches saved in localStorage
 */
import { useNavigate } from 'react-router-dom';
import { Calendar, Map } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';

export default function UpcomingPage() {
  const { upcomingMatches, removeUpcomingMatch, isDarkMode } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen" style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}>
      <PageHeader title="Your Upcoming Matches" />

      <div className="px-4 py-4">
        <p className="text-sm mb-4" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
          Saved registrations stay here even after app restart.
        </p>

        {upcomingMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Calendar size={48} color="#4b5563" />
            <p className="font-semibold" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              No upcoming matches yet
            </p>
            <p className="text-sm text-center" style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}>
              Register from a match card to see your saved entries here.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 btn-orange px-6 py-3"
            >
              Browse Tournaments
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {upcomingMatches.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: isDarkMode ? '#1a1d2e' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}88)` }}
                >
                  {m.game === 'BGMI' ? 'BG' : 'FF'}
                </div>
                <div className="flex-1">
                  <div className="font-bold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
                    {m.game} {m.type} — {m.day}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
                    {m.time} · Entry: ₹{m.entryFee}
                  </div>
                  <div className="text-sm mt-1 flex items-center gap-1" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                    <Map size={14} />
                    <span>Map: {m.map || 'TBD'}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeUpcomingMatch(m.id)}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}