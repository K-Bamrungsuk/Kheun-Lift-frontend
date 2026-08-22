import { ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

function LoginRequiredModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-yellow-500/10">
          <ShieldCheck className="text-yellow-500" size={25} />
        </div>

        <h2 className="mt-4 text-xl font-bold">Login Required</h2>

        <p className="mt-2 text-sm text-zinc-400">
          Please log in to access this feature.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-700 py-2.5 font-semibold text-zinc-300 hover:border-zinc-500"
          >
            Cancel
          </button>

          <Link
            to="/login"
            className="flex-1 rounded-lg bg-yellow-500 py-2.5 font-bold text-zinc-950 hover:bg-yellow-300"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;
