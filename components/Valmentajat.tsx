import Image from "next/image";
import { UserRound, Instagram } from "lucide-react";
import { site } from "@/lib/content";

export default function Valmentajat() {
  return (
    <section id="valmentajat" className="section bg-[color:var(--color-bg-soft)]">
      <div className="container-page">
        <p className="eyebrow">Valmentajat</p>
        <h2 className="mt-3 section-title">Kokeneet ohjaajat</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Valmentajamme ovat kokeneita kamppailulajien ohjaajia. Tarkemmat esittelyt päivittyvät
          tähän pian.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {site.valmentajat.map((v, i) => {
            const paragraphs = Array.isArray(v.bio) ? v.bio : [v.bio];
            return (
              <li key={`${v.name}-${i}`} className="card flex flex-col">
                <div className="flex items-center gap-4">
                  {v.image ? (
                    <Image
                      src={v.image}
                      alt={`${v.name} — ${v.role}`}
                      width={72}
                      height={72}
                      className="h-[72px] w-[72px] shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="inline-flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-white/5 text-[color:var(--color-text-muted)] ring-1 ring-white/10"
                    >
                      <UserRound size={32} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-white">{v.name}</h3>
                    <p className="text-sm text-[color:var(--color-accent)]">{v.role}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                  {paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {v.instagram && (
                  <a
                    href={v.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[color:var(--color-accent)] hover:underline"
                  >
                    <Instagram aria-hidden="true" size={14} />
                    {v.instagramHandle ?? "Instagram"}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
