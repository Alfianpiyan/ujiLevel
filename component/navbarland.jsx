"use client";

import Image from "next/image";

export default function NavbarLand() {
  return (
    <div className="absolute top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        <div className="ml-16 flex items-center gap-3">
          <Image
            src="/images/logo.png"
            width={48}
            height={48}
            alt="Logo Sekolah"
            className="object-contain"
          />
          <div className="text-[13px] leading-tight">
            <div className="font-semibold tracking-wide">Sistem PPDB</div>
            <div className="opacity-90">SMK Taruna Bhakti</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
          <a href="#" className="hover:text-gray-300 transition">About</a>
          <a href="#" className="hover:text-gray-300 transition">Periode</a>
          <a href="#" className="hover:text-gray-300 transition">Fasilitas</a>
          <a href="#" className="hover:text-gray-300 transition">Jurusan</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>

        <div className="flex items-center gap-4 mr-26">

          <button className="
            px-5 py-2 
            bg-blue-900/90
            rounded-full 
            hover:bg-blue-800
            transition
          ">
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
