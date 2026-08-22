import { Pencil, X } from "lucide-react";

function EditUserCard({ user, onClose, onSave, isSaving, error }) {
  const birthDate = user?.dateOfBirth?.slice(0, 10) || "";

  const today = new Date().toLocaleDateString("sv-SE");

  const inputClass =
    "w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-yellow-400";

  const hdlSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const success = await onSave({
      username: formData.get("username"),
      gender: formData.get("gender"),
      dateOfBirth: formData.get("dateOfBirth"),
      height: Number(formData.get("height")),
      bodyWeight: Number(formData.get("bodyWeight")),
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 px-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-user-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl md:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-yellow-400 p-3 text-black">
              <Pencil size={22} />
            </span>

            <div>
              <p className="text-xs uppercase tracking-widest text-yellow-400">
                Profile
              </p>

              <h2 id="edit-user-title" className="text-xl font-black">
                Edit User
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close"
            className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={hdlSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Username</span>

            <input
              name="username"
              defaultValue={user?.username}
              required
              maxLength="20"
              className={inputClass}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label>
              <span className="mb-2 block text-sm font-bold">Gender</span>

              <select
                name="gender"
                defaultValue={user?.gender || ""}
                required
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>
                  Select gender
                </option>

                <option value="male">Male</option>

                <option value="female">Female</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">Birthday</span>

              <input
                type="date"
                name="dateOfBirth"
                defaultValue={birthDate}
                min="1900-01-01"
                max={today}
                required
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label>
              <span className="mb-2 block text-sm font-bold">Height (cm)</span>

              <input
                type="number"
                name="height"
                min="1"
                max="999"
                step="0.1"
                defaultValue={user?.height}
                required
                className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">Weight (kg)</span>

              <input
                type="number"
                name="bodyWeight"
                min="1"
                max="999"
                step="0.1"
                defaultValue={user?.bodyWeight}
                required
                className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
            </label>
          </div>

          {error && (
            <p className="rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 rounded-2xl border border-zinc-700 py-3 font-bold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-2xl bg-yellow-400 py-3 font-black text-black disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Confirm"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditUserCard;
