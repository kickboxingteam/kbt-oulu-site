import { Wallet } from "lucide-react";
import { site } from "@/lib/content";

export default function Aloita() {
  const a = site.aloita;

  return (
    <section id="aloita" className="section bg-[color:var(--color-bg-soft)]">
      <div className="container-page">
        <p className="eyebrow inline-flex items-center gap-2">
          <Wallet aria-hidden="true" size={14} />
          Aloittaminen
        </p>
        <h2 className="mt-3 section-title">{a.title}</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-text-muted)]">{a.intro}</p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-3">
          {a.steps.map((step, idx) => (
            <li key={step.title} className="card relative pt-8">
              <span
                aria-hidden="true"
                className="absolute -top-4 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-accent)] font-[family-name:var(--font-display)] text-lg text-white"
              >
                {idx + 1}
              </span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
