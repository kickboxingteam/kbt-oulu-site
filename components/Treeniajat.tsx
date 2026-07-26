import { Calendar, AlertTriangle, Info, ChevronDown } from "lucide-react";
import {
  getSchedule,
  getPeruskurssiInfo,
  getPeruskurssiSchedule,
  groupByDay,
  type ScheduleRow,
} from "@/lib/schedule";

const glossary = {
  lajit: [
    { short: "MMA", long: "vapaaottelu" },
    { short: "KB", long: "potkunyrkkeily" },
    { short: "SW", long: "lukkopaini" },
    { short: "BJJ", long: "brasilialainen jujutsu" },
  ],
  tasot: [
    { short: "noviisit", long: "perustaitoihin keskittyvät treenit vähemmän aikaa treenanneille" },
    { short: "ylemmät", long: "teknisesti haastavammat treenit kokeneemmille" },
  ],
  mattolajit: [
    {
      short: "puku",
      long: "painipuku eli gi — treeneissä painotetaan pukua hyödyntäviä BJJ-tekniikoita",
    },
    {
      short: "nogi",
      long: "lukkopainivarustus — trikoot ja/tai shortsit ja rashguard tai muu sisätreenipaita",
    },
  ],
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

type ColumnKey = keyof Pick<ScheduleRow, "coach" | "hall">;

function hasAnyValue(rows: ScheduleRow[], key: ColumnKey): boolean {
  return rows.some((r) => r[key] && r[key].trim().length > 0);
}

type MergedRow = ScheduleRow & { pekkuStart?: string };

function shortDate(date: string): string {
  const m = date.match(/^(\d{1,2}\.\d{1,2}\.)\d{4}$/);
  return m ? m[1] : date;
}

export default async function Treeniajat() {
  const [schedule, pekkuRows, pekkuInfo] = await Promise.all([
    getSchedule(),
    getPeruskurssiSchedule(),
    getPeruskurssiInfo(),
  ]);
  // Peruskurssit yhdistetään viikkoaikatauluun Sheetin sivupalstasta (F–I);
  // ne osuvat aikajärjestyksessä päivän loppuun, koska pekut ovat aina viimeiset.
  const mergedRows: MergedRow[] = [
    ...schedule.rows,
    ...pekkuRows.map((r) => {
      const startDate = pekkuInfo.get(r.sport.toLowerCase());
      return {
        day: r.day,
        start: r.start,
        end: r.end,
        sport: `${r.sport} - peruskurssi`,
        coach: "",
        hall: "",
        pekkuStart: startDate ? shortDate(startDate) : undefined,
      };
    }),
  ];
  const grouped = groupByDay(mergedRows);
  const showCoach = hasAnyValue(mergedRows, "coach");
  const showHall = hasAnyValue(mergedRows, "hall");

  return (
    <section id="treeniajat" className="section bg-[color:var(--color-bg-soft)]">
      <div className="container-page">
        <p className="eyebrow">Treeniajat</p>
        <h2 className="mt-3 section-title">Viikon harjoitukset</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Mahdolliset muutokset ilmoitetaan Instagramissa.
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

        <details className="group mt-6 rounded-2xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04]">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-5 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
            <Info
              aria-hidden="true"
              size={18}
              className="shrink-0 text-[color:var(--color-accent)]"
            />
            <span className="flex-1">Mitä lyhenteet tarkoittavat?</span>
            <ChevronDown
              aria-hidden="true"
              size={18}
              className="shrink-0 text-[color:var(--color-text-muted)] transition-transform group-open:rotate-180"
            />
          </summary>

          <div className="grid gap-6 border-t border-white/10 p-5 text-sm text-[color:var(--color-text-muted)] sm:p-6 md:grid-cols-2">
            <div>
              <p className="eyebrow">Lajit</p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                {glossary.lajit.map((g) => (
                  <div key={g.short} className="contents">
                    <dt className="font-mono text-xs font-semibold text-[color:var(--color-accent)]">
                      {g.short}
                    </dt>
                    <dd>{g.long}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="eyebrow">Tasot</p>
              <dl className="mt-3 flex flex-col gap-3">
                {glossary.tasot.map((g) => (
                  <div key={g.short}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-accent)]">
                      {g.short}
                    </dt>
                    <dd className="mt-0.5">{g.long}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="md:col-span-2">
              <p className="eyebrow">Mattolajit</p>
              <dl className="mt-3 flex flex-col gap-3">
                {glossary.mattolajit.map((g) => (
                  <div key={g.short}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-accent)]">
                      {g.short}
                    </dt>
                    <dd className="mt-0.5">{g.long}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="eyebrow">Mukaan tuleminen</p>
              <p className="mt-2">
                Lajitreeneihin pääset mukaan käytyäsi peruskurssin. Mikäli olet harrastanut
                kamppailulajeja aiemmin, voit tulla suoraan mukaan.
              </p>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
