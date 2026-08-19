function ProfileCard({ user, isLoading }) {
  const profileInitial = user?.username?.trim()?.charAt(0).toUpperCase() || "?";

  return (
    <section className="flex items-center gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:flex-col md:items-start md:p-6">
      <div className="grid size-14 place-items-center rounded-full bg-yellow-400 font-black text-black md:size-20">
        {profileInitial}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          Profile
        </p>

        <h2 className="mt-1 text-lg font-bold">
          {isLoading ? "Loading..." : user?.username || "Unknown user"}
        </h2>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
          {user?.gender && <span className="capitalize">{user.gender}</span>}
          {user?.gender && user?.bodyWeight != null}
          {user?.bodyWeight != null && <span>{user.bodyWeight} kg</span>}
          {user?.email && (
            <span className="text-yellow-400">{user.email}</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;