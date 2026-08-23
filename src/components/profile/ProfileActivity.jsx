import { formatDate } from "../../utils/formDate";
import { statusColors, statusLabels } from "../../constants/statusVerifying";

function ProfileActivity({ records = [], onSelectLift }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="mb-3 font-bold">All Activity</h2>

      {records.length === 0 ? (
        <p className="border-t border-zinc-800 py-4 text-sm text-zinc-400">
          No lift records yet.
        </p>
      ) : (
        records.map((record) => {
          const status = record.status ?? "pending";

          return (
            <button
              key={record.id}
              type="button"
              onClick={() => onSelectLift(record)}
              className="flex w-full items-center justify-between border-t border-b border-zinc-800 py-4 text-left transition hover:border-zinc-500"
            >
              <div className="flex items-center gap-3">
                <span
                  title={statusLabels[status]}
                  className={`size-2 shrink-0 rounded-full ${
                    statusColors[status] ?? "bg-zinc-500"
                  }`}
                />

                <div>
                  <p className="text-sm font-bold">
                    {record.exercise?.name ?? "Lift"}
                  </p>

                  <p className="text-xs text-zinc-400">
                    {record.reps} reps • {formatDate(record.createdAt)}
                  </p>

                  <p className="mt-1 text-[11px] capitalize text-zinc-500">
                    {statusLabels[status] ?? status}
                  </p>
                </div>
              </div>

              <strong className="whitespace-nowrap text-sm text-yellow-400">
                {record.weight} kg
              </strong>
            </button>
          );
        })
      )}
    </section>
  );
}

export default ProfileActivity;
