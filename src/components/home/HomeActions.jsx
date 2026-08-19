function HomeActions({ desktop = false }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 ${
        desktop ? "hidden md:grid" : "md:hidden"
      }`}
    >
      <button className="rounded-2xl bg-yellow-400 py-4 font-black text-black hover:bg-amber-100">
        Submit Lift
      </button>

      <button className="rounded-2xl border border-zinc-800 bg-zinc-950 py-4 font-bold hover:border-gray-400">
        Leaderboard
      </button>
    </div>
  );
}

export default HomeActions;
