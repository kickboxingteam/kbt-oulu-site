"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function YouTubeFacade({
  videoId,
  title,
  thumbnail,
  duration,
}: {
  videoId: string;
  title: string;
  thumbnail: string;
  duration?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Toista video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black text-left"
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="(min-width: 1024px) 42rem, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white shadow-lg shadow-black/40 transition group-hover:scale-110"
      >
        <Play size={24} fill="currentColor" />
      </span>
      {duration && (
        <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
      )}
    </button>
  );
}
