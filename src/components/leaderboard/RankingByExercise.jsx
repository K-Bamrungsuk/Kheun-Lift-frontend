import RankingRow from "./RankingRow";

function RankingByExercise({
  exercise,
  records = [],
  currentUserId,
  expanded,
  onToggle,
  onSelectLift,
}) {
  const visibleRecords = expanded ? records : records.slice(0, 10);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            {records.length} lifters
          </p>

          <h2 className="mt-1 text-xl font-black">{exercise.name}</h2>
        </div>

        {records.length > 10 && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-xl bg-yellow-400/10 px-3 py-2 text-xs font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            {expanded ? "Show less" : "View all"}
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No verified lifts in this division.
        </p>
      ) : (
        <div className="space-y-3">
          {visibleRecords.map((record) => (
            <RankingRow
              key={record.id}
              record={record}
              currentUserId={currentUserId}
              onClick={() => onSelectLift(record)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RankingByExercise;
