import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HomeActions from "../components/home/HomeActions";
import HomeHeader from "../components/home/HomeHeader";
import LeaderboardCard from "../components/home/LeaderBoardCard";
import ProfileCard from "../components/home/ProfileCard";
import RecentActivity from "../components/home/RecentActivity";
import { useHomeStore } from "../stores/home.store";

const DEFAULT_EXERCISE_ID = 1;
const DEFAULT_WEIGHT_CLASS_ID = 4;

function Home() {
  const navigate = useNavigate();

  const {
    user,
    activities,
    leaderboard,
    isLoading,
    error,
    fetchHomeData,
  } = useHomeStore();

  useEffect(() => {
    fetchHomeData({
      exerciseId: DEFAULT_EXERCISE_ID,
      weightClassId: DEFAULT_WEIGHT_CLASS_ID,
    });
  }, [fetchHomeData]);

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  const goToSubmitLift = () => {
    navigate("/submit-lift");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar activePage="Home" />

      <main className="mx-auto max-w-md space-y-4 px-4 pb-28 pt-6 md:max-w-6xl md:px-8 md:pb-10 md:pt-10">
        <HomeHeader />

        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <ProfileCard
              user={user}
              isLoading={isLoading}
            />

            <RecentActivity
              activities={activities}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="space-y-4">
            {/* Mobile actions */}
            <HomeActions
              onSubmitLift={goToSubmitLift}
              onLeaderboard={goToLeaderboard}
            />

            <LeaderboardCard
              leaderboard={leaderboard}
              isLoading={isLoading}
              error={error}
              onViewAll={goToLeaderboard}
            />

            {/* Desktop actions */}
            <HomeActions
              desktop
              onSubmitLift={goToSubmitLift}
              onLeaderboard={goToLeaderboard}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;