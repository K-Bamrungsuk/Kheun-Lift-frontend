import { Trophy } from "lucide-react";
import { rankColors } from "../../utils/rankColor";

function RankingPreview({ leaderboard, isLoading, onRequireLogin }) {
  const topThree = leaderboard?.leaderboards?.slice(0, 3) ?? [];
  const firstRecord = topThree[0];

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="py-10 text-center text-sm text-zinc-500">
          Loading leaderboard...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-500">
            Top Lifters
          </p>

          <h2 className="mt-1 text-xl font-black">
            {firstRecord?.exercise?.name ?? "Leaderboard"}
          </h2>

          {firstRecord && (
            <p className="mt-1 text-xs text-zinc-500">
              {firstRecord.weightClass?.name} class
            </p>
          )}
        </div>

        <Trophy className="text-yellow-500" size={30} />
      </div>

      {topThree.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No verified lifts available.
        </p>
      ) : (
        <div className="space-y-3">
          {topThree.map((record, index) => (
            <button
              type="button"
              key={record.id}
              onClick={onRequireLogin}
              className="flex w-full items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-left transition hover:border-zinc-500"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl border font-black ${rankColors[index]}`}
              >
                #{index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">
                  {record.user?.username ?? "Unknown user"}
                </p>

                <p className="text-xs text-zinc-500">
                  {record.reps} {record.reps === 1 ? "rep" : "reps"}
                </p>
              </div>

              <strong className="whitespace-nowrap text-yellow-400">
                {record.weight} kg
              </strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RankingPreview;
