/**
 * CommunitySection — join WhatsApp/Telegram/Broadcast + contact info
 */
import { Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import appLogo from '../assets/images/applogo.jpeg';

export default function CommunitySection() {
  const { isDarkMode } = useApp();

  return (
    <section className="px-4 pt-6 pb-4">
      <h2 className="font-bold text-lg mb-1" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
        Join Our Community
      </h2>
      <p className="text-sm mb-4" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
        Get match updates and room codes instantly
      </p>

      {/* Community buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <a
          href="https://chat.whatsapp.com/plynity"
          target="_blank"
          rel="noopener noreferrer"
          className="community-btn-whatsapp px-4 py-2 rounded-full text-sm font-semibold"
        >
          WhatsApp
        </a>
        <a
          href="https://t.me/plynityesports"
          target="_blank"
          rel="noopener noreferrer"
          className="community-btn-telegram px-4 py-2 rounded-full text-sm font-semibold"
        >
          Telegram
        </a>
        <button className="community-btn-broadcast px-4 py-2 rounded-full text-sm font-semibold">
          Broadcast
        </button>
      </div>

      {/* Tournament Admin card */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: isDarkMode ? '#1a1d2e' : '#ffffff',
          border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
<div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
          <img src={appLogo} alt="Plynity Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-base" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
              Tournament Admin
            </div>
            <div className="text-sm" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              Plynity Esports
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Mail size={16} color="#6366f1" />
            <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>
              plynitysupport@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">📸</span>
            <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>
              Updates shared on Instagram Stories
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">▶️</span>
            <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>
              Matches streamed live on YouTube
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}