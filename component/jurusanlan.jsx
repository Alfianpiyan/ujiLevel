"use client";

import { useState } from "react";

export default function Jurusan() {
  const jurusan = [
    {
      nama: "Teknik Komputer dan Jaringan (TKJ)",
      logo: "/images/logo/tkj.png",
      deskripsi:
        "Jurusan yang fokus pada administrasi jaringan, server, dan perangkat komputer.",
      spesifikasi: "Laptop minimal i5 RAM 8GB SSD 512GB",
      seragam: "/images/jurusan/tkj-seragam.png",
    },
    {
      nama: "Rekayasa Perangkat Lunak (RPL)",
      logo: "/images/logo/pplg.png",
      deskripsi:
        "Jurusan yang mempelajari pembuatan aplikasi, website, dan software modern.",
      spesifikasi: "Laptop minimal i5 RAM 8GB SSD 512GB Minimal Gen 10 keatas",
      seragam: "/images/jurusan/rpl-seragam.png",
    },
    {
      nama: "Desain Komunikasi Visual (DKV)",
      logo: "/images/jurusan/dkv-logo.png",
      deskripsi: "Jurusan yang fokus pada desain grafis, ilustrasi, dan brand visual.",
      spesifikasi: "Laptop i7 RAM 16GB SSD 512GB Intel VGA",
      seragam: "/images/jurusan/dkv-seragam.png",
    },
    {
      nama: "Animasi",
      logo: "/images/logo/animasi.png",
      deskripsi:
        "Jurusan yang mempelajari animasi 2D/3D, modeling, dan production pipeline.",
      spesifikasi: "Laptop i7 RAM 16GB SSD 512GB Intel VGA",
      seragam: "/images/jurusan/animasi-seragam.png",
    },
    {
      nama: "Produksi Siaran Program Televisi (PSPT)",
      logo: "/images/logo/broad.png",
      deskripsi: "Jurusan produksi video, broadcasting, audio, dan perfilman.",
      spesifikasi: "Laptop i7 RAM 16GB SSD 512GB Intel VGA",
      seragam: "/images/jurusan/pspt-seragam.png",
    },
    {
      nama: "Teknik Elektronika Industri (TEI)",
      logo: "/images/logo/tei.png",
      deskripsi:
        "Jurusan di bidang otomasi industri, elektronika, dan sistem kontrol.",
      spesifikasi: "Laptop minimal i5 RAM 8GB SSD 512GB",
      seragam: "/images/jurusan/tei-seragam.png",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % jurusan.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + jurusan.length) % jurusan.length);
  };

  return (
    <div className="relative w-full py-12 overflow-hidden bg-white">
      <div className="text-center mb-10 px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Program Jurusan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pilih jurusan yang sesuai dengan minat dan bakat Anda
        </p>
      </div>

      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {jurusan.map((j, i) => (
          <div key={i} className="w-full shrink-0 px-5 md:px-20">
            <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between shadow-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-center w-full md:w-auto">
                <div className="w-32 h-32 bg-blue-50 rounded-xl flex items-center justify-center p-4 border border-blue-100">
                  <img
                    src={j.logo}
                    alt={j.nama}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {j.nama}
                  </h3>
                  <div className="w-12 h-1 bg-blue-500 rounded-full mt-2 mx-auto md:mx-0"></div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {j.deskripsi}
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-2 bg-gray-50 rounded-lg px-4 py-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium text-gray-700 text-sm">{j.spesifikasi}</p>
                </div>
              </div>

              <div className="flex justify-center w-full md:w-auto">
                <div className="w-28 h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                  <img
                    src={j.seragam}
                    alt={`Seragam ${j.nama}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-300 transition-colors p-3 rounded-full shadow-sm"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-300 transition-colors p-3 rounded-full shadow-sm"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex justify-center mt-8 gap-2">
        {jurusan.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === i ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      <div className="text-center mt-4 text-gray-500 text-sm">
        {index + 1} / {jurusan.length}
      </div>
    </div>
  );
}