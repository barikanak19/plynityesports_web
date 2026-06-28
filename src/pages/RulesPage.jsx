/**
 * RulesPage — tournament rules & guidelines
 */
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';

const sections = [
  {
    color: '#22c55e',
    title: 'Payment & Prize Pool',
    rules: [
      { n: '01', title: 'Prize Pool May Decrease', desc: 'If total registrations are low, the prize pool may decrease proportionally.' },
      { n: '02', title: 'No Refunds', desc: 'Refunds are not available once the room ID and password have been created and shared.' },
      { n: '03', title: 'Prize Payment Timeline', desc: 'Winners will receive their prize money within 4–5 hours after the match ends.' },
    ],
  },
  {
    color: '#f97316',
    title: 'Match Rules',
    rules: [
      { n: '04', title: 'Room Code Sharing', desc: 'Room ID and password will be shared before the match on Email or WhatsApp.' },
      { n: '05', title: 'No Late Join', desc: 'Players must join the room on time. Late joins are not allowed and will result in disqualification.' },
      { n: '06', title: 'No Hacking / Cheating', desc: 'Hacking, modding, teaming with enemies, or any form of cheating is strictly not allowed.' },
      { n: '07', title: 'Fair Play Only', desc: 'All players must play fairly. Teaming in solo matches or unfair play leads to permanent ban.' },
    ],
  },
  {
    color: '#f43f5e',
    title: 'Player Conduct',
    rules: [
      { n: '08', title: 'Respect All Players', desc: 'Abusive language, harassment, or disrespect towards players or admins may lead to permanent ban.' },
      { n: '09', title: 'Wrong Details = Cancellation', desc: 'Providing wrong in-game name or contact details may result in automatic registration cancellation.' },
      { n: '10', title: 'Admin Decision is Final', desc: 'All decisions made by admins are final and binding. Disputes will be resolved by admin only.' },
    ],
  },
  {
    color: '#f43f5e',
    title: 'Updates & Streaming',
    rules: [
      { n: '11', title: 'Updates via Instagram Stories', desc: 'All important updates, announcements and room codes will be shared on Instagram stories.' },
      { n: '12', title: 'Matches Live on YouTube', desc: 'Matches may be streamed live on our YouTube channel. By joining, you consent to being shown in stream.' },
    ],
  },
];

export default function RulesPage() {
  const { isDarkMode } = useApp();

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen" style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}>
      <PageHeader title="Rules & Guidelines" />

      <div className="px-4 py-4">
        <p className="text-sm mb-6 p-3 rounded-xl" style={{
          background: 'rgba(239,68,68,0.1)',
          color: '#ef4444',
          border: '1px solid rgba(239,68,68,0.2)',
        }}>
          Please read all rules before joining. Violations may lead to disqualification or a permanent ban.
        </p>

        {sections.map((sec) => (
          <div key={sec.title} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: sec.color }} />
              <h3 className="font-bold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>{sec.title}</h3>
            </div>

            <div className="flex flex-col gap-4">
              {sec.rules.map((r) => (
                <div key={r.n} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: isDarkMode ? '#1e2130' : '#f3f4f6', color: isDarkMode ? '#9ca3af' : '#374151' }}
                  >
                    {r.n}
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
                      {r.title}
                    </div>
                    <div className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          className="rounded-2xl p-4 mt-2"
          style={{ background: isDarkMode ? '#1a1d2e' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
        >
          <p className="text-sm font-bold" style={{ color: isDarkMode ? '#d1d5db' : '#374151' }}>
            By registering and paying, you agree to all the rules and guidelines above.
          </p>
        </div>
      </div>
    </div>
  );
}