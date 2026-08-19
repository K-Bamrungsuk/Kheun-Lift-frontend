import { formatDate } from "../../utils/formDate";

function RecentActivity({ activities, isLoading, error }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-3 flex justify-between">
        <h2 className="font-bold">Recent Activity</h2>
        <button className="text-xs text-yellow-400">View all</button>
      </div>

      {error && (
        <p className="border-t border-zinc-800 py-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {!error && isLoading && (
        <p className="border-t border-zinc-800 py-4 text-sm text-zinc-400">
          Loading activities...
        </p>
      )}

      {!error && !isLoading && activities.length === 0 && (
        <p className="border-t border-zinc-800 py-4 text-sm text-zinc-400">
          No lift records yet.
        </p>
      )}

      {!error &&
        activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-t border-zinc-800 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-yellow-400" />

              <div>
                <p className="text-sm font-bold">
                  {item.exercise?.name || "Lift"}
                </p>
                <p className="text-xs text-zinc-400">
                  {item.reps} reps • {formatDate(item.createdAt)}
                </p>
              </div>
            </div>

            <strong className="text-xs">{item.weight} kg</strong>
          </div>
        ))}
    </section>
  );
}

export default RecentActivity;
