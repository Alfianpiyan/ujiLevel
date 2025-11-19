"use client";

import { MapPin, Phone, Mail} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo SMK Taruna Bhakti"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <h3 className="font-bold">Sistem PPDB</h3>
                <p className="text-white/80 text-sm">SMK Taruna Bhakti</p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Mencetak lulusan terampil, percaya diri, dan siap kerja maupun kuliah.
            </p>

            <div className="flex items-center gap-3">
              {['instagram', 'facebook', 'twitter', 'youtube'].map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                >
                  <i className={`ri-${platform}-fill text-base`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-sm">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              {['Tentang', 'Fasilitas', 'Daftar', 'Periode', 'Jurusan'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                  Visi
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Menghasilkan lulusan yang kompeten dalam IPTEK dan IMTAQ serta mampu bersaing 
                  pada tingkat nasional dan global.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                  Misi
                </h4>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>• Menumbuhkan semangat kreatifitas, bersinergi dan kompetitif kepada seluruh warga sekolah</li>
                  <li>• Melaksanakan kurikulum melalui pembelajaran dan penilaian berbasis kompetensi, berbasis wirausaha dan berwawasan lingkungan</li>
                  <li>• Meningkatkan kualitas sumber daya manusia melalui sertifikasi kompetensi tingkat nasional dan internasional</li>
                  <li>• Mengembangkan potensi peserta didik melalui kegiatan minat dan bakat dan pembinaan kedisiplinan</li>
                  <li>• Menerapkan layanan prima dalam pengelolaan sekolah melalui sistem manajemen mutu</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-300" />
                <span className="text-xs">Jl. Pekapuran No. 123, Depok</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-300" />
                <span className="text-xs">taruna@smktarunabhakti.net</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-300" />
                <span className="text-xs">(021) 8744810</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-white/60 text-xs">
                ©2025 SMK Taruna Bhakti
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}