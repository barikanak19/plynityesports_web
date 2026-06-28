/**
 * HomePage — assembles all home sections
 */
import FollowSection from '../components/FollowSection';
import GameCards from '../components/GameCards';
import LuckyWinnerBanner from '../components/LuckyWinnerBanner';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <FollowSection />
      <GameCards />
      <LuckyWinnerBanner />
      <CommunitySection />
      <Footer />
    </div>
  );
}