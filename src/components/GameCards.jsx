/**
 * GameCards — BGMI and FF MAX game selection cards
 */
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import bgmiLogo from '../assets/images/bgmi_logo.jpeg';
import ffmaxLogo from '../assets/images/ffmax_logo.jpeg';

const games = [
  {
    id: 'bgmi',
    name: 'BGMI',
    full: 'Battlegrounds Mobile India',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    logo: bgmiLogo,
    path: '/tournaments/bgmi',
  },
  {
    id: 'ff',
    name: 'FF MAX',
    full: 'Free Fire Max',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    logo: ffmaxLogo,
    path: '/tournaments/ff',
  },
];

export default function GameCards() {
  const navigate = useNavigate();
  const { isDarkMode } = useApp();

  return (
    <section className="px-4 pt-6 pb-2">
      <h2 className="font-bold text-lg mb-1" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
        Choose Your Game
      </h2>
      <p className="text-sm mb-4" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
        Select a game to view all tournaments
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => navigate(g.path)}
            className="rounded-3xl p-5 text-left transition-all card-hover"
            style={{
              background: isDarkMode ? '#1a1d2e' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
            }}
          >
            <div className="flex items-center justify-between mb-4 gap-3">
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white/5 p-2"
                style={{ boxShadow: '0 12px 22px rgba(0,0,0,0.08)' }}
              >
                <img src={g.logo} alt={`${g.name} logo`} className="w-full h-full object-contain" />
              </div>
              <span
                className="text-xs font-semibold uppercase px-3 py-1 rounded-full"
                style={{ background: `${g.color}20`, color: g.color }}
              >
                {g.name}
              </span>
            </div>

            <div className="font-bold text-base mb-1" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              {g.full}
            </div>
            <div className="text-sm mb-4" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              Compete • Win • Conquer
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: g.color }}>
              View Matches
              <span className="text-base">→</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}