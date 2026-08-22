import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRandomLeaderboard } from "../api/mainApi";
import HowItWorks from "../components/public/HowItWorks";
import LoginRequiredModal from "../components/public/LoginRequiredModal";
import PublicHero from "../components/public/PublicHero";

function Public() {
  const [leaderboard, setLeaderboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiRandomLeaderboard();
        setLeaderboard(response.data.data);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="text-xl font-black tracking-widest sm:text-2xl"
          >
            KHEUN <span className="text-yellow-500">LIFT</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-white"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-yellow-300"
            >
              Join Now
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <PublicHero
          leaderboard={leaderboard}
          isLoading={isLoading}
          onRequireLogin={() => setShowLoginModal(true)}
        />

        <HowItWorks />
      </main>

      <footer className="border-t border-zinc-800 px-5 py-6 text-center text-sm text-zinc-600">
        © 2026 Kheun Lift. Build your strength. Prove your rank.
      </footer>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default Public;
