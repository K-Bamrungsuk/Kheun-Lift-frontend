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

  const [isSubmitOpen, setIsSubmitOpen] =
    useState(false);

  const {
    user,
    activities,
    leaderboard,
    isLoading,
    error,
    fetchHomeData,
  } = useHomeStore();

  const hasLeaderboard =
    Array.isArray(leaderboard) &&
    leaderboard.length > 0;

  useEffect(() => {
    // โหลดเมื่อเปิดหน้า Home ครั้งแรก
    fetchHomeData();

    // โหลดใหม่เมื่อกลับมาที่ tab หน้าเว็บ
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchHomeData();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [fetchHomeData]);

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  const openSubmitLift = () => {
    setIsSubmitOpen(true);
  };

  const closeSubmitLift = () => {
    setIsSubmitOpen(false);
  };

  const handleNavbarNavigate = (name) => {
    if (name === "Add Lift") {
      openSubmitLift();
      return;
    }

    if (name === "Rank") {
      goToLeaderboard();
    }
  };

  const handleLiftCreated = async () => {
    // โหลด Recent Activity หลังสร้าง Lift สำเร็จ
    await fetchHomeData();

    closeSubmitLift();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        activePage="Home"
        onNavigate={handleNavbarNavigate}
      />

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
              onSubmitLift={openSubmitLift}
              onLeaderboard={goToLeaderboard}
            />

            {/* แสดงเฉพาะเมื่อมี Leaderboard */}
            {hasLeaderboard && (
              <LeaderboardCard
                leaderboard={leaderboard}
                isLoading={isLoading}
                error={error}
                onViewAll={goToLeaderboard}
              />
            )}

            {/* Desktop actions */}
            <HomeActions
              desktop
              onSubmitLift={openSubmitLift}
              onLeaderboard={goToLeaderboard}
            />
          </div>
        </div>
      </main>

      {/* Submit Lift modal */}
      {isSubmitOpen && (
        <SubmitLiftCard
          onClose={closeSubmitLift}
          onSuccess={handleLiftCreated}
        />
      )}
    </div>
  );
}

export default Home;