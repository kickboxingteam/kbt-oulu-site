import { site } from "@/lib/content";
import LajiCard from "./LajiCard";

export default function Lajit({
  peruskurssiInfo,
}: {
  peruskurssiInfo: Record<string, string>;
}) {
  return (
    <section id="lajit" className="section">
      <div className="container-page">
        <p className="eyebrow">Lajit</p>
        <h2 className="mt-3 section-title">Lajivalikoima</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">
          Treeneihin voi tulla kokeilemaan oman kunnon ja kokemuksen mukaan. Aloittelijat
          aloittavat peruskurssilta, kokeneemmat tulevat suoraan jatkoryhmiin.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.lajit.map((laji) => {
            const date =
              peruskurssiInfo[laji.id] ??
              peruskurssiInfo[laji.name.toLowerCase()];
            return (
              <li key={laji.id}>
                <LajiCard laji={laji} peruskurssiDate={date} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
