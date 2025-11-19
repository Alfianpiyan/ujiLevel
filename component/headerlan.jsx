"use client";

import Image from "next/image";

export default function HeaderLand() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/images/background.jpg"
        alt="Gedung Sekolah"
        fill
        className="object-cover brightness-85"
        priority
      />

      {/* overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-white">

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-6 ml-15">
              <button className="px-4 py-2 bg-white/50 backdrop-blur-xs text-white rounded-full text-sm shadow-md border border-white/40 hover:bg-white/40 transition">
                Layanan Sekolah
              </button>
            </div>

            <h1 className="text-3xl ml-15 md:text-4xl font-bold leading-tight max-w-xl">
              Penerimaan Peserta Didik Baru SMK Taruna Bhakti TP 2025/2026
            </h1>

            <p className="mt-4 ml-15 text-lg text-white/90 max-w-xl">
              Pembelajaran praktik, fasilitas lengkap, dan dukungan dunia industri untuk mencetak lulusan yang terampil, percaya diri, dan siap kerja maupun kuliah.
            </p>

            <button className="mt-8 ml-15 px-8 py-3 bg-white text-blue-900 font-medium rounded-full shadow-md hover:bg-gray-100 transition">
              Daftar Sekarang
            </button>
          </div>

          <div className=" ml-22 flex flex-col gap-6 md:max-w-sm">

            <div className="bg-white/50 backdrop-blur-xs text-white p-6 rounded-2xl shadow-lg border border-white/40">
              <h3 className="font-semibold text-lg">Gelombang 1</h3>
              <p className="mt-1 text-sm">
                01 Oktober 2025 - 28 Februari 2026
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-xs text-white p-6 rounded-2xl shadow-lg border border-white/40">
              <h3 className="font-semibold text-lg">Gelombang 2</h3>
              <p className="mt-1 text-sm">
                0 1 Maret – 09 Juli 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
