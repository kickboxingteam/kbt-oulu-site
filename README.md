# Kickboxing Team Oulu — verkkosivu

Yhden sivun seuraesittely Next.js + Tailwind -pinolla. Tumma teema, mobile-first, ei evästeitä.

## Pikastartti

```bash
npm install
cp .env.example .env.local   # täytä NEXT_PUBLIC_SCHEDULE_CSV_URL myöhemmin
npm run dev
```

Avaa http://localhost:3000.

## Skriptit

| Komento | Mitä tekee |
| --- | --- |
| `npm run dev` | Käynnistää kehitysserverin |
| `npm run build` | Tuotantobuildi (Vercel ajaa tämän) |
| `npm run start` | Ajaa buildatun version paikallisesti |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript-tarkistus |

## Sisällön päivitys ilman koodia

### 1. Tekstit, hinnat, yhteystiedot — `content/site.json`

Yksi tiedosto, kaikki tekstit. Avaa, muokkaa, tallenna, committaa. Vercel buildaa automaattisesti.

Skeema:

- `brand` — seuran nimi, tagline, kuvaus
- `contact` — sähköposti, puhelin, IBAN, osoite, Maps-linkit
- `social` — Instagram-, Facebook-, Twitter-URL:t
- `lajit` — lajit (id, name, icon, description). `icon` voi olla `swords`, `shield`, `flame`, `users`
- `valmentajat` — nimi, rooli, bio (lisätään myöhemmin)
- `hinnasto` — kausimaksut. `featured: true` korostaa kortin
- `hinnastoNotes` — lisähuomiot hinnaston alle
- `lisamaksut` — Jäsenmaksu, Kertamaksu yms. korttirivi Hinnaston alla
- `peruskurssit` — peruskurssin tagline, intro, askeleet, vaatimukset, hinnat. `seasonNote` näyttää kausibannerin (jätä tyhjäksi piilottamiseen).
- `aloita` — "Näin aloitat" 3-step + Maksuohjeet (IBAN, viestiformaatti, maksutavat) + Hyvä tietää -kortit (tauotus, yksityistunnit, vakuutus + Suomisport-linkki). 3-step näkyy ennen Hinnastoa, Maksuohjeet + Hyvä tietää sen jälkeen.
- `media` — lehdistöjuttujen lista (otsikko, kuvaus, julkaisija, URL, kuva, julkaisupäivä)

### 1b. Media-osio — uuden jutun lisääminen

1. Tallenna juttukuva `public/images/media/`-kansioon, esim. `lehti-2026-05.jpg`.
   Kuvasuhde 5:3 näyttää siisteimmältä (esim. 1000×600 px).
2. Avaa `content/site.json`, lisää `media`-listan alkuun uusi objekti:
   ```json
   {
     "title": "Jutun otsikko",
     "excerpt": "Lyhyt kuvaus 1–2 lausetta.",
     "publisher": "Lehden nimi",
     "url": "https://...",
     "image": "/images/media/lehti-2026-05.jpg",
     "imageAlt": "Kuvateksti",
     "publishedAt": "2026-05-15"
   }
   ```
3. Committaa, pushaa — Vercel deployaa automaattisesti

### 2. Treeniajat — Google Sheets

Aikataulu päivittyy automaattisesti ~10 minuutin välein (Next.js ISR).

**Sheetin asetukset:**

1. Luo Google Sheets, jossa sarakkeet järjestyksessä:
   `Päivä | Aika alkaa | Aika loppuu | Laji | Ohjaaja | Sali`
2. **Tiedosto → Jaa → Julkaise verkkoon**
3. Valitse koko dokumentti, muoto **CSV**, paina **Julkaise**
4. Kopioi annettu URL
5. Vie URL Vercelin ympäristömuuttujaan `NEXT_PUBLIC_SCHEDULE_CSV_URL`
6. Paikallisesti: lisää `.env.local`-tiedostoon

Jos muuttujaa ei ole, sivu näyttää `content/schedule-fallback.json` -tiedoston ja korostaa että automaattipäivitys ei ole käytössä.

**Sallitut päivien nimet:** Maanantai, Tiistai, Keskiviikko, Torstai, Perjantai, Lauantai, Sunnuntai. Muut päivien nimet näytetään listan loppuun.

### 3. Logo & hero-tausta

- Logo: `public/images/logo.png` (käytetään Navissa ja footerissa)
- Hero-tausta: `public/images/hero-bg.jpg`

Korvaa tiedostot suoraan, säilytä samat tiedostonimet.

Jos uudessa logossa on valkoinen tausta, voit poistaa sen läpinäkyväksi:

```bash
node scripts/remove-white-bg.mjs public/images/logo.png public/images/logo.png 18
```

Toleranssi (viimeinen luku) säätää kuinka lähellä valkoista pikseli muuttuu läpinäkyväksi — 18 on hyvä oletus, nosta jos jotain valkeaa jää näkyviin.

## Hakemistorakenne

```
app/                Next.js App Router (layout, etusivu, globals.css)
components/         Sivun osiot (Nav, Hero, Lajit, ...)
content/            Sisältötiedostot (site.json, schedule-fallback.json)
lib/                Tyypit ja Sheets-haku
public/images/      Kuvat
```

## Tekniikka

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (CSS-pohjainen `@theme`)
- Lucide-ikonit (SVG, ei Font Awesomea)
- Fontit `next/font` -kautta (Inter + Bebas Neue)
- ISR `revalidate: 600` — etusivu päivittyy 10 min välein
- Ei localStoragea, ei evästebanneria, ei kolmansien osapuolten skriptejä paitsi Google Mapsin iframe

## Saavutettavuus

- Suomenkielinen `<html lang="fi">`
- Skip-linkki sisältöön
- Semanttiset landmarkit (`header`, `nav`, `main`, `footer`, `address`, `table` + `caption`)
- Fokuskehys kaikilla interaktiivisilla elementeillä
- Kuvilla `alt`-tekstit, ikoneilla `aria-hidden`

## Tietosuoja

Sivut eivät kerää henkilötietoja eivätkä käytä evästeitä, joten evästebanneria ei tarvita.
Google Mapsin iframe latautuu kun kävijä vierittää sinne (`loading="lazy"`).

## Hakukoneindeksointi

Ympäristömuuttuja `NEXT_PUBLIC_ALLOW_INDEX` ohjaa indeksointia:

- **Asettamatta tai `false`** → `robots.txt` blokkaa kaikki hakukoneet ja sivu lähettää `<meta name="robots" content="noindex, nofollow">`. Käytä Vercelin testi-URL:eissä.
- **`true`** → sallii indeksoinnin. Aseta vasta kun sivut viedään lopulliselle `kickboxingteam.com`-domainille.

## Deploy

1. Push GitHubiin
2. Vercel: Import → valitse repo
3. Ympäristömuuttujat:
   - `NEXT_PUBLIC_SCHEDULE_CSV_URL` (kun Sheets-CSV on saatavilla)
   - `NEXT_PUBLIC_ALLOW_INDEX=false` testi-URL:lle
4. Lopulliseen tuotantoon: yhdistä `kickboxingteam.com` Vercelin domain settingsissä,
   Cloudflare DNS → CNAME Verceliin, ja vaihda `NEXT_PUBLIC_ALLOW_INDEX=true`
