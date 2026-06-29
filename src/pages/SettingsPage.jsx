/**
 * SettingsPage — theme switch + app info
 */
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';
import appLogo from '../assets/images/applogo.jpeg';

export default function SettingsPage() {
  const { isDarkMode, toggleTheme, notificationsEnabled, toggleNotifications } = useApp();

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderRadius: 16,
    marginBottom: 12,
    background: isDarkMode ? '#1a1d2e' : '#ffffff',
    border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
  };

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen" style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}>
      <PageHeader title="Settings" />

      <div className="px-4 py-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={appLogo}
            alt="Plynity Logo"
            className="w-20 h-20 rounded-2xl object-cover mb-3"
          />
          <p className="font-bold text-lg" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Plynity</p>
          <p className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Esports Tournament Platform</p>
        </div>

        {/* Appearance */}
        <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          🎨 Appearance
        </h3>

        <div style={rowStyle}>
          <div>
            <div className="font-semibold text-sm" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </div>
            <div className="text-xs mt-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              {isDarkMode ? 'Switch to light mode anytime' : 'Switch to dark mode anytime'}
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="toggle-slider" />
          </label>
        </div>

        {/* Notifications */}
        <h3 className="font-bold mt-6 mb-3 flex items-center gap-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          🔔 Notifications
        </h3>

        <div style={rowStyle}>
          <div>
            <div className="font-semibold text-sm" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              Match Notifications
            </div>
            <div className="text-xs mt-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              Get notified about match updates
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
            <span className="toggle-slider" />
          </label>
        </div>

        {/* About */}
        <h3 className="font-bold mt-6 mb-3 flex items-center gap-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          ℹ️ About
        </h3>
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ background: isDarkMode ? '#1a1d2e' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
        >
          <p className="text-sm leading-relaxed" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>
            Plynity is an esports tournament platform for BGMI and Free Fire Max players in India. Join tournaments,
            compete with others, and win real cash prizes.
          </p>
        </div>

        {/* App Info */}
        <h3 className="font-bold mt-2 mb-3 flex items-center gap-2" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          📱 App Info
        </h3>
        {[
          ['# App Version', '1.0.0'],
          ['🔧 Build Number', '1'],
          ['🎮 Platform', 'Web'],
          ['💳 Payment Gateway', 'Cashfree'],
        ].map(([label, value]) => (
          <div key={label} style={{ ...rowStyle, marginBottom: 8 }}>
            <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{label}</span>
            <span className="text-sm font-semibold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>{value}</span>
          </div>
        ))}

        <p className="text-center text-xs mt-6" style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}>
          © 2026 Plynity. All rights reserved.
        </p>
      </div>
    </div>
  );
}