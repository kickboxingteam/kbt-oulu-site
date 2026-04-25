import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { site } from "@/lib/content";
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
    default: `${site.brand.name} — MMA, potkunyrkkeily, thainyrkkeily, BJJ`,
    template: `%s | ${site.brand.shortName}`,
  },
  description: site.brand.description,
  keywords: [
    "kickboxing",
    "potkunyrkkeily",
    "MMA",
    "thainyrkkeily",
    "BJJ",
    "Oulu",
    "kamppailulajit",
  ],
  openGraph: {
    type: "website",
    locale: "fi_FI",
    siteName: site.brand.name,
    title: `${site.brand.name} — kamppailulajeja Oulussa`,
    description: site.brand.description,
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — kamppailulajeja Oulussa`,
    description: site.brand.description,
  },
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEX === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true, nosnippet: true },
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
