import { Weight, Trophy, UserRound } from "lucide-react";

function ProfileCard({ user, isLoading }) {
  const profileInitial = user?.username?.trim()?.charAt(0).toUpperCase() || "?";

  const profileDetails = [
    {
      label: "Gender",
      value: user?.gender,
      icon: UserRound,
      capitalize: true,
    },
    {
      label: "Body weight",
      value: user?.bodyWeight != null ? `${user.bodyWeight} kg` : null,
      icon: Weight,
    },
    {
      label: "Weight class",
      value: user?.weightClass?.name,
      icon: Trophy,
      highlight: true,
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-4 p-5 md:p-6">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-yellow-400 text-xl font-black text-black shadow-lg shadow-yellow-400/10 md:size-16">
          {profileInitial}
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Profile
          </p>

          <h2 className="mt-1 truncate text-xl font-black">
            {isLoading ? "Loading..." : user?.username || "Unknown user"}
          </h2>

          {user?.email && (
            <p className="mt-0.5 truncate text-sm text-zinc-500">
              {user.email}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-black/30 px-5 md:px-6">
        {profileDetails.map(
          ({ label, value, icon: Icon, capitalize, highlight }) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-zinc-800 py-4 last:border-b-0"
            >
              <div
                className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                  highlight
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "bg-zinc-900 text-zinc-500"
                }`}
              >
                <Icon size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">{label}</p>

                <p
                  className={`mt-0.5 truncate text-sm font-bold ${
                    capitalize ? "capitalize" : ""
                  } ${highlight ? "text-yellow-400" : "text-zinc-200"}`}
                >
                  {value || "Not provided"}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export default ProfileCard;
