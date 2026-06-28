/**
 * Footer — copyright notice
 */
import { useApp } from '../context/AppContext';
import appLogo from '../assets/images/applogo.jpeg';
import instaLogo from '../assets/images/instalogo.jpeg';
import ytLogo from '../assets/images/ytlogo.jpeg';

export default function Footer() {
  const { isDarkMode } = useApp();

  return (
    <footer
      className="px-4 pt-8 pb-6"
      style={{
        background: isDarkMode ? '#0b101a' : '#f8fafc',
        borderTop: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
        color: isDarkMode ? '#9ca3af' : '#6b7280',
      }}
    >
      <div className="max-w-screen-sm mx-auto space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={appLogo} alt="Plynity Logo" className="w-14 h-14 rounded-2xl object-cover" />
          <div>
            <h2 className="text-lg font-bold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              PLYNITY ESPORTS
            </h2>
            <p className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
              Beyond limits. Beyond ordinary.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {[
            { href: 'https://instagram.com/plynityesports', logo: instaLogo, label: 'Instagram' },
            { href: 'https://youtube.com/@plynityesports', logo: ytLogo, label: 'YouTube' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-3 transition-all card-hover"
              style={{ background: isDarkMode ? '#12151f' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
            >
              <img src={item.logo} alt={item.label} className="w-6 h-6 object-contain" />
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-3xl p-4" style={{ background: isDarkMode ? '#10131d' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}>
            <h3 className="font-semibold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              Quick Links
            </h3>
            <div className="space-y-2">
              <a href="/" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Home</a>
              <a href="/tournaments/bgmi" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Tournaments</a>
              <a href="/upcoming" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Upcoming</a>
              <a href="/rules" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Rules</a>
              <a href="/contact" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Contact</a>
            </div>
          </div>

          <div className="rounded-3xl p-4" style={{ background: isDarkMode ? '#10131d' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}>
            <h3 className="font-semibold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              Support
            </h3>
            <div className="space-y-2">
              <a href="/terms" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Terms &amp; Conditions</a>
              <a href="/privacy-policy" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Privacy Policy</a>
              <a href="/disclaimer" className="block" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Disclaimer</a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}>
          © 2026 Plynity Esports. All rights reserved.
        </p>
      </div>
    </footer>
  );
}