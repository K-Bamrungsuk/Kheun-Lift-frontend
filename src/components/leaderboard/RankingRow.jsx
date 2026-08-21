import { rankColors } from "../../utils/rankColor";

const defaultRankColor = "border-zinc-800 bg-zinc-900 text-zinc-400";

function RankingRow({ record, onClick }) {
  const rankColor = rankColors[record.rank - 1] ?? defaultRankColor;

  return (
    <button
      type="button"
      onClick={onClick}
      className="grid w-full grid-cols-[46px_1fr_auto] items-center gap-3 rounded-2xl border border-zinc-800 bg-black p-4 text-left transition hover:border-yellow-400/60"
    >
      <div
        className={`grid size-11 place-items-center rounded-xl border font-black ${rankColor}`}
      >
        #{record.rank}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-white">
          {record.user?.username ?? "Unknown user"}
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          Body weight: {record.user?.bodyWeight ?? "-"} kg
        </p>
      </div>

      <div className="text-right">
        <p className="font-black text-yellow-400">{record.weight} kg</p>

        <p className="text-xs text-zinc-500">
          {record.reps} {record.reps === 1 ? "rep" : "reps"}
        </p>
      </div>
    </button>
  );
}

export default RankingRow;
