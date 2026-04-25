import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { site } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kickboxingteam.com"),
  title: {
    default: `${site.brand.name} — kamppailulajit Oulussa | MMA, potkunyrkkeily, BJJ, lukkopaini`,
    template: `%s | ${site.brand.shortName} Oulu`,
  },
  description: site.brand.description,
  keywords: [
    "kamppailulajit Oulu",
    "kickboxing Oulu",
    "potkunyrkkeily Oulu",
    "MMA Oulu",
    "BJJ Oulu",
    "brasilialainen jujutsu Oulu",
    "lukkopaini Oulu",
    "submission wrestling Oulu",
    "kamppailulajit Pohjois-Pohjanmaa",
    "Värtön liikuntahalli",
    "kamppailuseura Oulu",
  ],
  openGraph: {
    type: "website",
    locale: "fi_FI",
    siteName: site.brand.name,
    title: `${site.brand.name} — kamppailulajit Oulussa`,
    description: site.brand.description,
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — kamppailulajit Oulussa`,
    description: site.brand.description,
  },
  alternates: {
    canonical: "https://kickboxingteam.com",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={`${inter.variable} ${bebas.variable}`}>
      <body>
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Hyppää sisältöön
        </a>
        {children}
      </body>
    </html>
  );
}
