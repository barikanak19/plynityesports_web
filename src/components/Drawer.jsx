/**
 * Drawer — slide-in side menu matching the Flutter app drawer
 */
import { useNavigate } from 'react-router-dom';
import { X, Scale, Calendar, Trophy, Shield, FileText, AlertTriangle, Phone, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import appLogo from '../assets/images/applogo.jpeg';

const menuItems = [
  { icon: Scale, label: 'Rules', sub: 'Tournament guidelines', path: '/rules' },
  { icon: Calendar, label: 'Your Upcoming Matches', sub: 'Saved registrations & status', path: '/upcoming' },
  { icon: Trophy, label: 'Lucky Winner', sub: 'Win ₹500 monthly', path: '/lucky-winner' },
  { icon: Shield, label: 'Privacy Policy', sub: 'How your data is handled', path: '/privacy-policy' },
  { icon: FileText, label: 'Terms & Conditions', sub: 'Tournament rules and terms', path: '/terms' },
  { icon: AlertTriangle, label: 'Disclaimer', sub: 'Platform independence notice', path: '/disclaimer' },
  { icon: Phone, label: 'Contact', sub: 'Get in touch with us', path: '/contact' },
  { icon: Settings, label: 'Settings', sub: 'Theme & preferences', path: '/settings' },
];

const iconColors = ['#8b5cf6','#22c55e','#f59e0b','#3b82f6','#6366f1','#f59e0b','#22c55e','#6b7280'];

export default function Drawer() {
  const { isDrawerOpen, setIsDrawerOpen, isDarkMode } = useApp();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />

      {/* Panel */}
      <div
        className="fixed left-0 top-0 h-full z-50 flex flex-col"
        style={{
          width: 'min(280px, 100vw)',
          background: isDarkMode ? '#12151f' : '#ffffff',
          boxShadow: '4px 0 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}
        >
          <div className="flex items-center gap-3">
            <img
              src={appLogo}
              alt="Plynity Logo"
              className="w-10 h-10 rounded-2xl object-cover"
            />
            <div>
              <div className="font-bold text-base" style={{ color: isDarkMode ? '#fff' : '#111827' }}>
                Plynity Esports
              </div>
              <div className="text-xs" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
                Tournament platform for BGMI &amp; FF MAX
              </div>
            </div>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item, i) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
              style={{
                color: isDarkMode ? '#d1d5db' : '#374151',
                borderBottom: `1px solid ${isDarkMode ? '#1e2130' : '#f3f4f6'}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDarkMode ? '#1e2130' : '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: isDarkMode ? '#1e2130' : '#f3f4f6' }}
              >
                <item.icon size={18} color={iconColors[i]} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
                  {item.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
                  {item.sub}
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="p-4 text-center text-xs"
          style={{
            color: isDarkMode ? '#4b5563' : '#9ca3af',
            borderTop: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
          }}
        >
          v1.0.0 · Made for Gamers ❤️
        </div>
      </div>
    </>
  );
}