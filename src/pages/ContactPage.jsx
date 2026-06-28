/**
 * ContactPage — support contact details
 */
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';
import appLogo from '../assets/images/applogo.jpeg';

export default function ContactPage() {
  const { isDarkMode } = useApp();
  const card = {
    background: isDarkMode ? '#1a1d2e' : '#ffffff',
    border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
  };

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen" style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}>
      <PageHeader title="Contact" />

      <div className="px-4 py-6">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={appLogo}
            alt="Plynity Logo"
            className="w-14 h-14 rounded-2xl object-cover"
          />
          <div>
            <div className="font-bold text-base" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Plynity Support</div>
            <div className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Plynity Esports</div>
          </div>
        </div>

        {/* Email */}
        <h3 className="font-bold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Contact Details</h3>
        <a
          href="mailto:plynitysupport@gmail.com"
          className="flex items-center justify-between p-4 rounded-2xl mb-4"
          style={card}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">✉️</span>
            <div>
              <div className="text-xs mb-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Email Address</div>
              <div className="font-semibold text-sm" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
                plynitysupport@gmail.com
              </div>
            </div>
          </div>
          <span style={{ color: '#6366f1' }}>✉</span>
        </a>

        {/* Social Links */}
        <h3 className="font-bold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Social Links</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { label: 'Instagram', href: 'https://instagram.com/plynityesports', icon: '📸' },
            { label: 'YouTube', href: 'https://youtube.com/@plynityesports', icon: '▶' },
            { label: 'Telegram', href: 'https://t.me/plynityesports', icon: '✈️' },
            { label: 'WhatsApp', href: '#', icon: '💬' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: isDarkMode ? '#1e2130' : '#f3f4f6',
                color: isDarkMode ? '#d1d5db' : '#374151',
                border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
              }}
            >
              <span>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        {/* Response Times */}
        <h3 className="font-bold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Response Time</h3>
        {[
          { icon: '📸', channel: 'Instagram DM', time: 'Usually within 2–4 hours', color: '#e11d48' },
          { icon: '✉️', channel: 'Email', time: 'Usually within 12–24 hours', color: '#6366f1' },
          { icon: '💬', channel: 'WhatsApp / Telegram', time: 'Fastest — group announcements', color: '#22c55e' },
        ].map((r) => (
          <div
            key={r.channel}
            className="flex items-center gap-3 p-3 rounded-xl mb-2"
            style={{ background: isDarkMode ? '#1a1d2e' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
          >
            <span className="text-xl">{r.icon}</span>
            <div>
              <div className="font-semibold text-sm" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>{r.channel}</div>
              <div className="text-xs" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>{r.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}