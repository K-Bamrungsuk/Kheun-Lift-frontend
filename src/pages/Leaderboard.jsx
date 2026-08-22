import { useNavigate } from "react-router-dom";

import LeaderboardHeader from "../components/leaderboard/LeaderBoardHeader";
import RankingByExercise from "../components/leaderboard/RankingByExercise";
import WeightClassList from "../components/leaderboard/WeightClassList";
import LiftDetailModal from "../components/LiftDetailModal";
import useLeaderboard from "../hooks/useLeaderboard";

function Leaderboard() {
  const navigate = useNavigate();

  const {
    user,
    gender,
    exercises,
    weightClasses,
    selectedWeightClass,
    rankings,
    expanded,
    selectedLift,
    isPageLoading,
    isWeightClassesLoading,
    isRankingsLoading,
    error,
    setSelectedLift,
    handleGenderChange,
    handleSelectWeightClass,
    handleBack,
    handleToggleExpanded,
  } = useLeaderboard();

  if (isPageLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <p className="text-sm text-zinc-500">Loading leaderboard...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <p className="text-sm text-red-400">
          {error || "Unable to load user data."}
        </p>
      </main>
    );
  }

  if (!user.gender) {
    return (
      <main className="mx-auto max-w-md px-4 pb-28 pt-10">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center">
          <h1 className="text-2xl font-black">Gender required</h1>

          <p className="mt-3 text-sm text-zinc-500">
            Add your gender in Profile before viewing weight-class leaderboards.
          </p>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="mt-6 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-black"
          >
            Go to Profile
          </button>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-8 md:pb-10 md:pt-10">
        {error && (
          <p className="mb-4 rounded-2xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {!selectedWeightClass ? (
          <WeightClassList
            gender={gender}
            weightClasses={weightClasses}
            userWeightClassId={user.weightClass?.id}
            isLoading={isWeightClassesLoading}
            onGenderChange={handleGenderChange}
            onSelect={handleSelectWeightClass}
          />
        ) : (
          <div className="space-y-4">
            <LeaderboardHeader
              gender={gender}
              weightClass={selectedWeightClass}
              onBack={handleBack}
            />

            {isRankingsLoading ? (
              <p className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-500">
                Loading rankings...
              </p>
            ) : (
              exercises.map((exercise) => (
                <RankingByExercise
                  key={exercise.id}
                  exercise={exercise}
                  records={rankings[exercise.id] ?? []}
                  currentUserId={user.id}
                  expanded={Boolean(expanded[exercise.id])}
                  onToggle={() => handleToggleExpanded(exercise.id)}
                  onSelectLift={setSelectedLift}
                />
              ))
            )}
          </div>
        )}
      </main>

      <LiftDetailModal
        key={selectedLift?.id ?? "empty"}
        lift={selectedLift}
        onClose={() => setSelectedLift(null)}
      />
    </>
  );
}

export default Leaderboard;
