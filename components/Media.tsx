import Image from "next/image";
import { Newspaper, ArrowUpRight, Instagram } from "lucide-react";
import { site } from "@/lib/content";

const dateFormatter = new Intl.DateTimeFormat("fi-FI", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

export default function Media() {
  const hasMedia = site.media.length > 0;
  const hasAjankohtaista = site.ajankohtaista.length > 0;

  if (!hasMedia && !hasAjankohtaista) return null;

  return (
    <section id="media" className="section">
      <div className="container-page">
        <h2 className="section-title">Seurasta kirjoitettua</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Haastatteluja, kilpailuraportteja ja tuoreita kuulumisia seuran toiminnasta.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
          {hasMedia && (
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <Newspaper aria-hidden="true" size={14} />
                Lehdistössä
              </p>
              <ul className="mt-4 flex max-h-[720px] flex-col gap-6 overflow-y-auto overscroll-contain pr-2">
                {site.media.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex h-full flex-col gap-5 hover:bg-white/[0.05] hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 36rem, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">
                        <span className="text-[color:var(--color-accent)]">{item.publisher}</span>
                        <span aria-hidden="true"> · </span>
                        <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                      </p>
                      <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                        {item.excerpt}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--color-accent)]">
                        Lue juttu
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </p>
                    </div>
                  </a>
                </li>
                ))}
              </ul>
            </div>
          )}

          {hasAjankohtaista && (
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <Instagram aria-hidden="true" size={14} />
                Ajankohtaista
              </p>
              <ul className="mt-4 flex max-h-[720px] flex-col gap-3 overflow-y-auto overscroll-contain pr-2">
                {site.ajankohtaista.map((item, idx) => (
                  <li key={`${item.url}-${idx}`}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card group flex gap-4 hover:bg-white/[0.05] hover:-translate-y-0.5"
                    >
                      {item.image && (
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                          <Image
                            src={item.image}
                            alt={item.imageAlt ?? ""}
                            fill
                            sizes="96px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">
                          <span>
                            {item.kicker && (
                              <>
                                <span className="text-[color:var(--color-accent)]">
                                  {item.kicker}
                                </span>
                                <span aria-hidden="true"> · </span>
                              </>
                            )}
                            <time dateTime={item.date}>{formatDate(item.date)}</time>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            size={14}
                            className="text-[color:var(--color-text-muted)] transition group-hover:text-[color:var(--color-accent)]"
                          />
                        </div>
                        <h3 className="text-base font-semibold leading-tight text-white">
                          {item.title}
                        </h3>
                        {item.body && (
                          <p className="text-sm leading-snug text-[color:var(--color-text-muted)]">
                            {item.body}
                          </p>
                        )}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
