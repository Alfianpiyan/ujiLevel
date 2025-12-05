"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef } from 'react';

// Data fasilitas
const items = [
    { title: "Kelas Modern", description: "Ruang kelas yang nyaman dan didukung teknologi terbaru.", img: "/images/ppdb/kelas.jpg" },
    { title: "Kantin Nyaman", description: "Area istirahat yang bersih, luas, dan menyediakan makanan sehat.", img: "/images/ppdb/kantin.jpg" },
    { title: "Studio Perfilman", description: "Fasilitas lengkap untuk produksi film pendek dan videografi.", img: "/images/ppdb/bc.jpg" },
    { title: "Lab Rekayasa Perangkat Lunak (RPL)", description: "Area coding dengan spesifikasi komputer tinggi untuk pengembangan aplikasi.", img: "/images/ppdb/labRPL.jpg" },
    { title: "Ruang Podcast", description: "Studio kedap suara lengkap dengan peralatan rekaman audio mumpuni.", img: "/images/ppdb/podcast.jpg" },
    { title: "Lab Teknik Komputer & Jaringan (TKJ)", description: "Lab praktik instalasi jaringan, server, dan troubleshooting hardware.", img: "/images/ppdb/tkj.jpg" },
    { title: "Studio Animasi", description: "Dilengkapi drawing tablet dan software industri untuk kreasi digital.", img: "/images/ppdb/animasi.jpg" },
    { title: "Aksesibilitas (Lift)", description: "Memastikan kemudahan akses dan mobilitas bagi seluruh warga sekolah.", img: "/images/ppdb/lift.jpg" },
    { title: "Lapangan Olahraga", description: "Lapangan multifungsi yang luas untuk pengembangan fisik dan kegiatan ekstrakurikuler.", img: "/images/ppdb/lapangan.jpg" },
];

export default function FasilitasUnggulanSection() {
  const scrollRef = useRef(null);

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 15px 30px rgba(8, 145, 178, 0.4)",
      borderRadius: "1rem"
    },
  };

  return (
    <section className="w-full py-16 bg-white" id="fasilitas">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header dengan efek Fade In */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#15518a] tracking-tight"
        >
          Fasilitas Unggulan Kami 
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-500 max-w-3xl mx-auto mb-16 text-lg"
        >
          Geser ke samping untuk melihat semua fasilitas modern yang kami sediakan untuk mendukung potensi Anda.
        </motion.p>

        {/* CAROUSEL CONTAINER */}
        <div 
          ref={scrollRef} 
          className="flex space-x-6 overflow-x-scroll px-6 pt-6 snap-x snap-mandatory pb-6"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* CSS untuk menyembunyikan scrollbar */}
          <style jsx global>{`
            .snap-x::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="snap-center flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]"
            >
              {/* CARD ITEM */}
              <div
                className="group relative h-full rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white cursor-grab transition-all duration-300"
              >
                {/* Area Gambar */}
                <div className="h-56 relative w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 25vw"
                    className="object-cover"
                  />
                </div>

                {/* Area Konten Bawah */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#15518a] transition duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* END CAROUSEL CONTAINER */}

      </div>
    </section>
  );
}