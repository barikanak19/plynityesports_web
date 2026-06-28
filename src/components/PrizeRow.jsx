/**
 * PrizeRow — renders a single prize place row with medal icon
 */
const MEDAL_EMOJI = {
  gold: '🥇',
  silver: '🥈',
  bronze: '🥉',
  trophy: '🏆',
};

export default function PrizeRow({ place, amount, medal }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <span className="text-base">{MEDAL_EMOJI[medal] || '🏆'}</span>
        <span className="text-sm" style={{ color: '#9ca3af' }}>{place}</span>
      </div>
      <span className="font-bold text-sm" style={{ color: '#22c55e' }}>₹{amount}</span>
    </div>
  );
}