"use client";

import { CheckCircleIcon, ArrowRightIcon, DocumentTextIcon, UserPlusIcon, CloudArrowUpIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function PanduanPPDB() {
  const steps = [
    {
      title: "1. Pembayaran Formulir",
      description: "Bayar biaya formulir Rp250.000 ke rekening resmi sekolah",
      icon: DocumentTextIcon,
      color: "bg-[#15518a]",
      duration: "5 menit"
    },
    {
      title: "2. Klik Tombol Daftar",
      description: "Tekan tombol 'Daftar' untuk memulai pendaftaran online",
      icon: UserPlusIcon,
      color: "bg-[#1e3a8a]",
      duration: "2 menit"
    },
    {
      title: "3. Isi Formulir Awal",
      description: "Lengkapi data diri, NISN, alamat, dan informasi orang tua",
      icon: DocumentTextIcon,
      color: "bg-[#15518a]",
      duration: "10-15 menit"
    },
    {
      title: "4. Upload Bukti Bayar",
      description: "Unggah bukti transfer untuk pembuatan akun",
      icon: CloudArrowUpIcon,
      color: "bg-[#1e3a8a]",
      duration: "3 menit"
    },
    {
      title: "5. Buat Akun",
      description: "Sistem akan membuat akun dengan email & password Anda",
      icon: UserPlusIcon,
      color: "bg-[#15518a]",
      duration: "Otomatis"
    },
    {
      title: "6. Login ke Sistem",
      description: "Masuk ke website dengan akun yang telah dibuat",
      icon: ArrowRightIcon,
      color: "bg-[#1e3a8a]",
      duration: "1 menit"
    },
    {
      title: "7. Menu Daftar Ulang",
      description: "Buka menu Daftar Ulang untuk tahap selanjutnya",
      icon: DocumentTextIcon,
      color: "bg-[#15518a]",
      duration: "2 menit"
    },
    {
      title: "8. Upload Berkas",
      description: "Unggah KK, Akta, Ijazah, dan bukti bayar uang pangkal",
      icon: CloudArrowUpIcon,
      color: "bg-[#1e3a8a]",
      duration: "5-10 menit"
    },
    {
      title: "9. Verifikasi",
      description: "Tunggu petugas memeriksa data dan berkas Anda",
      icon: CheckCircleIcon,
      color: "bg-[#15518a]",
      duration: "1-2 hari kerja"
    },
    {
      title: "10. Notifikasi Email",
      description: "Hasil verifikasi dikirim melalui email terdaftar",
      icon: EnvelopeIcon,
      color: "bg-[#1e3a8a]",
      duration: "Instan"
    },
  ];

  return (
    <section id="panduan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Langkah <span className="text-[#15518a]">Pendaftaran</span> PPDB
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Ikuti panduan lengkap ini dari awal hingga akhir untuk mendaftar di SMK Taruna Bhakti
          </p>
        </div>

        {/* Steps Container with Background Pattern */}
        <div className="relative mb-16">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-blue-100/30 rounded-3xl -z-10"></div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Lines */}
                {index < steps.length - 1 && index !== 4 && (
                  <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-45 border-t-2 border-r-2 border-[#15518a] w-2 h-2"></div>
                  </div>
                )}
                
                {/* Step Card */}
                <div className="
                  bg-white rounded-2xl p-6 h-full
                  border border-gray-200
                  shadow-lg hover:shadow-2xl
                  hover:border-[#15518a]
                  transition-all duration-500
                  hover:-translate-y-2
                  group
                ">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`
                      w-12 h-12 rounded-xl ${step.color}
                      flex items-center justify-center
                      shadow-lg
                    `}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="
                      w-8 h-8 rounded-full bg-gray-100
                      flex items-center justify-center
                      font-bold text-gray-700
                      group-hover:bg-blue-100 group-hover:text-[#15518a]
                      transition-colors
                    ">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="
                    inline-flex items-center gap-1
                    bg-gray-100 text-gray-700 text-xs
                    px-3 py-1 rounded-full
                    font-medium
                  ">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{step.duration}</span>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#15518a] to-[#1e3a8a] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Flow Arrows for Desktop */}
          <div className="hidden xl:flex items-center justify-center mt-8">
            <div className="text-gray-400 text-sm font-medium">
              Ikuti panah untuk melanjutkan →
            </div>
          </div>
        </div>

        {/* Process Flow Info */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#15518a] mb-2">10</div>
              <div className="text-gray-700 font-medium">Langkah Pendaftaran</div>
              <div className="text-gray-500 text-sm">Dari awal hingga akhir</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1e3a8a] mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Pendaftaran Online</div>
              <div className="text-gray-500 text-sm">Kapan saja, di mana saja</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#15518a] mb-2">48 Jam</div>
              <div className="text-gray-700 font-medium">Proses Verifikasi</div>
              <div className="text-gray-500 text-sm">Maksimal waktu tunggu</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Sudah Siap Mendaftar?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="
                bg-gradient-to-r from-[#15518a] to-[#1e3a8a]
                text-white px-10 py-4 rounded-xl
                font-bold text-lg
                hover:from-[#0f3d6b] hover:to-[#15518a]
                transition-all duration-300
                hover:scale-105
                shadow-lg hover:shadow-xl
                flex items-center justify-center gap-3
              ">
                <span>Mulai Pendaftaran Sekarang</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="
              bg-white rounded-xl p-6 border border-gray-200
              shadow-sm max-w-2xl mx-auto
            ">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center md:text-left">
                  <div className="text-gray-900 font-bold mb-2">📧 Email Support</div>
                  <a href="mailto:ppdb@smktarunabhakti.sch.id" className="text-[#15518a] hover:text-[#0f3d6b]">
                    ppdb@smktarunabhakti.sch.id
                  </a>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-gray-900 font-bold mb-2">📱 Telepon</div>
                  <a href="tel:02112345678" className="text-[#15518a] hover:text-[#0f3d6b]">
                    (021) 1234-5678
                  </a>
                </div>
              </div>
              <div className="mt-4 text-center text-gray-500 text-sm">
                Tim support kami siap membantu Senin-Jumat, 08.00-16.00 WIB
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}