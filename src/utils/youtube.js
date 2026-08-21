export function getYoutubeId(url = "") {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/,
  );

  return match?.[1] ?? null;
}

export function getYoutubeThumbnail(videoId) {
  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYoutubeEmbedUrl(videoId) {
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
