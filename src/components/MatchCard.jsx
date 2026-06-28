/**
 * MatchCard — expandable card showing match details, prize pool, registration bar, and register button
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import PrizeRow from '../components/PrizeRow';
import RegistrationBar from '../components/RegistrationBar';
import { useApp } from '../context/AppContext';

export default function MatchCard({ match, game }) {
  const navigate = useNavigate();
  const { isDarkMode, upcomingMatches } = useApp();
  const [expanded, setExpanded] = useState(false);

  // Track registered slots in localStorage per match
  const storageKey = `plynity_reg_${match.id}`;
  const [registered, setRegistered] = useState(() => {
    return parseInt(localStorage.getItem(storageKey) || '0', 10);
  });

  useEffect(() => {
    // Re-read on expand
    if (expanded) {
      setRegistered(parseInt(localStorage.getItem(storageKey) || '0', 10));
    }
  }, [expanded, storageKey]);

  const isAlreadyRegistered = upcomingMatches.some((m) => m.id === match.id);
  const isFull = registered >= match.maxSlots;
  const color = game.color;

  const handleRegister = () => {
    navigate(`/register/${match.id}`, { state: { match, game } });
  };

  return (
    <div
      className="rounded-2xl overflow-hidden card-hover mb-3"
      style={{
        background: isDarkMode ? '#1a1d2e' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {/* Game Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          {game.name === 'BGMI' ? 'BG' : 'FF'}
        </div>

        {/* Title + Time */}
        <div className="flex-1">
          <div className="font-bold text-base" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
            {match.type} — {match.day}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={12} color={color} />
            <span className="text-sm font-medium" style={{ color }}>
              {match.time}
            </span>
          </div>
        </div>

        {/* Entry Fee Badge */}
        <div
          className="px-3 py-1.5 rounded-xl text-sm font-bold flex-shrink-0"
          style={{ background: `${color}22`, color }}
        >
          ₹{match.entryFee}
        </div>

        {/* Chevron */}
        <div style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expandable details */}
      {expanded && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
        >
          {/* Prize Pool Header */}
          <div className="flex items-center justify-between mt-3 mb-2">
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <span className="font-semibold text-sm" style={{ color: isDarkMode ? '#d1d5db' : '#374151' }}>
                Prize Pool
              </span>
            </div>
            <span className="font-bold text-sm" style={{ color: '#f59e0b' }}>
              Total: ₹{match.prizePool.toLocaleString()}
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: isDarkMode ? '#2a2d3e' : '#e5e7eb', marginBottom: 8 }} />

          {/* Prize rows */}
          {match.prizes.map((prize) => (
            <PrizeRow key={prize.place} {...prize} />
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: isDarkMode ? '#2a2d3e' : '#e5e7eb', margin: '8px 0' }} />

          {/* Registration Bar */}
          <RegistrationBar registered={registered} maxSlots={match.maxSlots} color={color} />

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={isFull || isAlreadyRegistered}
            className="w-full mt-3 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
            style={{
              background:
                isFull || isAlreadyRegistered
                  ? isDarkMode ? '#2a2d3e' : '#e5e7eb'
                  : `linear-gradient(135deg, ${color}, ${color}cc)`,
              color: isFull || isAlreadyRegistered ? (isDarkMode ? '#4b5563' : '#9ca3af') : '#ffffff',
              cursor: isFull || isAlreadyRegistered ? 'not-allowed' : 'pointer',
            }}
          >
            <span>🎮</span>
            {isAlreadyRegistered
              ? 'Already Registered'
              : isFull
              ? 'Match Full'
              : `Register — ₹${match.entryFee}`}
          </button>
        </div>
      )}
    </div>
  );
}