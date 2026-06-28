/**
 * DaySection — renders a day header + all match cards for that day
 */
import MatchCard from './MatchCard';
import { useApp } from '../context/AppContext';

export default function DaySection({ dayData, game }) {
  const { isDarkMode } = useApp();

  return (
    <div className="mb-6">
      {/* Day header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-1 rounded-full"
          style={{ height: 24, background: game.color }}
        />
        <span className="font-bold text-lg" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          {dayData.day}
        </span>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: `${game.color}22`,
            color: game.color,
          }}
        >
          {dayData.matches.length} match{dayData.matches.length > 1 ? 'es' : ''}
        </span>
      </div>

      {/* Match cards */}
      {dayData.matches.map((match) => (
        <MatchCard key={match.id} match={match} game={game} />
      ))}
    </div>
  );
}