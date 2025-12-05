"use client";

import NavbarLand from "@/component/landComponent/navbarland";
import HeaderLand from "@/component/landComponent/headerlan";
import PeriodePendaftaran from "@/component/landComponent/periodeland";
import Fasilitas from "@/component/landComponent/fasilitaslan";
import Jurusan from "@/component/landComponent/jurusanlan";
import Footer from "@/component/landComponent/footer";
import Partners from "@/component/landComponent/collablan";
import FAQ from "@/component/landComponent/faq";
import PanduanPPDB from "@/component/landComponent/panduanPpdb";

export default function Home() {
  return (
    <main className="relative">
      <NavbarLand />
      <HeaderLand />
      <PeriodePendaftaran />
      <PanduanPPDB />
      <Jurusan />
      <FAQ />
      <Partners />
      <Footer />
    </main>
  );
}
