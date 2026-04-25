import siteData from "@/content/site.json";

export type Address = {
  venue: string;
  street: string;
  postalCode: string;
  city: string;
};

export type Laji = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type Valmentaja = {
  name: string;
  role: string;
  bio: string | string[];
  image?: string;
  instagram?: string;
  instagramHandle?: string;
};

export type HintaTier = {
  id: string;
  name: string;
  price: string;
  perks: string[];
  featured: boolean;
};

export type MediaItem = {
  title: string;
  excerpt: string;
  publisher: string;
  url: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
};

export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneTel: string;
    iban: string;
    address: Address;
    mapsEmbedUrl: string;
    mapsLinkUrl: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
    twitter: string;
  };
  lajit: Laji[];
  valmentajat: Valmentaja[];
  hinnasto: HintaTier[];
  hinnastoNotes: string[];
  media: MediaItem[];
};

export const site: SiteContent = siteData as SiteContent;
