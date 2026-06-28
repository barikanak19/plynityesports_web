/**
 * LuckyWinnerBanner — teaser banner linking to Lucky Winner page
 */
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LuckyWinnerBanner() {
  const navigate = useNavigate();
  const { isDarkMode } = useApp();

  return (
    <section className="px-4 pt-4">
      <button
        onClick={() => navigate('/lucky-winner')}
        className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all card-hover text-left"
        style={{
          background: isDarkMode ? '#1a1d2e' : '#ffffff',
          border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
        }}
      >
        <span className="text-2xl">🏆</span>
        <div className="flex-1">
          <div className="font-bold text-base" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
            Monthly Lucky Winner
          </div>
          <div className="text-sm mt-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
            Win ₹500 every month with a simple entry.
          </div>
        </div>
        <ChevronRight size={20} color={isDarkMode ? '#4b5563' : '#9ca3af'} />
      </button>
    </section>
  );
}