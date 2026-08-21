import { formatDate } from "../../utils/formDate";
import { statusColors, statusLabels } from "../../utils/statusVerifying";

function ProfileActivity({ records = [] }) {
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
            <div
              key={record.id}
              className="flex items-center justify-between border-t border-zinc-800 py-4"
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

              <strong className="whitespace-nowrap text-xs">
                {record.weight} kg
              </strong>
            </div>
          );
        })
      )}
    </section>
  );
}

export default ProfileActivity;
