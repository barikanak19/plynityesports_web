/**
 * App.jsx — Root with React Router v7, lazy loading, AppProvider
 */
import'./App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

const HomePage          = lazy(() => import('./pages/HomePage'));
const TournamentPage    = lazy(() => import('./pages/TournamentsPage'));
const RegisterPage      = lazy(() => import('./pages/RegisterPage'));
const UpcomingPage      = lazy(() => import('./pages/UpcomingPage'));
const LuckyWinnerPage   = lazy(() => import('./pages/LuckyWinnerPage'));
const RulesPage         = lazy(() => import('./pages/RulesPage'));
const SettingsPage      = lazy(() => import('./pages/SettingsPage'));
const ContactPage       = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() =>
  import('./pages/InfoPages').then(m => ({ default: m.PrivacyPolicyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/InfoPages').then(m => ({ default: m.TermsPage }))
);
const DisclaimerPage = lazy(() =>
  import('./pages/InfoPages').then(m => ({ default: m.DisclaimerPage }))
);

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0f1117',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '4px solid #f97316', borderTopColor: 'transparent',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Register page: full-screen, no Navbar/Drawer */}
            <Route path="/register/:matchId" element={<RegisterPage />} />

            {/* All other pages wrapped in Navbar + Drawer layout */}
            <Route element={<Layout />}>
              <Route path="/"                element={<HomePage />} />
              <Route path="/tournaments/:gameId" element={<TournamentPage />} />
              <Route path="/upcoming"        element={<UpcomingPage />} />
              <Route path="/lucky-winner"    element={<LuckyWinnerPage />} />
              <Route path="/rules"           element={<RulesPage />} />
              <Route path="/settings"        element={<SettingsPage />} />
              <Route path="/contact"         element={<ContactPage />} />
              <Route path="/privacy-policy"  element={<PrivacyPolicyPage />} />
              <Route path="/terms"           element={<TermsPage />} />
              <Route path="/disclaimer"      element={<DisclaimerPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}