import { Pencil } from "lucide-react";

function ProfileHeader({ user, onEdit }) {
  const profileInitial = user?.username?.trim().charAt(0).toUpperCase() || "?";

  const birthDate = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB")
    : "-";

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-20 place-items-center rounded-full bg-yellow-400 text-2xl font-black text-black">
            {profileInitial}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Profile
            </p>

            <h1 className="text-xl font-black">{user?.username}</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit profile"
          className="rounded-xl border border-zinc-700 p-2 text-yellow-400"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm md:grid-cols-5">
        <ProfileDetail label="Gender" value={user?.gender} />

        <ProfileDetail label="Birthday" value={birthDate} />

        <ProfileDetail
          label="Height"
          value={user?.height != null ? `${user.height} cm` : "-"}
        />

        <ProfileDetail
          label="Weight"
          value={user?.bodyWeight != null ? `${user.bodyWeight} kg` : "-"}
        />

        <ProfileDetail label="Class" value={user?.weightClass?.name} />
      </div>
    </section>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div className="rounded-2xl bg-black p-3">
      <p className="text-xs text-zinc-500">{label}</p>

      <p className="mt-1 capitalize">{value || "-"}</p>
    </div>
  );
}

export default ProfileHeader;
