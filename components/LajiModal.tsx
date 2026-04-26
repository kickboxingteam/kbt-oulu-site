"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Swords,
  Shield,
  Flame,
  Users,
  X,
  ExternalLink,
  ArrowRight,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/lib/content";
import { LAJI_MODAL_EVENT } from "@/lib/lajiModal";

const icons: Record<string, LucideIcon> = {
  swords: Swords,
  shield: Shield,
  flame: Flame,
  users: Users,
};

export default function LajiModal({
  peruskurssiInfo = {},
}: {
  peruskurssiInfo?: Record<string, string>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeLajiId, setActiveLajiId] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setActiveLajiId(detail);
      dialogRef.current?.showModal();
    };
    document.addEventListener(LAJI_MODAL_EVENT, handler);
    return () => document.removeEventListener(LAJI_MODAL_EVENT, handler);
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  const laji = activeLajiId ? site.lajit.find((l) => l.id === activeLajiId) : null;
  const Icon = laji ? icons[laji.icon] ?? Swords : Swords;
  const peruskurssiDate = laji
    ? peruskurssiInfo[laji.id] ?? peruskurssiInfo[laji.name.toLowerCase()]
    : undefined;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="laji-modal-title"
      className="fixed inset-0 m-auto h-fit max-h-[85vh] w-[min(56rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-bg-soft)] p-0 text-[color:var(--color-text)] shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      {laji && (
        <div className="max-h-[85vh] overflow-y-auto">
          {laji.images && laji.images.length > 0 && (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={laji.images[0]}
                alt=""
                fill
                sizes="56rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[color:var(--color-bg-soft)]" />
              <button
                type="button"
                onClick={close}
                aria-label="Sulje"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur hover:bg-black/80"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {(!laji.images || laji.images.length === 0) && (
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Sulje"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </div>
            )}

            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]"
              >
                <Icon size={22} />
              </span>
              <div>
                <p className="eyebrow">Laji</p>
                <h3
                  id="laji-modal-title"
                  className="mt-1 font-[family-name:var(--font-display)] text-3xl tracking-wide text-white sm:text-4xl"
                >
                  {laji.name}
                </h3>
              </div>
            </div>

            {laji.longDescription && laji.longDescription.length > 0 && (
              <div className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                {laji.longDescription.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-xl border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/5 p-5">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-white">
                <Calendar
                  aria-hidden="true"
                  size={16}
                  className="text-[color:var(--color-accent)]"
                />
                Seuraava peruskurssi:{" "}
                <span className="text-[color:var(--color-accent)]">
                  {peruskurssiDate ?? "ilmoitetaan pian"}
                </span>
              </p>
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Aiemmin harrastaneet voivat tulla mukaan suoraan sopivaan ryhmään.
              </p>
            </div>

            {laji.keyFacts && laji.keyFacts.length > 0 && (
              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {laji.keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <dt className="text-xs uppercase tracking-wider text-[color:var(--color-accent)]">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {((laji.images && laji.images.length > 1) ||
              (laji.videos && laji.videos.length > 0)) && (
              <section className="mt-8">
                <p className="eyebrow">Galleria</p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {laji.videos?.map((src, idx) => (
                    <li
                      key={`vid-${src}-${idx}`}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black"
                    >
                      <video
                        src={`${src}#t=0.1`}
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </li>
                  ))}
                  {laji.images?.slice(1).map((src, idx) => (
                    <li
                      key={`img-${src}-${idx}`}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 18rem, 50vw"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              {laji.federation && (
                <a
                  href={laji.federation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-accent)] hover:underline"
                >
                  Lue lisää: {laji.federation.name}
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              )}

              <a
                href="#treeniajat"
                onClick={() => close()}
                className="btn-primary"
              >
                Katso treeniaikataulu
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
