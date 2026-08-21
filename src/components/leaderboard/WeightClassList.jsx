function WeightClassList({
  gender,
  weightClasses,
  userWeightClassId,
  isLoading,
  onGenderChange,
  onSelect,
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">
          Leaderboards
        </p>

        <h1 className="mt-2 text-2xl font-black md:text-3xl">
          Choose Weight Class
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Select a division to view Bench Press, Squat and Deadlift rankings.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-2xl bg-black p-1">
        {["male", "female"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onGenderChange(option)}
            className={`rounded-xl px-4 py-3 text-sm font-bold capitalize transition ${
              gender === option
                ? "bg-yellow-400 text-black"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-zinc-500">Loading weight classes...</p>
      ) : weightClasses.length === 0 ? (
        <p className="text-sm text-zinc-500">No weight classes available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {weightClasses.map((weightClass) => {
            const isUserClass =
              weightClass.id === userWeightClassId &&
              weightClass.gender === gender;

            return (
              <button
                key={weightClass.id}
                type="button"
                onClick={() => onSelect(weightClass)}
                className="relative rounded-2xl border border-zinc-800 bg-black px-4 py-6 text-left transition hover:border-yellow-400 hover:bg-yellow-400/5"
              >
                {isUserClass && (
                  <span className="absolute right-2 bottom-2 rounded-full bg-yellow-400 px-2 py-1 text-[10px] font-black text-black">
                    Your class
                  </span>
                )}

                <p className="text-xl font-black text-white">
                  {weightClass.name}
                </p>

                <p className="mt-1 text-xs capitalize text-zinc-500">
                  {weightClass.gender}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default WeightClassList;
