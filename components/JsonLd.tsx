import { site } from "@/lib/content";

const SITE_URL = "https://kickboxingteam.com";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    name: site.brand.name,
    alternateName: site.brand.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    description: site.brand.description,
    foundingDate: "2000",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      postalCode: site.contact.address.postalCode,
      addressLocality: site.contact.address.city,
      addressCountry: "FI",
    },
    location: {
      "@type": "Place",
      name: site.contact.address.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.address.street,
        postalCode: site.contact.address.postalCode,
        addressLocality: site.contact.address.city,
        addressCountry: "FI",
      },
    },
    telephone: site.contact.phoneTel,
    email: site.contact.email,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube].filter(Boolean),
    sport: site.lajit.map((l) => l.name),
    areaServed: {
      "@type": "City",
      name: site.contact.address.city,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
