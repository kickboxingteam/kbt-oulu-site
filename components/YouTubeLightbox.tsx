"use client";

import { useRef, useState } from "react";
import { Play, X } from "lucide-react";

export default function YouTubeLightbox({
  videoId,
  title,
  label,
  className,
}: {
  videoId: string;
  title: string;
  label: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState(false);

  function show() {
    setOpen(true);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
    setOpen(false);
  }

  return (
    <>
      <button type="button" onClick={show} className={className}>
        <span
          aria-hidden="true"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white"
        >
          <Play size={14} fill="currentColor" />
        </span>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={title}
        className="fixed inset-0 m-auto h-fit w-[min(60rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-black p-0 shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onClose={() => setOpen(false)}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Sulje"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur hover:bg-black/80"
        >
          <X aria-hidden="true" size={18} />
        </button>
        <div className="aspect-video w-full">
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
