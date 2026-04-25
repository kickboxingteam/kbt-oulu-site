import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Lajit from "@/components/Lajit";
import Valmentajat from "@/components/Valmentajat";
import Hinnasto from "@/components/Hinnasto";
import Treeniajat from "@/components/Treeniajat";
import Sijainti from "@/components/Sijainti";
import Media from "@/components/Media";
import Yhteystiedot from "@/components/Yhteystiedot";
import Footer from "@/components/Footer";

export const revalidate = 600;

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Lajit />
        <Valmentajat />
        <Hinnasto />
        <Treeniajat />
        <Sijainti />
        <Media />
        <Yhteystiedot />
      </main>
      <Footer />
    </>
  );
}
