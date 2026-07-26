import fallback from "@/content/schedule-fallback.json";

export type ScheduleRow = {
  day: string;
  start: string;
  end: string;
  sport: string;
  coach: string;
  hall: string;
};

export type Schedule = {
  rows: ScheduleRow[];
  source: "sheets" | "fallback";
  updatedAt: string;
  error?: string;
};

const HEADER_MAP: Record<string, keyof ScheduleRow> = {
  "päivä": "day",
  "paiva": "day",
  "day": "day",
  "aika alkaa": "start",
  "alkaa": "start",
  "start": "start",
  "aika loppuu": "end",
  "loppuu": "end",
  "end": "end",
  "laji": "sport",
  "sport": "sport",
  "ohjaaja": "coach",
  "coach": "coach",
  "valmentaja": "coach",
  "sali": "hall",
  "hall": "hall",
  "paikka": "hall",
};

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseCsv(csv: string): ScheduleRow[] {
  const lines = csv
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headerCells = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim());
  const indices: Partial<Record<keyof ScheduleRow, number>> = {};
  headerCells.forEach((h, i) => {
    const key = HEADER_MAP[h];
    if (key && indices[key] === undefined) indices[key] = i;
  });

  const rows: ScheduleRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    const row: ScheduleRow = {
      day: indices.day !== undefined ? cells[indices.day] ?? "" : "",
      start: indices.start !== undefined ? cells[indices.start] ?? "" : "",
      end: indices.end !== undefined ? cells[indices.end] ?? "" : "",
      sport: indices.sport !== undefined ? cells[indices.sport] ?? "" : "",
      coach: indices.coach !== undefined ? cells[indices.coach] ?? "" : "",
      hall: indices.hall !== undefined ? cells[indices.hall] ?? "" : "",
    };
    if (row.day && row.start) rows.push(row);
  }
  return rows;
}

export async function getSchedule(): Promise<Schedule> {
  const url = process.env.NEXT_PUBLIC_SCHEDULE_CSV_URL;
  const fallbackSchedule: Schedule = {
    rows: fallback.rows as ScheduleRow[],
    source: "fallback",
    updatedAt: fallback.updatedAt,
  };

  if (!url) return fallbackSchedule;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) {
      return { ...fallbackSchedule, error: `HTTP ${res.status}` };
    }
    const csv = await res.text();
    const rows = parseCsv(csv);
    if (rows.length === 0) {
      return { ...fallbackSchedule, error: "Tyhjä CSV" };
    }
    return {
      rows,
      source: "sheets",
      updatedAt: new Date().toISOString().slice(0, 10),
    };
  } catch (err) {
    return {
      ...fallbackSchedule,
      error: err instanceof Error ? err.message : "Tuntematon virhe",
    };
  }
}

export async function getPeruskurssiInfo(): Promise<Map<string, string>> {
  const url = process.env.NEXT_PUBLIC_SCHEDULE_CSV_URL;
  if (!url) return new Map();

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return new Map();
    const csv = await res.text();
    const lines = csv
      .replace(/\r\n/g, "\n")
      .split("\n")
      .filter((l) => l.trim().length > 0);
    const map = new Map<string, string>();
    for (let i = 1; i < lines.length; i++) {
      const cells = parseCsvLine(lines[i]);
      const laji = cells[5]?.trim();
      const date = cells[6]?.trim();
      // Vain päivämäärän näköiset arvot (esim. 18.8. tai 18.8.2026) —
      // samoissa sarakkeissa on myös peruskurssien viikkoaikataulublokki.
      if (laji && date && /^\d{1,2}\.\d{1,2}\./.test(date)) {
        map.set(laji.toLowerCase(), date);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

export type PeruskurssiRow = {
  day: string;
  start: string;
  end: string;
  sport: string;
};

const DAY_ABBREV: Record<string, string> = {
  ma: "Maanantai",
  ti: "Tiistai",
  ke: "Keskiviikko",
  to: "Torstai",
  pe: "Perjantai",
  la: "Lauantai",
  su: "Sunnuntai",
};

const TIME_RE = /^\d{1,2}[:.]\d{2}$/;

export async function getPeruskurssiSchedule(): Promise<PeruskurssiRow[]> {
  const url = process.env.NEXT_PUBLIC_SCHEDULE_CSV_URL;
  if (!url) return [];

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const csv = await res.text();
    const lines = csv
      .replace(/\r\n/g, "\n")
      .split("\n")
      .filter((l) => l.trim().length > 0);
    const rows: PeruskurssiRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cells = parseCsvLine(lines[i]);
      const dayRaw = cells[5]?.trim().toLowerCase() ?? "";
      const start = cells[6]?.trim() ?? "";
      const end = cells[7]?.trim() ?? "";
      const sport = cells[8]?.trim() ?? "";
      const day = DAY_ABBREV[dayRaw] ?? (DAY_ORDER.includes(cells[5]?.trim() ?? "") ? cells[5].trim() : "");
      if (day && TIME_RE.test(start) && TIME_RE.test(end) && sport) {
        rows.push({ day, start, end, sport });
      }
    }
    return rows;
  } catch {
    return [];
  }
}

export const DAY_ORDER = [
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
  "Sunnuntai",
];

export function groupByDay(rows: ScheduleRow[]): Map<string, ScheduleRow[]> {
  const map = new Map<string, ScheduleRow[]>();
  for (const r of rows) {
    const list = map.get(r.day) ?? [];
    list.push(r);
    map.set(r.day, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.start.localeCompare(b.start));
  }
  return new Map(
    [...map.entries()].sort(([a], [b]) => {
      const ai = DAY_ORDER.indexOf(a);
      const bi = DAY_ORDER.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    }),
  );
}
