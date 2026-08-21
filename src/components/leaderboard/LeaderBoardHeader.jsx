import { ArrowLeft } from "lucide-react";

function LeaderboardHeader({ gender, weightClass, onBack }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-yellow-400"
      >
        <ArrowLeft size={18} />
        Back to weight classes
      </button>

      <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">
        {gender} division
      </p>

      <h1 className="mt-2 text-3xl font-black">{weightClass.name}</h1>

      <p className="mt-2 text-sm text-zinc-500">
        Bench Press, Squat and Deadlift rankings
      </p>
    </section>
  );
}

export default LeaderboardHeader;
