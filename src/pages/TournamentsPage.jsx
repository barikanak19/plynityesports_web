/**
 * TournamentPage — shows all matches for a given game (BGMI or FF)
 */
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DaySection from '../components/DaySection';
import { TOURNAMENTS } from '../config/tournaments';
import { useApp } from '../context/AppContext';

export default function TournamentPage() {
  const { gameId } = useParams(); // 'bgmi' or 'ff'
  const navigate = useNavigate();
  const { isDarkMode } = useApp();

  const gameKey = gameId?.toUpperCase();
  const game = TOURNAMENTS[gameKey];

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p style={{ color: '#9ca3af' }}>Game not found.</p>
        <button onClick={() => navigate('/')} className="btn-orange px-6 py-3">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-sm mx-auto">
      {/* Gradient Header */}
      <div
        className="relative px-4 pt-6 pb-10"
        style={{ background: game.headerGradient }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-4 text-white opacity-80"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">{game.name} Matches</h1>
          {/* Game icon decoration */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl opacity-40"
            style={{ border: '2px solid rgba(255,255,255,0.3)' }}
          >
            {game.name === 'BGMI' ? 'BG' : 'FF'}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="mx-4 -mt-4 rounded-xl px-4 py-3 mb-4 flex items-center gap-2"
        style={{
          background: `${game.color}18`,
          border: `1px solid ${game.color}44`,
        }}
      >
        <span>📅</span>
        <span className="text-sm" style={{ color: game.color }}>
          Tap any match to see prize pool &amp; register
        </span>
      </div>

      {/* Day sections */}
      <div className="px-4 pb-8">
        {game.days.map((dayData) => (
          <DaySection key={dayData.day} dayData={dayData} game={game} />
        ))}
      </div>
    </div>
  );
}