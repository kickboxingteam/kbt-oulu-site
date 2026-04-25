import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { site } from "@/lib/content";

export default function Sijainti() {
  const { address, mapsEmbedUrl, mapsLinkUrl } = site.contact;

  return (
    <section id="sijainti" className="section bg-[color:var(--color-bg-soft)]">
      <div className="container-page">
        <p className="eyebrow">Sijainti</p>
        <h2 className="mt-3 section-title">Salin osoite</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="card">
            <p className="inline-flex items-center gap-2 text-sm text-[color:var(--color-accent)]">
              <MapPin aria-hidden="true" size={18} />
              Osoite
            </p>
            <address className="mt-3 not-italic text-lg text-white">
              {address.venue}
              <br />
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </address>

            <a
              href={mapsLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-6"
            >
              Avaa Google Mapsissa
              <ExternalLink aria-hidden="true" size={16} />
            </a>

            <p className="mt-6 text-sm text-[color:var(--color-text-muted)]">
              Värtön liikuntahallin pukuhuoneet ja pesutilat ovat käytössäsi. Saliin pääsee bussilla
              ja autolla, parkkitilaa on rakennuksen edustalla.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={mapsEmbedUrl}
              title={`${address.venue} kartalla`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[320px] w-full"
              allowFullScreen
            />
            <a
              href={mapsLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suunnista Värtön liikuntahalliin Google Mapsissa"
              className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-bg)]/95 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/40 ring-1 ring-white/10 backdrop-blur transition hover:bg-[color:var(--color-accent)] hover:ring-[color:var(--color-accent)]"
            >
              <Navigation aria-hidden="true" size={16} />
              Suunnista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
