import { CreditCard, Info, ExternalLink } from "lucide-react";
import { site } from "@/lib/content";

export default function Maksuohjeet() {
  const a = site.aloita;

  return (
    <section id="maksuohjeet" className="section bg-[color:var(--color-bg-soft)]">
      <div className="container-page">
        <p className="eyebrow inline-flex items-center gap-2">
          <CreditCard aria-hidden="true" size={14} />
          Maksuohjeet
        </p>
        <h2 className="mt-3 section-title">Näin maksat</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Maksu suoritetaan tilisiirtona seuran tilille. Esitä kuitti treeneissä — saat merkinnän
          harjoituskorttiin.
        </p>

        <div className="mt-12 card">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                Saaja
              </dt>
              <dd className="mt-1 text-base font-medium text-white">{a.payment.ibanOwner}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                Tilinumero
              </dt>
              <dd className="mt-1 break-all font-mono text-base tabular-nums text-white">
                {a.payment.iban}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                {a.payment.messageLabel}
              </dt>
              <dd className="mt-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white">
                {a.payment.messageExample}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                Maksutavat
              </dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {a.payment.methods.map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        {a.goodToKnow.length > 0 && (
          <div className="mt-12">
            <p className="eyebrow inline-flex items-center gap-2">
              <Info aria-hidden="true" size={14} />
              Hyvä tietää
            </p>
            <ul className="mt-4 grid gap-5 md:grid-cols-3">
              {a.goodToKnow.map((item) => (
                <li key={item.title} className="card">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{item.body}</p>
                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-accent)] hover:underline"
                    >
                      {item.link.label}
                      <ExternalLink aria-hidden="true" size={14} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
