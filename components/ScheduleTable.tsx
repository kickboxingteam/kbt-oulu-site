"use client";

import { useEffect, useState } from "react";
import { groupByDay, DAY_ORDER, type ScheduleRow } from "@/lib/schedule";

export type ScheduleTableRow = ScheduleRow & {
  pekkuStart?: string;
  pekkuStartDate?: string;
};

const sportKeywords: Array<{ keyword: string; classes: string }> = [
  { keyword: "MMA", classes: "bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]" },
  { keyword: "Sparri", classes: "bg-rose-500/15 text-rose-300" },
  { keyword: "Pysty", classes: "bg-amber-500/15 text-amber-300" },
  { keyword: "Lukkopaini", classes: "bg-emerald-500/15 text-emerald-300" },
  { keyword: "Matto", classes: "bg-emerald-500/15 text-emerald-300" },
  { keyword: "Potkunyrkkeily", classes: "bg-amber-500/15 text-amber-300" },
  { keyword: "BJJ", classes: "bg-emerald-500/15 text-emerald-300" },
];

function colorFor(sport: string): string {
  const s = sport.toLowerCase();
  const hit = sportKeywords.find((k) => s.includes(k.keyword.toLowerCase()));
  return hit?.classes ?? "bg-white/10 text-white";
}

function toMinutes(time: string): number | null {
  const m = time.match(/^(\d{1,2})[:.](\d{2})$/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

function parseFiDate(date: string): Date | null {
  const m = date.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  return m ? new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])) : null;
}

export default function ScheduleTable({
  rows,
  showCoach,
  showHall,
}: {
  rows: ScheduleTableRow[];
  showCoach: boolean;
  showHall: boolean;
}) {
  // Kello asetetaan vasta mountissa, ettei server- ja client-renderöinti eroa.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const grouped = groupByDay(rows);
  const todayName = now ? DAY_ORDER[(now.getDay() + 6) % 7] : null;
  const nowMin = now ? now.getHours() * 60 + now.getMinutes() : null;

  // Pekkurivi ei ole käynnissä/seuraavaksi ennen aloituspäiväänsä.
  const hasStarted = (row: ScheduleTableRow): boolean => {
    if (!row.pekkuStartDate || !now) return true;
    const start = parseFiDate(row.pekkuStartDate);
    return start === null || start <= now;
  };

  let nextStart: number | null = null;
  if (todayName && nowMin !== null) {
    for (const row of grouped.get(todayName) ?? []) {
      const start = toMinutes(row.start);
      if (start !== null && start > nowMin && hasStarted(row)) {
        if (nextStart === null || start < nextStart) nextStart = start;
      }
    }
  }

  function statusFor(row: ScheduleTableRow, day: string): "ongoing" | "next" | null {
    if (day !== todayName || nowMin === null || !hasStarted(row)) return null;
    const start = toMinutes(row.start);
    const end = toMinutes(row.end);
    if (start === null) return null;
    if (end !== null && start <= nowMin && nowMin < end) return "ongoing";
    if (nextStart !== null && start === nextStart) return "next";
    return null;
  }

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <table className="w-full text-left">
        <caption className="sr-only">Viikon harjoitusajat lajeittain</caption>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
          <tr>
            <th scope="col" className="px-5 py-4 font-semibold">Päivä</th>
            <th scope="col" className="px-5 py-4 font-semibold">Aika</th>
            <th scope="col" className="px-5 py-4 font-semibold">Laji</th>
            {showCoach && (
              <th scope="col" className="px-5 py-4 font-semibold">Ohjaaja</th>
            )}
            {showHall && (
              <th scope="col" className="px-5 py-4 font-semibold">Sali</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[...grouped.entries()].flatMap(([day, dayRows]) =>
            dayRows.map((row, idx) => {
              const isToday = day === todayName;
              const status = statusFor(row, day);
              return (
                <tr
                  key={`${day}-${idx}`}
                  className={`text-sm ${isToday ? "bg-white/[0.04]" : ""}`}
                >
                  <th scope="row" className="px-5 py-4 font-semibold text-white">
                    {idx === 0 ? (
                      <span className="inline-flex items-center gap-2">
                        {day}
                        {isToday && (
                          <span className="rounded-full border border-[color:var(--color-accent)]/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[color:var(--color-accent)]">
                            tänään
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="sr-only">{day}</span>
                    )}
                  </th>
                  <td className="px-5 py-4 tabular-nums text-[color:var(--color-text-muted)]">
                    {row.start}–{row.end}
                    {status === "ongoing" && (
                      <span className="ml-2 inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[color:var(--color-accent)]">
                        <span aria-hidden="true" className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                        </span>
                        käynnissä
                      </span>
                    )}
                    {status === "next" && (
                      <span className="ml-2 whitespace-nowrap text-xs text-[color:var(--color-text-muted)]">
                        seuraavaksi
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colorFor(row.sport)}`}
                    >
                      {row.sport}
                    </span>
                    {row.pekkuStart && (
                      <span className="ml-2 whitespace-nowrap text-xs text-[color:var(--color-text-muted)]">
                        alkaen {row.pekkuStart}
                      </span>
                    )}
                  </td>
                  {showCoach && (
                    <td className="px-5 py-4 text-[color:var(--color-text-muted)]">{row.coach}</td>
                  )}
                  {showHall && (
                    <td className="px-5 py-4 text-[color:var(--color-text-muted)]">{row.hall}</td>
                  )}
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}
