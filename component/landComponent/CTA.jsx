"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Clock, CreditCard, GraduationCap } from "lucide-react";

export default function CTASection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date untuk deadline pendaftaran (2 bulan dari sekarang: 5 Februari 2026)
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

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#15518a] to-[#1e3a8a] rounded-2xl p-8 md:p-12 text-white shadow-xl">
          
          {/* Content */}
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
              href="#daftar"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#15518a] rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#info"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              Info Lengkap
            </a>
          </div>

          {/* Extra Info */}
          <p className="text-center text-blue-100 text-sm mt-6 flex items-center justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
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
  );
}