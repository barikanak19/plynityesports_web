/**
 * RegistrationBar — shows live registration count and slots left
 */
export default function RegistrationBar({ registered, maxSlots, color = '#f97316' }) {
  const pct = Math.min((registered / maxSlots) * 100, 100);
  const slotsLeft = maxSlots - registered;
  const isFull = slotsLeft <= 0;

  return (
    <div
      className="rounded-xl p-3"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">👥</span>
          <span className="text-sm font-medium" style={{ color: '#d1d5db' }}>Live Registration</span>
        </div>
        <span className="text-sm font-bold" style={{ color }}>
          {registered} / {maxSlots}
        </span>
      </div>
      <div className="reg-bar">
        <div
          className="reg-bar-fill"
          style={{ width: `${pct}%`, background: isFull ? '#ef4444' : `linear-gradient(90deg, ${color}, ${color}dd)` }}
        />
      </div>
      <div className="mt-1.5">
        {isFull ? (
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>🔴 Match Full</span>
        ) : (
          <span className="text-xs font-semibold" style={{ color: '#22c55e' }}>
            Slots Left: {slotsLeft}
          </span>
        )}
      </div>
    </div>
  );
}