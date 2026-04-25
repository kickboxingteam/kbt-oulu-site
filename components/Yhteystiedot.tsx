import { Mail, Phone, Instagram } from "lucide-react";
import { site } from "@/lib/content";

export default function Yhteystiedot() {
  return (
    <section id="yhteystiedot" className="section">
      <div className="container-page">
        <p className="eyebrow">Yhteystiedot</p>
        <h2 className="mt-3 section-title">Tule mukaan</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Ensimmäiset kaksi tutustumiskertaa ovat aina veloituksetta. Tule paikalle hieman ennen
          treenin alkua niin ohjaamme sinut oikeaan ryhmään. Voit myös kysyä etukäteen
          sähköpostilla tai puhelimitse.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={`mailto:${site.contact.email}`}
            className="card flex items-start gap-3 hover:bg-white/[0.05]"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]"
            >
              <Mail size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                Sähköposti
              </span>
              <span className="mt-1 block break-all text-sm font-medium text-white">
                {site.contact.email}
              </span>
            </span>
          </a>

          <a
            href={`tel:${site.contact.phoneTel}`}
            className="card flex items-start gap-3 hover:bg-white/[0.05]"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]"
            >
              <Phone size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                Puhelin
              </span>
              <span className="mt-1 block text-sm font-medium text-white">
                {site.contact.phone}
              </span>
            </span>
          </a>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-start gap-3 hover:bg-white/[0.05]"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]"
            >
              <Instagram size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                Instagram
              </span>
              <span className="mt-1 block text-sm font-medium text-white">
                {site.social.instagramHandle}
              </span>
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}
