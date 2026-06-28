/**
 * LuckyWinnerPage — monthly lucky winner giveaway details
 */
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';

const steps = [
  { n: 1, title: 'Follow on Instagram', desc: 'Follow our official Instagram page and keep your account public.' },
  { n: 2, title: 'Subscribe on YouTube', desc: 'Subscribe to our channel and turn on notifications.' },
  { n: 3, title: 'Send a Screenshot', desc: 'Send a screenshot showing your follow and subscription to the admin. @plynityesports on Instagram.' },
];

const terms = [
  'Winner is selected randomly every month.',
  'You must follow and subscribe before the draw date.',
  'Screenshot must clearly show your username.',
  'Admin decision is final.',
  'Prize is sent via UPI within 24 hours.',
];

export default function LuckyWinnerPage() {
  const { isDarkMode } = useApp();

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen" style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}>
      <PageHeader title="Lucky Winner" />

      <div className="px-4 py-6">
        <h2 className="text-2xl font-black mb-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          Monthly Lucky Winner
        </h2>
        <p className="text-sm mb-6" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
          Every month, one lucky follower wins ₹500. No entry fee and no registration needed.
        </p>

        <h3 className="font-bold mb-4" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          How to participate
        </h3>

        <div className="flex flex-col gap-4 mb-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: 'rgba(139,92,246,0.2)', color: '#8b5cf6' }}
              >
                {s.n}
              </div>
              <div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
                  {s.title}
                </div>
                <div className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Terms</h3>
        <div className="flex flex-col gap-2">
          {terms.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#8b5cf6' }} />
              <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}