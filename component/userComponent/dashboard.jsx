"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Clock, GraduationCap, Users, Calendar } from "lucide-react";

export default function Homepage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date("2026-02-05T23:59:59").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const programs = [
    { name: "PPLG", fullName: "Pengembangan Perangkat Lunak & Gim", color: "bg-[#15518a]" },
    { name: "TKJ", fullName: "Teknik Komputer & Jaringan", color: "bg-[#1e3a8a]" },
    { name: "PSPT", fullName: "Produksi & Siaran Televisi", color: "bg-[#15518a]" },
    { name: "TE", fullName: "Teknik Elektro Industri", color: "bg-[#1e3a8a]" },
    { name: "DKV", fullName: "Desain Komunikasi Visual", color: "bg-[#15518a]" },
    { name: "ANIMASI", fullName: "Animasi Kreatif", color: "bg-[#1e3a8a]" }
  ];

  const features = [
    { icon: Users, title: "2000+ Siswa Aktif", desc: "Bergabung dengan ribuan siswa berprestasi" },
    { icon: CheckCircle, title: "95% Kelulusan", desc: "Tingkat kelulusan dan penyerapan kerja tinggi" },
    { icon: GraduationCap, title: "6 Program Keahlian", desc: "Pilihan jurusan sesuai minat dan bakat" }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-[#15518a] via-[#1e3a8a] to-[#0f3d6b] text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full border border-white/30">
                🎓 PPDB Tahun Ajaran 2025/2026
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Raih Masa Depan Cerah<br />
              Bersama <span className="text-blue-200">SMK Taruna Bhakti</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Mencetak lulusan terampil, percaya diri, dan siap kerja dengan 6 program keahlian unggulan berbasis industri 4.0
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#15518a] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="#panduan"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Panduan Pendaftaran
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/20">
                    <Icon className="w-6 h-6 text-blue-200" />
                    <div className="text-left">
                      <p className="text-xl font-bold">{feature.title}</p>
                      <p className="text-xs text-blue-200">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#15518a] to-[#1e3a8a] rounded-2xl p-8 md:p-12 text-white shadow-xl">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Daftar Sekarang untuk Tahun Ajaran 2025/2026
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Raih kesempatan terbatas dan wujudkan masa depan cerah Anda
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  "Kurikulum Berbasis Industri",
                  "Praktik Kerja Nyata",
                  "Sertifikasi Kompetensi",
                  "Fasilitas Modern"
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <p className="text-center text-sm font-semibold mb-4 text-blue-100 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Pendaftaran Ditutup Dalam:
              </p>
              
              <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto">
                {[
                  { value: timeLeft.days, label: "Hari" },
                  { value: timeLeft.hours, label: "Jam" },
                  { value: timeLeft.minutes, label: "Menit" },
                  { value: timeLeft.seconds, label: "Detik" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl md:text-3xl font-bold text-[#15518a]">
                      {String(item.value).padStart(2, '0')}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#15518a] rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="#panduan"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Info Lengkap
              </a>
            </div>

            <p className="text-center text-blue-100 text-sm mt-6 flex items-center justify-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                </svg>
                Pembayaran bisa dicicil
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                Beasiswa tersedia
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              6 Program Keahlian <span className="text-[#15518a]">Unggulan</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pilih jurusan sesuai minat dan bakat Anda. Semua program didukung fasilitas modern dan kurikulum berbasis industri.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-[#15518a] hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${program.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-lg">{program.name}</span>
                </div>
                <h3 className="font-bold text-sm text-gray-900 leading-tight">
                  {program.fullName}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#panduan"
              className="inline-flex items-center gap-2 text-[#15518a] font-semibold hover:text-[#0f3d6b] transition-colors"
            >
              Lihat Detail Program
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-gray-600">
              Temukan jawaban atas pertanyaan Anda
            </p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Bagaimana cara melakukan pendaftaran?", a: "Pendaftaran dilakukan secara online melalui website resmi kami" },
              { q: "Berapa biaya pendaftaran?", a: "Biaya pendaftaran Rp 250.000 dan dapat dicicil" },
              { q: "Apakah ada beasiswa?", a: "Ya, tersedia beasiswa prestasi akademik dan non-akademik" }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#15518a] transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#15518a] text-white rounded-lg font-semibold hover:bg-[#0f3d6b] transition-all"
            >
              Lihat Semua FAQ
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}