import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Lajit from "@/components/Lajit";
import Valmentajat from "@/components/Valmentajat";
import Peruskurssit from "@/components/Peruskurssit";
import Aloita from "@/components/Aloita";
import Hinnasto from "@/components/Hinnasto";
import Treeniajat from "@/components/Treeniajat";
import Sijainti from "@/components/Sijainti";
import Media from "@/components/Media";
import Yhteystiedot from "@/components/Yhteystiedot";
import Footer from "@/components/Footer";
import MaksuModal from "@/components/MaksuModal";
import LajiModal from "@/components/LajiModal";
import { getPeruskurssiInfo, getPeruskurssiSchedule } from "@/lib/schedule";

export const revalidate = 600;

export default async function HomePage() {
  const [peruskurssiMap, kurssit] = await Promise.all([
    getPeruskurssiInfo(),
    getPeruskurssiSchedule(),
  ]);
  const peruskurssiInfo: Record<string, string> = Object.fromEntries(peruskurssiMap);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Lajit peruskurssiInfo={peruskurssiInfo} />
        <Valmentajat />
        <Peruskurssit kurssit={kurssit} peruskurssiInfo={peruskurssiInfo} />
        <Aloita />
        <Hinnasto />
        <Treeniajat />
        <Media />
        <Sijainti />
        <Yhteystiedot />
      </main>
      <Footer />
      <MaksuModal />
      <LajiModal peruskurssiInfo={peruskurssiInfo} />
    </>
  );
}
