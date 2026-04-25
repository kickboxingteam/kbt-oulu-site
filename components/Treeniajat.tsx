import { Calendar, AlertTriangle } from "lucide-react";
import { getSchedule, groupByDay, type ScheduleRow } from "@/lib/schedule";

const sportKeywords: Array<{ keyword: string; classes: string }> = [
  { keyword: "MMA", classes: "bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]" },
  { keyword: "Sparri", classes: "bg-rose-500/15 text-rose-300" },
  { keyword: "Pysty", classes: "bg-amber-500/15 text-amber-300" },
  { keyword: "Lukkopaini", classes: "bg-emerald-500/15 text-emerald-300" },
  { keyword: "Matto", classes: "bg-emerald-500/15 text-emerald-300" },
  { keyword: "Potkunyrkkeily", classes: "bg-amber-500/15 text-amber-300" },
  { keyword: "Thainyrkkeily", classes: "bg-orange-500/15 text-orange-300" },
  { keyword: "BJJ", classes: "bg-emerald-500/15 text-emerald-300" },
];

function colorFor(sport: string): string {
  const s = sport.toLowerCase();
  const hit = sportKeywords.find((k) => s.includes(k.keyword.toLowerCase()));
  return hit?.classes ?? "bg-white/10 text-white";
}

type ColumnKey = keyof Pick<ScheduleRow, "coach" | "hall">;

function hasAnyValue(rows: ScheduleRow[], key: ColumnKey): boolean {
  return rows.some((r) => r[key] && r[key].trim().length > 0);
}

export default async function Treeniajat() {
  const schedule = await getSchedule();
  const grouped = groupByDay(schedule.rows);
  const showCoach = hasAnyValue(schedule.rows, "coach");
  const showHall = hasAnyValue(schedule.rows, "hall");

  return (
    <section id="treeniajat" className="section bg-[color:var(--color-bg-soft)]">
      <div className="container-page">
        <p className="eyebrow">Treeniajat</p>
        <h2 className="mt-3 section-title">Viikon harjoitukset</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Aikataulu päivittyy automaattisesti. Mahdolliset muutokset ilmoitetaan Instagramissa.
        </p>

        {schedule.source === "fallback" && (
          <p className="mt-6 inline-flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">
            <AlertTriangle aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
            <span>
              Aikataulun automaattinen päivitys ei ole vielä käytössä. Näytetään esimerkkilukujärjestys.
            </span>
          </p>
        )}

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
              {[...grouped.entries()].flatMap(([day, rows]) =>
                rows.map((row, idx) => (
                  <tr key={`${day}-${idx}`} className="text-sm">
                    <th scope="row" className="px-5 py-4 font-semibold text-white">
                      {idx === 0 ? day : <span className="sr-only">{day}</span>}
                    </th>
                    <td className="px-5 py-4 tabular-nums text-[color:var(--color-text-muted)]">
                      {row.start}–{row.end}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colorFor(row.sport)}`}
                      >
                        {row.sport}
                      </span>
                    </td>
                    {showCoach && (
                      <td className="px-5 py-4 text-[color:var(--color-text-muted)]">{row.coach}</td>
                    )}
                    {showHall && (
                      <td className="px-5 py-4 text-[color:var(--color-text-muted)]">{row.hall}</td>
                    )}
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 inline-flex items-center gap-2 text-xs text-[color:var(--color-text-muted)]">
          <Calendar aria-hidden="true" size={14} />
          Aikataulu päivitetty {schedule.updatedAt}
          {schedule.source === "sheets" && " · lähde: Google Sheets"}
        </p>
      </div>
    </section>
  );
}
