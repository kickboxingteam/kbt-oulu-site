"use client";

import { useRef } from "react";
import {
  Check,
  X,
  CreditCard,
  Wallet,
  Info,
  ExternalLink,
} from "lucide-react";
import { site } from "@/lib/content";

const peruskurssiPerks = [
  "Aloittelijoille",
  "12 v ikäraja, ei taustaa",
  "Sis. jäsenmaksun",
];

const muutMaksutPerks = [
  "Jäsenmaksu vuosittain",
  "Kertamaksu treeniin",
  "Yksityistunnit Lepalta",
];

export default function Hinnasto() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function open() {
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <section id="hinnasto" className="section">
      <div className="container-page">
        <p className="eyebrow">Hinnasto</p>
        <h2 className="mt-3 section-title">Kausimaksut</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Yksi kausimaksu sisältää rajattoman harjoittelun kaikissa lajeissa. Maksu suoritetaan
          tilisiirtona — ei tarvetta kuukausilaskutuksille tai sopimuksille.
        </p>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {site.hinnasto.map((tier) => (
            <li
              key={tier.id}
              className={`card relative flex flex-col ${
                tier.featured
                  ? "border-[color:var(--color-accent)]/50 bg-[color:var(--color-accent)]/5 shadow-xl shadow-[color:var(--color-accent)]/10"
                  : ""
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-xs font-semibold text-white">
                  Suosituin
                </span>
              )}
              <h3 className="text-base font-semibold uppercase tracking-wider text-white">
                {tier.name}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-wide text-white">
                {tier.price}
              </p>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-[color:var(--color-text-muted)]">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      size={18}
                      className="mt-0.5 shrink-0 text-[color:var(--color-accent)]"
                    />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={open} className="btn-ghost mt-auto pt-6 w-full">
                Aloita harjoittelu
              </button>
            </li>
          ))}

          <li className="card relative flex flex-col">
            <h3 className="text-base font-semibold uppercase tracking-wider text-white">
              Peruskurssi
            </h3>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-wide text-white">
              120 €
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-[color:var(--color-text-muted)]">
              {peruskurssiPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check
                    aria-hidden="true"
                    size={18}
                    className="mt-0.5 shrink-0 text-[color:var(--color-accent)]"
                  />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={open} className="btn-ghost mt-auto pt-6 w-full">
              Lue lisää
            </button>
          </li>

          <li className="card relative flex flex-col">
            <h3 className="text-base font-semibold uppercase tracking-wider text-white">
              Muut maksut
            </h3>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-wide text-white">
              Alk. 10 €
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-[color:var(--color-text-muted)]">
              {muutMaksutPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check
                    aria-hidden="true"
                    size={18}
                    className="mt-0.5 shrink-0 text-[color:var(--color-accent)]"
                  />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={open} className="btn-ghost mt-auto pt-6 w-full">
              Lue lisää
            </button>
          </li>
        </ul>

        {site.hinnastoNotes.length > 0 && (
          <div className="mt-10 grid gap-2 text-sm text-[color:var(--color-text-muted)]">
            {site.hinnastoNotes.map((note) => (
              <p key={note}>· {note}</p>
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="maksu-modal-title"
        className="m-auto w-[min(48rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[color:var(--color-bg-soft)] p-0 text-[color:var(--color-text)] shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-in"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <Wallet aria-hidden="true" size={14} />
                Maksuohjeet
              </p>
              <h3
                id="maksu-modal-title"
                className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-wide text-white"
              >
                Näin maksat
              </h3>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Sulje"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </header>

          <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="inline-flex items-center gap-2 text-sm text-[color:var(--color-accent)]">
              <CreditCard aria-hidden="true" size={16} />
              Maksutiedot
            </p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                  Saaja
                </dt>
                <dd className="mt-1 text-sm font-medium text-white">
                  {site.aloita.payment.ibanOwner}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                  Tilinumero
                </dt>
                <dd className="mt-1 break-all font-mono text-sm tabular-nums text-white">
                  {site.aloita.payment.iban}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                  {site.aloita.payment.messageLabel}
                </dt>
                <dd className="mt-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white">
                  {site.aloita.payment.messageExample}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                  Maksutavat
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {site.aloita.payment.methods.map((m) => (
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
          </section>

          {site.peruskurssit.prices.length > 0 && (
            <section className="mt-6">
              <p className="eyebrow">Peruskurssi</p>
              <ul className="mt-3 flex flex-col divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.03] px-4">
                {site.peruskurssit.prices.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-sm text-[color:var(--color-text-muted)]">{p.label}</span>
                    <span className="font-[family-name:var(--font-display)] text-xl tracking-wide text-white">
                      {p.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Hinta sisältää KBT:n kuluvan vuoden jäsenmaksun (20 €).
              </p>
              {site.peruskurssit.seasonNote && (
                <p className="mt-3 inline-flex items-start gap-2 rounded-lg border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/10 px-3 py-2 text-xs text-[color:var(--color-accent)]">
                  {site.peruskurssit.seasonNote}
                </p>
              )}
            </section>
          )}

          {site.lisamaksut.length > 0 && (
            <section className="mt-6">
              <p className="eyebrow">Lisämaksut</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {site.lisamaksut.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                      <span className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[color:var(--color-accent)]">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[color:var(--color-text-muted)]">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {site.aloita.goodToKnow.length > 0 && (
            <section className="mt-6">
              <p className="eyebrow inline-flex items-center gap-2">
                <Info aria-hidden="true" size={14} />
                Hyvä tietää
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {site.aloita.goodToKnow.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="mt-1.5 text-xs text-[color:var(--color-text-muted)]">
                      {item.body}
                    </p>
                    {item.link && (
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-accent)] hover:underline"
                      >
                        {item.link.label}
                        <ExternalLink aria-hidden="true" size={12} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 flex justify-end">
            <button type="button" onClick={close} className="btn-primary">
              Selvä, kiitos
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
