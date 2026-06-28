/**
 * FollowSection — YouTube + Instagram links
 */
import { ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import instaLogo from '../assets/images/instalogo.jpeg';
import ytLogo from '../assets/images/ytlogo.jpeg';

const socials = [
  {
    id: 'youtube',
    name: 'YouTube Channel',
    sub: 'Live streams & highlights',
    logo: ytLogo,
    href: 'https://youtube.com/@plynityesports',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    sub: 'Updates & announcements',
    logo: instaLogo,
    href: 'https://instagram.com/plynityesports',
  },
];

export default function FollowSection() {
  const { isDarkMode } = useApp();

  return (
    <section className="px-4 pt-6 pb-2">
      <h2 className="font-bold text-lg mb-1" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
        Follow &amp; Subscribe
      </h2>
      <p className="text-sm mb-4" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
        Stay updated with the latest tournaments
      </p>

      <div className="flex flex-col gap-4">
        <div className="rounded-3xl p-4" style={{ background: isDarkMode ? '#10131d' : '#ffffff', border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}` }}>
          <p className="text-sm mb-3 font-semibold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
            Follow us for updates
          </p>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-3xl p-3 transition-all card-hover"
                style={{
                  background: isDarkMode ? '#1a1d2e' : '#f8fafc',
                  border: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
                  minWidth: 'calc(50% - 0.75rem)',
                  textDecoration: 'none',
                }}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                  <img src={s.logo} alt={`${s.name} logo`} className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
                    {s.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
                    {s.sub}
                  </div>
                </div>
                <ExternalLink size={18} color={isDarkMode ? '#f97316' : '#f43f5e'} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}