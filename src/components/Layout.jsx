/**
 * Layout — wraps all pages with Navbar + Drawer
 */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Drawer from './Drawer';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const { isDarkMode } = useApp();

  return (
    <div
      className="min-h-screen"
      style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}
    >
      <Navbar />
      <Drawer />
      <main>
        <Outlet />
      </main>
    </div>
  );
}