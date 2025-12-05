"use client";

import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-20 py-10 md:py-28 grid md:grid-cols-2 items-center gap-14">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1
            data-aos="fade-up"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            Pendidikan <span className="text-[#15518a]">Terbaik</span> untuk Masa Depan{" "}
            <span className="text-[#15518a]">Gemilang</span>
          </h1>

          <p
            data-aos="fade-up"
            className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl"
          >
            SMK Taruna Bhakti membuka pendaftaran peserta didik baru dengan visi
            mencetak lulusan berkarakter yang unggul di bidang teknologi dan industri modern.
          </p>

          <div className="hidden md:flex gap-3">
            <Link
              href="/Daftar"
              className="px-15 py-3 text-xl font-medium rounded-full border bg-[#15518a] border-[#4EA3D8] text-[#ffff] hover:bg-[#ffff] hover:text-[#15518a] transition-all duration-400"
            >
              Daftar
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE + CARDS (KEPALA SEKOLAH) */}
        <div
          data-aos="fade-left"
          className="relative w-full max-w-[600px] mx-auto h-[500px] flex items-center justify-center"
        >
          {/* IMAGE */}
          <Image
            src="/images/ppdb/gedungTb.jpg"
            alt="Gedung Sekolah"
            fill
            className="object-cover rounded-4xl drop-shadow-xl hover:scale-[1.04] transition-all duration-700"
            priority
          />

          {/* CARDS ON TOP OF IMAGE */}
          <div className="absolute inset-0 flex flex-row items-center justify-center gap-4 px-6">

            {/* CARD 1 */}
            <div
              data-aos="fade-up"
              className="group flex items-start gap-3 rounded-xl border border-[#4A88C7]/40 bg-white/90 backdrop-blur-sm
              px-5 py-4 shadow-md hover:shadow-lg hover:border-[#4A88C7] hover:-translate-y-[2px] transition-all cursor-pointer w-[85%] max-w-[300px] duration-700"
            >
              <div className="min-w-[42px] h-[42px] text-[#15518a] flex justify-center items-center rounded-md bg-[#173e6720]">
                <Clock />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-[15px]">Gelombang Satu</p>
                <p className="text-xs text-gray-600">17 Okt 2025 - 6 Jan 2026</p>
                <p className="text-xs text-gray-800 font-medium">
                  Biaya: <span className="font-semibold">Rp 4.300.000</span>
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="group flex items-start gap-3 rounded-xl border border-gray-300 bg-white/90 backdrop-blur-sm
              px-5 py-4 shadow-md hover:shadow-lg hover:border-gray-400 hover:-translate-y-[2px] transition-all cursor-pointer w-[85%] max-w-[300px] duration-700"
            >
              <div className="min-w-[42px] h-[42px] text-[#15518a] flex justify-center items-center rounded-md bg-gray-100">
                <Calendar size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-[15px]">Gelombang Dua</p>
                <p className="text-xs text-gray-600">12 Jan 2026 - 16 Jul 2026</p>
                <p className="text-xs text-gray-800 font-medium">
                  Biaya: <span className="font-semibold">Rp 4.500.000</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}