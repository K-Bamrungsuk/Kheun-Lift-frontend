import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HomeActions from "../components/home/HomeActions";
import HomeHeader from "../components/home/HomeHeader";
import LeaderboardCard from "../components/home/LeaderboardCard";
import ProfileCard from "../components/home/ProfileCard";
import RecentActivity from "../components/home/RecentActivity";
import SubmitLiftCard from "../components/home/SubmitLiftCard";
import { useHomeStore } from "../stores/home.store";

function Home() {
  const navigate = useNavigate();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const { user, activities, leaderboard, isLoading, error, fetchHomeData } =
    useHomeStore();

  useEffect(() => {
    fetchHomeData();

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") fetchHomeData();
    };

    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () =>
      document.removeEventListener("visibilitychange", refreshWhenVisible);
  }, [fetchHomeData]);

  const goToLeaderboard = () => navigate("/leaderboard");

  const handleNavbarNavigate = (name) => {
    if (name === "Add Lift") setIsSubmitOpen(true);
    if (name === "Rank") goToLeaderboard();
  };

  const handleLiftCreated = async () => {
    await fetchHomeData();
    setIsSubmitOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar activePage="Home" onNavigate={handleNavbarNavigate} />

      <main className="mx-auto max-w-md space-y-4 px-4 pb-28 pt-6 md:max-w-6xl md:px-8 md:pb-10 md:pt-10">
        <HomeHeader />

        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <ProfileCard user={user} isLoading={isLoading} />

            <RecentActivity
              activities={activities}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="space-y-4">
            <HomeActions
              onSubmitLift={() => setIsSubmitOpen(true)}
              onLeaderboard={goToLeaderboard}
            />

            {Array.isArray(leaderboard) && leaderboard.length > 0 && (
              <LeaderboardCard
                leaderboard={leaderboard}
                isLoading={isLoading}
                error={error}
                onViewAll={goToLeaderboard}
              />
            )}

            <HomeActions
              desktop
              onSubmitLift={() => setIsSubmitOpen(true)}
              onLeaderboard={goToLeaderboard}
            />
          </div>
        </div>
      </main>

      {isSubmitOpen && (
        <SubmitLiftCard
          onClose={() => setIsSubmitOpen(false)}
          onSuccess={handleLiftCreated}
        />
      )}
    </div>
  );
}

export default Home;
