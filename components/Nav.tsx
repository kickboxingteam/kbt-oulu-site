"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/content";

const links = [
  { href: "#lajit", label: "Lajit" },
  { href: "#valmentajat", label: "Valmentajat" },
  { href: "#aloita", label: "Aloita" },
  { href: "#hinnasto", label: "Hinnasto" },
  { href: "#treeniajat", label: "Treeniajat" },
  { href: "#sijainti", label: "Sijainti" },
  { href: "#yhteystiedot", label: "Yhteystiedot" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "bg-[color:var(--color-bg)]/90 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Päänavigaatio"
        className="container-page flex h-[72px] items-center justify-between"
      >
        <a href="#" className="flex items-center gap-3" aria-label={`${site.brand.name} — etusivu`}>
          <Image
            src="/images/logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-12 w-auto"
          />
          <span className="hidden sm:block font-[family-name:var(--font-display)] text-lg tracking-wider">
            {site.brand.shortName}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-sm text-[color:var(--color-text-muted)] hover:text-white transition-colors rounded-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#aloita" className="hidden lg:inline-flex btn-primary">
          Tule kokeilemaan
        </a>

        <button
          type="button"
          aria-label={open ? "Sulje valikko" : "Avaa valikko"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
        >
          {open ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[color:var(--color-bg)]/95 backdrop-blur">
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-base text-[color:var(--color-text-muted)] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-4 pt-2">
              <a
                href="#aloita"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Tule kokeilemaan
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
