import { AlertTriangle } from "lucide-react";

function DeleteConfirmModal({ isDeleting, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-60 grid place-items-center bg-black/80 p-4"
      onClick={onCancel}
    >
      <section
        className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 grid size-11 place-items-center rounded-full bg-red-500/10 text-red-400">
          <AlertTriangle size={22} />
        </div>

        <h2 className="text-lg font-bold">Delete lift record?</h2>

        <p className="mt-2 text-sm text-zinc-400">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-xl px-4 py-2 text-sm font-bold text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteConfirmModal;
