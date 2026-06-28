/**
 * Privacy Policy, Terms & Conditions, Disclaimer — simple info pages
 */
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';

function InfoPage({ title, intro, accentColor, sections }) {
  const { isDarkMode } = useApp();

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen" style={{ background: isDarkMode ? '#0f1117' : '#f1f3f8' }}>
      <PageHeader title={title} />
      <div className="px-4 py-6">
        <p className="text-sm mb-6 leading-relaxed" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>
          {intro}
        </p>
        {sections.map((sec) => (
          <div key={sec.heading} className="mb-6">
            <h3 className="font-bold mb-3" style={{ color: accentColor }}>
              {sec.heading}
            </h3>
            <div className="flex flex-col gap-3">
              {sec.points.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: accentColor }} />
                  <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#374151' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="We collect only the tournament details required to register and communicate with players."
      accentColor="#8b5cf6"
      sections={[
        {
          heading: 'Key Points',
          points: [
            'Collects player name, mobile number, email and optional Instagram ID.',
            'Data is used for tournament registration, match communication and payment verification.',
            'Payment is handled securely via Razorpay/UPI.',
            'Player data is not sold to third parties.',
          ],
        },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <InfoPage
      title="Terms & Conditions"
      intro="By joining, players accept tournament rules, payout timing, and admin decisions."
      accentColor="#6366f1"
      sections={[
        {
          heading: 'Key Points',
          points: [
            'Prize pool may decrease if registrations are low.',
            'Entry fees are non-refundable after room creation.',
            'Hacking, cheating, or teaming may result in a permanent ban.',
            'Winners may receive payment within 4–5 hours.',
            'Admin decisions are final.',
          ],
        },
      ]}
    />
  );
}

export function DisclaimerPage() {
  return (
    <InfoPage
      title="Disclaimer"
      intro="Plynity is an independent esports platform and not affiliated with the original game publishers."
      accentColor="#f59e0b"
      sections={[
        {
          heading: 'Key Points',
          points: [
            'Plynity is an independent esports platform.',
            'Not affiliated with BGMI, Krafton, Garena, or Free Fire.',
            'All trademarks belong to their respective owners.',
          ],
        },
      ]}
    />
  );
}