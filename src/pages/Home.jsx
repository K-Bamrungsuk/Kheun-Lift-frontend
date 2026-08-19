import React, { useEffect, useMemo, useState } from "react";
import { House, Trophy, Plus, Users, User, Dumbbell } from "lucide-react";

const classes = [
  {
    name: "Lorem Class A",
    ranks: [
      { rank: 1, name: "Lorem ipsum", total: "Lorem" },
      { rank: 2, name: "Lorem ipsum", total: "Lorem" },
      { rank: 3, name: "Lorem ipsum", total: "Lorem" },
    ],
  },
  {
    name: "Lorem Class B",
    ranks: [
      { rank: 1, name: "Lorem ipsum", total: "Lorem" },
      { rank: 2, name: "Lorem ipsum", total: "Lorem" },
      { rank: 3, name: "Lorem ipsum", total: "Lorem" },
    ],
  },
];

const navigation = [
  { name: "Home", icon: House, active: true },
  { name: "Rank", icon: Trophy },
  { name: "Social", icon: Users },
  { name: "Profile", icon: User },
];

function Actions({ desktop = false }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 ${
        desktop ? "hidden md:grid" : "md:hidden"
      }`}
    >
      <button className="rounded-2xl bg-yellow-400 py-4 font-black text-black">
        Submit Lift
      </button>

      <button className="rounded-2xl border border-zinc-800 bg-zinc-950 py-4 font-bold">
        Leaderboard
      </button>
    </div>
  );
}

function Home() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        setIsLoading(true);
        setError("");

        const [userResponse, liftsResponse] = await Promise.all([
          api.get("/users/me"),
          api.get("/lifts/me"),
        ]);

        if (!isMounted) return;

        // รองรับทั้ง response แบบส่ง object/array ตรง ๆ และแบบครอบด้วย data
        const userData = userResponse.data?.data ?? userResponse.data;
        const liftsData = liftsResponse.data?.data ?? liftsResponse.data;

        const liftRecords =
          liftsData?.liftRecords ?? liftsData?.lifts ?? liftsData;

        setUser(userData?.user ?? userData);
        setActivities(
          Array.isArray(liftRecords) ? liftRecords.slice(0, 3) : [],
        );
      } catch (requestError) {
        if (!isMounted) return;

        setError(
          requestError.response?.data?.message ?? "Unable to load your data.",
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const profileInitial = user?.username?.trim()?.charAt(0).toUpperCase() || "?";

  const leaderboard = useMemo(
    () => classes[Math.floor(Math.random() * classes.length)],
    [],
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop navbar */}
      <header className="hidden border-b border-zinc-800 bg-zinc-950 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2 font-black">
            <span className="rounded-xl bg-yellow-400 p-2 text-black">
              <Dumbbell size={22} />
            </span>

            <span>
              KHEUN <span className="text-yellow-400">LIFT</span>
            </span>
          </div>

          <nav className="flex items-center gap-2">
            {navigation.map(({ name, icon: Icon, active }) => (
              <button
                key={name}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
                  active
                    ? "bg-yellow-400 text-black"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}

            <button className="ml-2 flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-black">
              <Plus size={18} />
              Add Lift
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-4 px-4 pb-28 pt-6 md:max-w-6xl md:px-8 md:pb-10 md:pt-10">
        {/* Mobile header */}
        <header className="flex items-center justify-between md:hidden">
          <h1 className="text-3xl font-black">Home</h1>

          <span className="rounded-2xl bg-yellow-400 p-3 text-black">
            <Dumbbell size={22} />
          </span>
        </header>

        {/* Desktop title */}
        <div className="hidden md:block">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">
            Dashboard
          </p>
          <h1 className="text-4xl font-black">Home</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            {/* Profile */}
            <section className="flex items-center gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:flex-col md:items-start md:p-6">
              <div className="grid size-14 place-items-center rounded-full bg-yellow-400 font-black text-black md:size-20">
                {profileInitial}
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  User Profile
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  {isLoading ? "Loading..." : user?.username || "Unknown user"}
                </h2>

                <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                  {user?.gender && (
                    <span className="capitalize">{user.gender}</span>
                  )}
                  {user?.gender && user?.bodyWeight != null && <span>•</span>}
                  {user?.bodyWeight != null && (
                    <span>{user.bodyWeight} kg</span>
                  )}
                  {user?.email && (
                    <span className="text-yellow-400">{user.email}</span>
                  )}
                </div>
              </div>
            </section>

            {/* Recent activity */}
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
                <p className="border-t border-zinc-800 py-4 text-sm text-zinc-500">
                  Loading activities...
                </p>
              )}

              {!error && !isLoading && activities.length === 0 && (
                <p className="border-t border-zinc-800 py-4 text-sm text-zinc-500">
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
                        <p className="text-xs text-zinc-500">
                          {item.reps} reps
                          {item.performedAt
                            ? ` • ${new Date(item.performedAt).toLocaleDateString()}`
                            : ""}
                        </p>
                      </div>
                    </div>

                    <strong className="text-xs">{item.weight} kg</strong>
                  </div>
                ))}
            </section>
          </div>

          <div className="space-y-4">
            {/* Mobile actions */}
            <Actions />

            {/* Leaderboard */}
            <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
              <div className="mb-5 flex items-end justify-between border-b border-zinc-800 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Leaderboard
                  </p>

                  <h2 className="mt-1 text-xl font-bold">Top Rankings</h2>
                </div>

                <span className="rounded-xl bg-yellow-400/10 px-3 py-2 text-xs font-bold text-yellow-400">
                  {leaderboard.name}
                </span>
              </div>

              <div className="space-y-3">
                {leaderboard.ranks.map((player) => (
                  <div
                    key={player.rank}
                    className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border border-zinc-800 bg-black p-4"
                  >
                    <div
                      className={`grid size-10 place-items-center rounded-xl font-black ${
                        player.rank === 1
                          ? "bg-yellow-400 text-black"
                          : "bg-zinc-900 text-zinc-400"
                      }`}
                    >
                      #{player.rank}
                    </div>

                    <div>
                      <p className="text-sm font-bold">{player.name}</p>
                      <p className="text-xs text-zinc-500">
                        {leaderboard.name}
                      </p>
                    </div>

                    <strong className="text-sm text-yellow-400">
                      {player.total} kg
                    </strong>
                  </div>
                ))}
              </div>
            </section>

            {/* Desktop actions */}
            <Actions desktop />
          </div>
        </div>
      </main>

      {/* Mobile navbar */}
      <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl border border-zinc-800 bg-zinc-950/95 px-3 py-3 shadow-2xl backdrop-blur md:hidden">
        <button className="text-yellow-400">
          <House size={22} />
        </button>

        <button className="text-zinc-500">
          <Trophy size={22} />
        </button>

        <button className="-mt-9 grid size-14 place-items-center rounded-full border-4 border-black bg-yellow-400 text-black">
          <Plus size={28} />
        </button>

        <button className="text-zinc-500">
          <Users size={22} />
        </button>

        <button className="text-zinc-500">
          <User size={22} />
        </button>
      </nav>
    </div>
  );
}

export default Home;
