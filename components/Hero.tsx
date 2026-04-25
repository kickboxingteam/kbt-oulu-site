import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-gradient relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
        <div>
          <p className="eyebrow inline-flex items-center gap-2">
            <Calendar aria-hidden="true" size={14} />
            {site.contact.address.city} · Vuodesta 2000
          </p>
          <h1 className="mt-4 section-title text-5xl sm:text-6xl lg:text-7xl">
            {site.brand.name.toUpperCase()}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--color-text-muted)]">
            {site.brand.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#aloita" className="btn-primary">
              Tule kokeilemaan
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#treeniajat" className="btn-ghost">
              Katso aikataulu
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-muted)]">
            <MapPin aria-hidden="true" size={16} className="text-[color:var(--color-accent)]" />
            {site.contact.address.venue}, {site.contact.address.street}, {site.contact.address.city}
          </p>
        </div>

        <div className="relative aspect-[4/5] w-full max-w-md justify-self-center lg:aspect-auto lg:justify-self-end">
          <div className="absolute inset-0 -rotate-2 rounded-3xl bg-[color:var(--color-accent)]/30 blur-2xl" />
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="/images/hero-bg.jpg"
              alt="KBT:n ottelija voiton hetkellä kehässä"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
