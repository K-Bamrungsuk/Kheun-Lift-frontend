import { formatDate } from "../../utils/formDate";
import { rankColors } from "../../constants/rankColor";

function LeaderboardCard({
  leaderboard,
  currentUserId,
  isLoading,
  error,
  onViewAll,
  onSelectLift,
}) {
  const leaderboards = Array.isArray(leaderboard)
    ? leaderboard
    : (leaderboard?.leaderboards ?? []);

  const topThree = leaderboards.slice(0, 3);
  const exerciseName = leaderboards[0]?.exercise?.name ?? "Unknown exercise";

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
      <div className="mb-5 flex items-end justify-between border-b border-zinc-800 pb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Leaderboard
          </p>

          <h2 className="mt-1 text-xl font-bold">{exerciseName}</h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="rounded-xl bg-yellow-400/10 px-3 py-2 text-xs font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black"
        >
          View all
        </button>
      </div>

      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : isLoading ? (
        <p className="text-sm text-zinc-500">Loading leaderboard...</p>
      ) : topThree.length === 0 ? (
        <p className="text-sm text-zinc-500">No leaderboard data.</p>
      ) : (
        <div className="space-y-3">
          {topThree.map((player, index) => {
            const position = index + 1;

            const isCurrentUser =
              player.userId === currentUserId ||
              player.user?.id === currentUserId;

            return (
              <button
                key={player.id}
                type="button"
                onClick={() =>
                  onSelectLift({
                    ...player,
                    rank: player.rank ?? position,
                  })
                }
                className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border border-zinc-800 bg-black p-4 text-left transition hover:border-zinc-500"
              >
                <div
                  className={`grid size-10 place-items-center rounded-xl font-black ${rankColors[index]}`}
                >
                  #{position}
                </div>

                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-sm font-bold">
                      {player.user?.username ?? "Unknown user"}
                    </p>

                    {isCurrentUser && (
                      <span className="shrink-0 rounded-full bg-yellow-400/15 px-2 py-0.5 text-[10px] font-black text-yellow-400">
                        YOU
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-500">
                    {formatDate(player.createdAt)}
                  </p>

                  <p className="mt-1 text-xs text-yellow-400">
                    Class: {player.weightClass?.name ?? "-"}
                  </p>
                </div>

                <strong className="whitespace-nowrap text-sm text-yellow-400">
                  {player.weight ?? "-"} kg
                </strong>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default LeaderboardCard;
