"use client";

import NavbarLand from "@/component/landComponent/navbarland";
import HeaderLand from "@/component/landComponent/headerlan";
import PeriodePendaftaran from "@/component/landComponent/fasilitas";
import Fasilitas from "@/component/landComponent/fasilitas";
import Jurusan from "@/component/landComponent/jurusanlan";
import Footer from "@/component/landComponent/footer";
import Partners from "@/component/landComponent/collablan";
import FAQ from "@/component/landComponent/faq";
import PanduanPPDB from "@/component/landComponent/panduanPpdb";
import CTASection from "@/component/landComponent/CTA";

export default function Home() {
  return (
    <main className="relative">
      <NavbarLand />
      <HeaderLand />
      <Fasilitas />
      <PanduanPPDB />
      <Jurusan />
      <Partners />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
