"use client";

import Image from "next/image";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Jurusan() {
  
  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const dataJurusan = [
    {
      singkatan: "PPLG",
      nama: "Pengembangan Perangkat Lunak & Gim",
      logo: "/images/logoJurusan/PPLG.jpg",
      deskripsi:
        "Fokus pada proses merancang, membangun, mengembangkan, dan memelihara aplikasi (mobile/web) serta game berbasis teknologi terkini.",
      warna: "bg-[#15518a]",
    },
    {
      singkatan: "TKJ",
      nama: "Teknik Komputer & Jaringan",
      logo: "/images/logoJurusan/lgtkj.jpg",
      deskripsi:
        "Membekali siswa dengan kemampuan merakit, mengkonfigurasi, mengelola jaringan server, hingga memperbaiki perangkat keras komputer.",
      warna: "bg-[#1e3a8a]",
    },
    {
      singkatan: "PSPT",
      nama: "Produksi & Siaran Televisi",
      logo: "/images/logoJurusan/lgbc.jpg",
      deskripsi:
        "Mencetak talenta dalam penyiaran, produksi audiovisual, sinematografi, dan manajemen konten media kreatif profesional.",
      warna: "bg-[#15518a]",
    },
    {
      singkatan: "TE",
      nama: "Teknik Elektro Industri",
      logo: "/images/logoJurusan/TE.jpg",
      deskripsi:
        "Mempelajari teknik instalasi listrik, kelistrikan modern, otomasi industri, dan troubleshooting sistem elektrik.",
      warna: "bg-[#1e3a8a]",
    },
    {
      singkatan: "DKV", 
      nama: "Desain Komunikasi Visual (DKV)",
      logo: "/images/logoJurusan/DKV.png",
      deskripsi:
        "Menggabungkan visual, audio, animasi, hingga video untuk menciptakan karya desain dan komunikasi digital yang kreatif dan berdampak.",
      warna: "bg-[#15518a]",
    },
    {
      singkatan: "ANIMASI",
      nama: "Animasi Kreatif",
      logo: "/images/logoJurusan/ANIMASI2.jpg", 
      deskripsi:
        "Mencetak animator handal yang menguasai desain karakter, storyboard, modeling 3D, serta teknik pembuatan film animasi 2D dan 3D.",
      warna: "bg-[#1e3a8a]",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Pilih Masa Depanmu: <span className="text-[#15518a]">Konsentrasi Keahlian Unggulan</span>
          </h2>
          <p className="mt-4 text-gray-600 text-xl">
            Kami menawarkan 6 program keahlian yang relevan dengan revolusi industri 4.0, didukung kurikulum berbasis industri dan fasilitas mutakhir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"> 
          {dataJurusan.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className="
                group relative rounded-xl overflow-hidden h-full min-h-[350px]
                shadow-xl bg-white border border-gray-200
                transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]
                hover:border-[#15518a]
              "
            >
              
              <div className="p-6 text-center h-full">
                <div className="relative h-24 w-full flex items-center justify-center mb-4">
                  <Image
                    src={item.logo}
                    alt={item.singkatan}
                    width={100}
                    height={100}
                    className="
                      object-contain transition-all duration-500
                      group-hover:scale-125 group-hover:opacity-10
                    "
                  />
                </div>
                
                <span className={`text-xs font-bold uppercase rounded-full px-3 py-1 ${item.warna} text-white`}>
                  {item.singkatan}
                </span>
                <h3 className="text-xl font-extrabold mt-3 text-gray-900 leading-snug">
                  {item.nama}
                </h3>
              </div>
            
              <div
                className={`
                  absolute inset-0 w-full h-full p-6
                  flex flex-col items-start justify-end
                  text-white transition-all duration-500 opacity-0
                  group-hover:opacity-100
                  bg-gradient-to-t from-[#15518a] via-[#1e3a8a]/95 to-[#15518a]/90
                `}
              >
                <div className="space-y-3">
                    <p className={`text-base font-semibold border-l-4 pl-3 border-blue-300`}>
                        {item.singkatan}
                    </p>
                    <p className="text-sm leading-relaxed">
                        {item.deskripsi}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}