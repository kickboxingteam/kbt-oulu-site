"use client";

import { Fragment } from "react";
import { GraduationCap, Check, Calendar } from "lucide-react";
import { site } from "@/lib/content";
import { openMaksuModal } from "@/lib/maksuModal";

export default function Peruskurssit() {
  const pk = site.peruskurssit;

  return (
    <section id="peruskurssit" className="section">
      <div className="container-page">
        <p className="eyebrow inline-flex items-center gap-2">
          <GraduationCap aria-hidden="true" size={14} />
          {pk.tagline}
        </p>
        <h2 className="mt-3 section-title">{pk.title}</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">{pk.intro}</p>

        {pk.seasonNote && (
          <p className="mt-6 inline-flex items-start gap-2 rounded-lg border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/10 px-4 py-3 text-sm text-[color:var(--color-accent)]">
            <Calendar aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
            <span>{pk.seasonNote}</span>
          </p>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card flex flex-col gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Miten mukaan?</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {pk.joinSteps.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 text-sm text-[color:var(--color-text-muted)]"
                  >
                    <Check
                      aria-hidden="true"
                      size={18}
                      className="mt-0.5 shrink-0 text-[color:var(--color-accent)]"
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Mitä tarvitset?</h3>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm text-[color:var(--color-text-muted)]">
                {pk.requirements.map((req) => (
                  <Fragment key={req.label}>
                    <dt className="text-xs uppercase tracking-wider text-[color:var(--color-accent)] self-baseline">
                      {req.label}
                    </dt>
                    <dd className="self-baseline">{req.value}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          </div>

          <div className="card flex flex-col">
            <h3 className="text-base font-semibold uppercase tracking-wider text-white">
              Peruskurssi
            </h3>
            <ul className="mt-5 flex flex-col divide-y divide-white/5">
              {pk.prices.map((p) => (
                <li
                  key={p.label}
                  className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-[color:var(--color-text-muted)]">{p.label}</span>
                  <span className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
                    {p.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[color:var(--color-text-muted)]">
              Hinta sisältää KBT:n kuluvan vuoden jäsenmaksun (20 €).
            </p>
            <button
              type="button"
              onClick={openMaksuModal}
              className="btn-ghost mt-6 w-full"
            >
              Aloita harjoittelu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
