import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import HomeActions from "../components/home/HomeActions";
import HomeHeader from "../components/home/HomeHeader";
import LeaderboardCard from "../components/home/LeaderBoardCard";
import ProfileCard from "../components/home/ProfileCard";
import RecentActivity from "../components/home/RecentActivity";
import LiftDetailModal from "../components/LiftDetailModal";
import { useHomeStore } from "../stores/home.store";

function Home() {
  const navigate = useNavigate();
  const { refreshKey, openSubmitLift } = useOutletContext();

  const [selectedLift, setSelectedLift] = useState(null);

  const { user, activities, leaderboard, isLoading, error, fetchHomeData } =
    useHomeStore();

  useEffect(() => {
    fetchHomeData();

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        fetchHomeData();
      }
    };

    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () =>
      document.removeEventListener("visibilitychange", refreshWhenVisible);
  }, [fetchHomeData, refreshKey]);

  const goToLeaderboard = () => navigate("/leaderboard");

  return (
    <>
      <main className="mx-auto max-w-md space-y-4 px-4 pb-28 pt-6 md:max-w-6xl md:px-8 md:pb-10 md:pt-10">
        <HomeHeader />

        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <ProfileCard user={user} isLoading={isLoading} />

            <RecentActivity
              activities={activities}
              isLoading={isLoading}
              error={error}
              onViewAll={() => navigate("/profile")}
              onSelectLift={setSelectedLift}
            />
          </div>

          <div className="space-y-4">
            <HomeActions
              onSubmitLift={openSubmitLift}
              onLeaderboard={goToLeaderboard}
            />

            {Array.isArray(leaderboard) && leaderboard.length > 0 && (
              <LeaderboardCard
                leaderboard={leaderboard}
                currentUserId={user?.id}
                isLoading={isLoading}
                error={error}
                onViewAll={goToLeaderboard}
                onSelectLift={setSelectedLift}
              />
            )}

            <HomeActions
              desktop
              onSubmitLift={openSubmitLift}
              onLeaderboard={goToLeaderboard}
            />
          </div>
        </div>
      </main>

      <LiftDetailModal
        key={selectedLift?.id ?? "empty"}
        lift={selectedLift}
        onClose={() => setSelectedLift(null)}
      />
    </>
  );
}

export default Home;
