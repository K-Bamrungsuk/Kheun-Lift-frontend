import { useState } from "react";
import { Trash2, X } from "lucide-react";

import DeleteConfirmModal from "./DeleteComfirmModal";
import EditLiftDetail from "./EditLiftDetail";
import LiftVideo from "./LiftVideo";
import { apiDeleteLiftRecord } from "../api/mainApi";
import { useAuthStore } from "../stores/auth.store";

function LiftDetailModal({ lift, onClose, onDeleted }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const userId = useAuthStore((state) => state.user?.id);

  if (!lift) return null;

  const isOwner = lift.userId === userId || lift.user?.id === userId;

  const details = [lift.exercise?.name, lift.weightClass?.name].filter(Boolean);

  const hdlDelete = async () => {
    try {
      setIsDeleting(true);

      await apiDeleteLiftRecord(lift.id);

      onDeleted?.(lift.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message ?? "Unable to delete lift record.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-white shadow-2xl md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-5 flex items-start justify-between">
          <div>
            {lift.rank && (
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">
                Rank #{lift.rank}
              </p>
            )}

            <h2 className="mt-1 text-2xl font-black">
              {lift.user?.username ?? lift.exercise?.name ?? "Lift Details"}
            </h2>

            {details.length > 0 && (
              <p className="mt-1 text-sm text-zinc-500">
                {details.join(" · ")}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 place-items-center rounded-full bg-black text-zinc-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </header>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-black p-4">
            <p className="text-xs text-zinc-500">Weight</p>

            <p className="mt-1 text-xl font-black text-yellow-400">
              {lift.weight} kg
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-4">
            <p className="text-xs text-zinc-500">Repetitions</p>

            <p className="mt-1 text-xl font-black">{lift.reps}</p>
          </div>
        </div>

        <LiftVideo videoUrl={lift.videoUrl} />

        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-black p-5">
          <EditLiftDetail lift={lift} canEdit={isOwner} />

          {lift.status && (
            <div>
              <p className="text-xs text-zinc-500">Status</p>

              <p className="mt-1 text-sm font-bold capitalize text-green-400">
                {lift.status}
              </p>
            </div>
          )}

          {lift.createdAt && (
            <div>
              <p className="text-xs text-zinc-500">Submitted</p>

              <p className="mt-1 text-sm text-zinc-200">
                {new Date(lift.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>

        {isOwner && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={15} />
              Delete record
            </button>
          </div>
        )}
      </section>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={hdlDelete}
        />
      )}
    </div>
  );
}

export default LiftDetailModal;
