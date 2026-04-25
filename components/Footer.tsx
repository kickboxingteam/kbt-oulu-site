import Image from "next/image";
import { Instagram, Facebook, Mail } from "lucide-react";
import { site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[color:var(--color-bg)]">
      <div className="container-page py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-auto"
            />
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg tracking-wider text-white">
                {site.brand.name}
              </p>
              <p className="text-sm text-[color:var(--color-text-muted)]">
                {site.contact.address.venue}, {site.contact.address.city}
              </p>
            </div>
          </div>

          <ul className="flex items-center gap-3">
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Instagram aria-hidden="true" size={18} />
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Facebook aria-hidden="true" size={18} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                aria-label="Sähköposti"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Mail aria-hidden="true" size={18} />
              </a>
            </li>
          </ul>
        </div>

        <div className="section-divider mt-10" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-[color:var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand.name}. Sivuilta ei kerätä henkilötietoja eikä käytetä evästeitä.
          </p>
          <address className="not-italic">
            <span className="text-[color:var(--color-text)]">
              {site.contact.postalAddress.label}:
            </span>{" "}
            {site.contact.postalAddress.lines.join(", ")}
          </address>
        </div>
      </div>
    </footer>
  );
}
