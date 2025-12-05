"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#15518a] to-[#0f3d6b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content - 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* KOLOM 1: Logo & Deskripsi */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Logo SMK Taruna Bhakti"
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <h3 className="font-bold text-xl leading-tight">SMK Taruna Bhakti</h3>
                <p className="text-white/80 text-sm">Sistem PPDB</p>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              Mencetak lulusan terampil, percaya diri, dan siap kerja maupun kuliah dengan kompetensi IPTEK dan IMTAQ.
            </p>

            {/* Social Media */}
            <div>
              <p className="text-sm font-semibold mb-3">Ikuti Kami</p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: FaInstagram, color: "#E1306C", link: "#" },
                  { Icon: FaFacebookF, color: "#1877F2", link: "#" },
                  { Icon: FaXTwitter, color: "#000000", link: "#" },
                  { Icon: FaYoutube, color: "#FF0000", link: "#" },
                ].map(({ Icon, color, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all shadow-sm hover:shadow-md hover:scale-110"
                  >
                    <Icon size={18} style={{ color }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM 2: Links & Visi Misi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Tautan Cepat */}
            <div>
              <h4 className="font-semibold mb-4 text-base">Tautan Cepat</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Tentang Kami", link: "#tentang" },
                  { label: "Fasilitas", link: "#fasilitas" },
                  { label: "Pendaftaran", link: "#daftar" },
                  { label: "Periode PPDB", link: "#periode" },
                  { label: "Program Keahlian", link: "#jurusan" },
                  { label: "FAQ", link: "#faq" }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.link}
                      className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      → {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visi & Misi */}
            <div>
              <h4 className="font-semibold mb-4 text-base">Visi & Misi</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-blue-200 mb-1">VISI</p>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Menghasilkan lulusan yang kompeten dalam IPTEK dan IMTAQ.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-200 mb-1">MISI</p>
                  <ul className="text-white/70 text-xs space-y-1 leading-relaxed">
                    <li>• Menumbuhkan semangat kreatifitas</li>
                    <li>• Kurikulum berbasis kompetensi</li>
                    <li>• Sertifikasi kompetensi SDM</li>
                    <li>• Layanan prima manajemen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 3: Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Hubungi Kami</h4>
            <div className="space-y-4">
              
              {/* Alamat */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <MapPin size={18} className="text-blue-200" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-200 mb-1">Alamat</p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Jl. Pekapuran No. 123, Depok, Jawa Barat
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail size={18} className="text-blue-200" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-200 mb-1">Email</p>
                  <a 
                    href="mailto:taruna@smktarunabhakti.net"
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    taruna@smktarunabhakti.net
                  </a>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone size={18} className="text-blue-200" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-200 mb-1">Telepon</p>
                  <a 
                    href="tel:+62218744810"
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    (021) 8744810
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar - Copyright */}
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
            <p className="text-white/60 text-xs">
              © 2025 SMK Taruna Bhakti. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}