/**
 * AppContext — manages theme, notifications, and upcoming matches
 * Uses localStorage for persistence across sessions
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Theme ───────────────────────────────────────────────
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('plynity_theme');
    return saved !== null ? saved === 'dark' : true; // default dark
  });

  // ── Notifications ────────────────────────────────────────
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('plynity_notifications') !== 'false';
  });

  // ── Upcoming (registered) matches ───────────────────────
  const [upcomingMatches, setUpcomingMatches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('plynity_upcoming') || '[]');
    } catch {
      return [];
    }
  });

  // ── Drawer open state ────────────────────────────────────
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
    localStorage.setItem('plynity_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('plynity_notifications', notificationsEnabled);
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('plynity_upcoming', JSON.stringify(upcomingMatches));
  }, [upcomingMatches]);

  const toggleTheme = useCallback(() => setIsDarkMode((d) => !d), []);
  const toggleNotifications = useCallback(() => setNotificationsEnabled((n) => !n), []);

  /** Add a newly registered match to upcoming list */
  const addUpcomingMatch = useCallback((match) => {
    setUpcomingMatches((prev) => {
      const exists = prev.find((m) => m.id === match.id);
      if (exists) return prev;
      return [...prev, match];
    });
  }, []);

  /** Remove a match from upcoming list */
  const removeUpcomingMatch = useCallback((matchId) => {
    setUpcomingMatches((prev) => prev.filter((m) => m.id !== matchId));
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        notificationsEnabled,
        toggleNotifications,
        upcomingMatches,
        addUpcomingMatch,
        removeUpcomingMatch,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/** Hook to use app context */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}