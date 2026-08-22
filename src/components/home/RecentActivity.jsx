import { formatDate } from "../../utils/formDate";
import { statusColors, statusLabels } from "../../constants/statusVerifying";

function RecentActivity({
  activities = [],
  isLoading,
  error,
  onViewAll,
  onSelectLift,
}) {
  const message =
    error ||
    (isLoading
      ? "Loading activities..."
      : activities.length === 0
        ? "No lift records yet."
        : "");

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-3 flex justify-between">
        <h2 className="font-bold">Recent Activity</h2>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm text-zinc-400 hover:text-yellow-400"
        >
          View all
        </button>
      </div>

      {message ? (
        <p
          className={`py-4 text-sm ${error ? "text-red-400" : "text-zinc-400"}`}
        >
          {message}
        </p>
      ) : (
        <div className="space-y-3">
          {activities.map((item) => {
            const status = item.status ?? "pending";
            const statusLabel = statusLabels[status] ?? status;
            const statusColor = statusColors[status] ?? "bg-zinc-500";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectLift(item)}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-black p-4 text-left transition-colors duration-200 hover:border-zinc-500"
              >
                <div className="flex items-center gap-3">
                  <span
                    title={statusLabel}
                    aria-label={`Status: ${statusLabel}`}
                    className={`size-2 shrink-0 rounded-full ${statusColor}`}
                  />

                  <div>
                    <p className="text-sm font-bold">
                      {item.exercise?.name ?? "Lift"}
                    </p>

                    <p className="text-xs text-zinc-400">
                      {item.reps} reps • {formatDate(item.createdAt)}
                    </p>

                    <p className="mt-1 text-[11px] capitalize text-zinc-500">
                      {statusLabel}
                    </p>
                  </div>
                </div>

                <strong className="whitespace-nowrap text-xs">
                  {item.weight} kg
                </strong>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecentActivity;
