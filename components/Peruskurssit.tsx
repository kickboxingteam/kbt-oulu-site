"use client";

import { Fragment } from "react";
import { GraduationCap, Check, Calendar, Clock } from "lucide-react";
import { site } from "@/lib/content";
import { openMaksuModal } from "@/lib/maksuModal";
import type { PeruskurssiRow } from "@/lib/schedule";

const DAY_SHORT: Record<string, string> = {
  Maanantai: "ma",
  Tiistai: "ti",
  Keskiviikko: "ke",
  Torstai: "to",
  Perjantai: "pe",
  Lauantai: "la",
  Sunnuntai: "su",
};

type KurssiGroup = {
  sport: string;
  startDate?: string;
  times: string[];
};

function groupKurssit(
  rows: PeruskurssiRow[],
  startDates: Record<string, string>,
): KurssiGroup[] {
  const groups = new Map<string, PeruskurssiRow[]>();
  for (const r of rows) {
    const list = groups.get(r.sport) ?? [];
    list.push(r);
    groups.set(r.sport, list);
  }
  return [...groups.entries()].map(([sport, list]) => {
    // Yhdistä samaan kellonaikaan osuvat päivät: "ti ja to 20:00–21:30"
    const byTime = new Map<string, string[]>();
    for (const r of list) {
      const key = `${r.start}–${r.end}`;
      const days = byTime.get(key) ?? [];
      days.push(DAY_SHORT[r.day] ?? r.day.toLowerCase());
      byTime.set(key, days);
    }
    const times = [...byTime.entries()].map(
      ([time, days]) => `${days.join(" ja ")} ${time}`,
    );
    return { sport, startDate: startDates[sport.toLowerCase()], times };
  });
}

export default function Peruskurssit({
  kurssit = [],
  peruskurssiInfo = {},
}: {
  kurssit?: PeruskurssiRow[];
  peruskurssiInfo?: Record<string, string>;
}) {
  const pk = site.peruskurssit;
  const kurssiGroups = groupKurssit(kurssit, peruskurssiInfo);

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

        {kurssiGroups.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-white">Tulevat peruskurssit</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kurssiGroups.map((g) => (
                <li
                  key={g.sport}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="font-semibold text-white">{g.sport}</p>
                  {g.startDate && (
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-[color:var(--color-accent)]">
                      <Calendar aria-hidden="true" size={14} className="shrink-0" />
                      Alkaa {g.startDate}
                    </p>
                  )}
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {g.times.map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-2 text-sm text-[color:var(--color-text-muted)]"
                      >
                        <Clock aria-hidden="true" size={14} className="shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
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
