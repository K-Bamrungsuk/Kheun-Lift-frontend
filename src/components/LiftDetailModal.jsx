import { useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";

import EditLiftDetail from "./EditLiftDetail";
import { useAuthStore } from "../stores/auth.store";
import {
  getYoutubeEmbedUrl,
  getYoutubeId,
  getYoutubeThumbnail,
} from "../utils/youtube";

function LiftDetailModal({ lift, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const userId = useAuthStore((state) => state.user?.id);

  if (!lift) return null;

  const isOwner = lift.userId === userId || lift.user?.id === userId;

  const youtubeId = getYoutubeId(lift.videoUrl);
  const thumbnailUrl = getYoutubeThumbnail(youtubeId);
  const embedUrl = getYoutubeEmbedUrl(youtubeId);

  const details = [lift.exercise?.name, lift.weightClass?.name].filter(Boolean);

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

        {youtubeId && !isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative mb-5 block aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black"
          >
            <img
              src={thumbnailUrl}
              alt="Lift video thumbnail"
              className="size-full object-cover opacity-70 transition group-hover:scale-105 group-hover:opacity-90"
            />

            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-yellow-400 text-black">
                <Play size={28} fill="currentColor" />
              </span>
            </span>
          </button>
        )}

        {youtubeId && isPlaying && (
          <iframe
            src={embedUrl}
            title="Lift verification video"
            className="mb-5 aspect-video w-full rounded-2xl border border-zinc-800"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}

        {!youtubeId && lift.videoUrl && (
          <a
            href={lift.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-5 flex items-center justify-center gap-2 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-4 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            <ExternalLink size={18} />
            Open verification video
          </a>
        )}

        {!lift.videoUrl && (
          <div className="mb-5 rounded-2xl border border-zinc-800 bg-black p-5 text-center text-sm text-zinc-500">
            No verification video.
          </div>
        )}

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
      </section>
    </div>
  );
}

export default LiftDetailModal;
