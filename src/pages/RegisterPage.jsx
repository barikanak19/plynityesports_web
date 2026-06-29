/**
 * RegisterPage — full registration flow:
 * Form → Cashfree Payment → Google Sheets → Success Screen
 */
import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Map } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCashfree } from '../hooks/useCashfree';
import { submitRegistration } from '../services/sheetsService';
import { getAllMatches } from '../config/tournaments';
import PageHeader from '../components/PageHeader';

const MATCH_TYPES_LABEL = { SOLO: 'Solo', DUO: 'Duo', SQUAD: 'Squad' };

export default function RegisterPage() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, addUpcomingMatch } = useApp();
  const { initiatePayment } = useCashfree();

  // Resolve match from location state or config
  const stateMatch = location.state?.match;
  const stateGame = location.state?.game;
  const allMatches = getAllMatches();
  const matchInfo = stateMatch || allMatches.find((m) => m.id === matchId);
  const game = stateGame || { name: matchInfo?.game?.toUpperCase(), color: '#f97316' };

  const color = game?.color || '#f97316';

  const [step, setStep] = useState('form'); // 'form' | 'paying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentId, setPaymentId] = useState('');

  const [form, setForm] = useState({
    playerName: '',
    mobile: '',
    email: '',
    instagramId: '',
    // Duo/Squad extra fields
    player2Name: '',
    player3Name: '',
    player4Name: '',
  });

  const [errors, setErrors] = useState({});

  if (!matchInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <p style={{ color: '#9ca3af' }}>Match not found.</p>
        <button onClick={() => navigate('/')} className="btn-orange px-6 py-3">Go Home</button>
      </div>
    );
  }

  const isDuo = matchInfo.type === 'DUO';
  const isSquad = matchInfo.type === 'SQUAD';

  const validate = () => {
    const e = {};
    if (!form.playerName.trim()) e.playerName = 'Player name is required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter valid 10-digit mobile';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email';
    if (isDuo || isSquad) {
      if (!form.player2Name.trim()) e.player2Name = 'Player 2 name required';
    }
    if (isSquad) {
      if (!form.player3Name.trim()) e.player3Name = 'Player 3 name required';
      if (!form.player4Name.trim()) e.player4Name = 'Player 4 name required';
    }
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep('paying');

    initiatePayment({
      amount: matchInfo.entryFee,
      name: form.playerName,
      email: form.email,
      phone: form.mobile,
      orderId: `${matchInfo.id}-${Date.now()}`,
      description: `${game.name} ${matchInfo.type} ${matchInfo.day} - ₹${matchInfo.entryFee}`,
      onSuccess: async ({ paymentId }) => {
        setPaymentId(paymentId);
        // Build payload for Google Sheets
        const payload = {
          timestamp: new Date().toISOString(),
          game: game.name,
          matchType: matchInfo.type,
          day: matchInfo.day,
          time: matchInfo.time,
          entryFee: matchInfo.entryFee,
          paymentId,
          player1Name: form.playerName,
          mobile: form.mobile,
          email: form.email,
          instagramId: form.instagramId,
          ...(isDuo || isSquad ? { player2Name: form.player2Name } : {}),
          ...(isSquad ? {
            player3Name: form.player3Name,
            player4Name: form.player4Name,
          } : {}),
        };

        try {
          await submitRegistration(matchInfo.sheetKey, payload);
          // Update local slot count
          const key = `plynity_reg_${matchInfo.id}`;
          const prev = parseInt(localStorage.getItem(key) || '0', 10);
          localStorage.setItem(key, prev + 1);
          // Save to upcoming matches
          addUpcomingMatch({
            id: matchInfo.id,
            game: game.name,
            type: matchInfo.type,
            day: matchInfo.day,
            time: matchInfo.time,
            map: matchInfo.map,
            entryFee: matchInfo.entryFee,
            color,
            registeredAt: new Date().toISOString(),
          });
          setStep('success');
        } catch (err) {
          setErrorMsg(err.message || 'Registration saved but sheet submission failed.');
          setStep('success'); // still show success since payment went through
        }
      },
      onFailure: (msg) => {
        setErrorMsg(msg || 'Payment failed. Please try again.');
        setStep('error');
      },
    });
  };

  // ── Field styles ───────────────────────────────────────
  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
    background: isDarkMode ? '#12151f' : '#f9fafb',
    color: isDarkMode ? '#ffffff' : '#111827',
    fontSize: 14,
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 600,
    color: isDarkMode ? '#9ca3af' : '#6b7280',
  };

  // ── SUCCESS SCREEN ─────────────────────────────────────
  if (step === 'success') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center max-w-sm mx-auto"
        style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}
      >
        {/* Trophy */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
          style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e' }}
        >
          🏆
        </div>

        <h2 className="text-2xl font-black mb-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          Registration Successful!
        </h2>
        <p className="text-sm mb-6" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
          You're in! Good luck, {form.playerName}!
        </p>

        <div
          className="w-full max-w-[420px] rounded-2xl px-4 py-3.5 mb-3 text-center shadow-sm"
          style={{
            background: '#FFF8E7',
            border: '1px solid #F0E6C8',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">❤️</span>
            <p className="text-sm font-semibold" style={{ color: '#3A2E00' }}>
              Thank you for choosing Plynity Esports ❤️
            </p>
          </div>
        </div>

        <div
          className="w-[92%] max-w-[430px] rounded-2xl px-3.5 py-3.5 mb-6 text-left shadow-sm"
          style={{
            background: '#FFF8E7',
            border: '1px solid #F0E6C8',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-start gap-2">
            <span className="text-base mt-0.5">ℹ️</span>
            <p className="text-sm leading-relaxed" style={{ color: '#3A2E00' }}>
              Note: Room ID &amp; Password will be sent to your registered email address 15 minutes before your match starts. Please check your inbox (and Spam folder if necessary) before the match.
            </p>
          </div>
        </div>

        {/* Match summary */}
        <div
          className="w-full rounded-2xl p-4 mb-4 text-left"
          style={{ background: isDarkMode ? '#1a1d2e' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Game</span>
            <span className="text-sm font-bold" style={{ color }}>{game.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Match</span>
            <span className="text-sm font-bold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              {matchInfo.type} — {matchInfo.day}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Time</span>
            <span className="text-sm font-bold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              {matchInfo.time}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Map</span>
            <span className="text-sm font-bold" style={{ color }}>
              {matchInfo.map || 'TBD'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Payment ID</span>
            <span className="text-xs font-mono" style={{ color: '#22c55e' }}>
              {paymentId || 'SIMULATED'}
            </span>
          </div>
        </div>

        {/* Room ID info box */}
        <div
          className="w-full rounded-2xl p-4 mb-6"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}
        >
          <p className="text-sm font-medium" style={{ color: isDarkMode ? '#c7d2fe' : '#4338ca' }}>
            📩 Room ID &amp; Password will be sent to your registered email{' '}
            <strong>15 minutes before your match starts.</strong>
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="btn-orange w-full py-4 text-base rounded-2xl"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // ── ERROR SCREEN ──────────────────────────────────────
  if (step === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center max-w-sm mx-auto">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
          style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid #ef4444' }}
        >
          ❌
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          Payment Failed
        </h2>
        <p className="text-sm mb-6" style={{ color: '#ef4444' }}>{errorMsg}</p>
        <button onClick={() => setStep('form')} className="btn-orange w-full py-4 rounded-2xl">
          Try Again
        </button>
      </div>
    );
  }

  // ── REGISTRATION FORM ─────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}
    >
      {/* Gradient Header */}
      <div
        className="px-4 pt-4 pb-8"
        style={{ background: game.headerGradient || `linear-gradient(135deg, ${color}, ${color}88)` }}
      >
        <button onClick={() => navigate(-1)} className="text-white opacity-80 mb-4 flex items-center gap-1">
          ← Back
        </button>
        <h1 className="text-xl font-black text-white">
          Register — {game.name} {MATCH_TYPES_LABEL[matchInfo.type]} {matchInfo.day}
        </h1>
        <p className="text-white opacity-70 text-sm mt-1 flex flex-wrap items-center gap-2">
          <span>{matchInfo.time}</span>
          <span>·</span>
          <span>Entry: ₹{matchInfo.entryFee}</span>
          <span>·</span>
          <span>Prize Pool: ₹{matchInfo.prizePool.toLocaleString()}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Map size={14} />
            {matchInfo.map || 'TBD'}
          </span>
        </p>
      </div>

      <div className="max-w-screen-sm mx-auto px-4 -mt-4 pb-12">
        {/* Loading overlay during payment */}
        {step === 'paying' && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
            style={{ background: 'rgba(0,0,0,0.7)' }}
          >
            <div
              className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: `${color} ${color} ${color} transparent` }}
            />
            <p className="text-white font-semibold">Processing Payment…</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Player 1 */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{
              background: isDarkMode ? '#1a1d2e' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
            }}
          >
            <h3 className="font-bold mb-4" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              {isDuo || isSquad ? 'Player 1 (Team Leader)' : 'Your Details'}
            </h3>

            <div className="mb-4">
              <label style={labelStyle}>Player Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.playerName}
                onChange={handleChange('playerName')}
                style={{ ...inputStyle, borderColor: errors.playerName ? '#ef4444' : undefined }}
              />
              {errors.playerName && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.playerName}</p>}
            </div>

            <div className="mb-4">
              <label style={labelStyle}>Mobile Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={handleChange('mobile')}
                maxLength={10}
                style={{ ...inputStyle, borderColor: errors.mobile ? '#ef4444' : undefined }}
              />
              {errors.mobile && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.mobile}</p>}
            </div>

            <div className="mb-4">
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange('email')}
                style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : undefined }}
              />
              {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
              <p className="text-xs mt-1" style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}>
                Room ID will be sent to this email
              </p>
            </div>

            <div>
              <label style={labelStyle}>Instagram ID (optional)</label>
              <input
                type="text"
                placeholder="@yourusername"
                value={form.instagramId}
                onChange={handleChange('instagramId')}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Player 2 for DUO/SQUAD */}
          {(isDuo || isSquad) && (
            <div
              className="rounded-2xl p-5 mb-4"
              style={{
                background: isDarkMode ? '#1a1d2e' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Player 2</h3>
              <div className="mb-4">
                <label style={labelStyle}>Player Name *</label>
                <input type="text" placeholder="Player 2 name" value={form.player2Name}
                  onChange={handleChange('player2Name')}
                  style={{ ...inputStyle, borderColor: errors.player2Name ? '#ef4444' : undefined }} />
                {errors.player2Name && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.player2Name}</p>}
              </div>
            </div>
          )}

          {/* Players 3 & 4 for SQUAD */}
          {isSquad && (
            <>
              {[3, 4].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl p-5 mb-4"
                  style={{
                    background: isDarkMode ? '#1a1d2e' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
                  }}
                >
                  <h3 className="font-bold mb-4" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Player {n}</h3>
                  <div className="mb-4">
                    <label style={labelStyle}>Player Name *</label>
                    <input type="text" placeholder={`Player ${n} name`}
                      value={form[`player${n}Name`]} onChange={handleChange(`player${n}Name`)}
                      style={{ ...inputStyle, borderColor: errors[`player${n}Name`] ? '#ef4444' : undefined }} />
                    {errors[`player${n}Name`] && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors[`player${n}Name`]}</p>}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Payment Summary */}
          <div
            className="rounded-2xl p-4 mb-4"
            style={{
              background: `${color}11`,
              border: `1px solid ${color}33`,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm" style={{ color: isDarkMode ? '#d1d5db' : '#374151' }}>
                Entry Fee
              </span>
              <span className="font-black text-lg" style={{ color }}>
                ₹{matchInfo.entryFee}
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              Secure payment via Cashfree
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            🎮 Pay &amp; Register — ₹{matchInfo.entryFee}
          </button>

          <p className="text-center text-xs mt-3" style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}>
            By registering you agree to the Tournament Rules &amp; Terms.
          </p>
        </form>
      </div>
    </div>
  );
}