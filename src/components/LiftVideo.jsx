import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

import {
  getYoutubeEmbedUrl,
  getYoutubeId,
  getYoutubeThumbnail,
} from "../utils/youtube";

function LiftVideo({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const youtubeId = getYoutubeId(videoUrl);
  const thumbnailUrl = getYoutubeThumbnail(youtubeId);
  const embedUrl = getYoutubeEmbedUrl(youtubeId);

  if (!videoUrl) {
    return (
      <div className="mb-5 rounded-2xl border border-zinc-800 bg-black p-5 text-center text-sm text-zinc-500">
        No verification video.
      </div>
    );
  }

  if (!youtubeId) {
    return (
      <a
        href={videoUrl}
        target="_blank"
        rel="noreferrer"
        className="mb-5 flex items-center justify-center gap-2 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-4 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black"
      >
        <ExternalLink size={18} />
        Open verification video
      </a>
    );
  }

  if (isPlaying) {
    return (
      <iframe
        src={embedUrl}
        title="Lift verification video"
        className="mb-5 aspect-video w-full rounded-2xl border border-zinc-800"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
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
  );
}

export default LiftVideo;
