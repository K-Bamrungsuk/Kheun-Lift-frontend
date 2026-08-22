import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RankingPreview from "./RankingPreview";

function PublicHero({ leaderboard, isLoading, onRequireLogin }) {
  return (
    <section className="relative">
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-500">
            Strength deserves recognition
          </p>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            PROVE YOUR STRENGTH.
            <span className="block text-yellow-500">CLAIM YOUR RANK.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-zinc-400 sm:text-lg lg:mx-0">
            Track your personal records, submit verified lifts, and compete with
            lifters in your own weight class.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-zinc-950 transition hover:bg-yellow-300"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              onClick={onRequireLogin}
              className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-zinc-200 transition hover:border-yellow-500 hover:text-yellow-500"
            >
              View Leaderboards
            </button>
          </div>
        </div>

        <RankingPreview
          leaderboard={leaderboard}
          isLoading={isLoading}
          onRequireLogin={onRequireLogin}
        />
      </div>
    </section>
  );
}

export default PublicHero;
