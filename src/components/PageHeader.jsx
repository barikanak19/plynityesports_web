/**
 * PageHeader — back button + title for inner pages
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PageHeader({ title }) {
  const navigate = useNavigate();
  const { isDarkMode } = useApp();

  return (
    <div
      className="flex items-center gap-3 px-4 py-4 sticky top-16 z-20"
      style={{
        background: isDarkMode ? '#0f1117' : '#f1f3f8',
        borderBottom: `1px solid ${isDarkMode ? '#2a2d3e' : '#e5e7eb'}`,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-xl transition-colors"
        style={{
          background: isDarkMode ? '#1a1d2e' : '#ffffff',
          color: isDarkMode ? '#9ca3af' : '#374151',
        }}
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-lg font-bold" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
        {title}
      </h1>
    </div>
  );
}