"use client";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PanduanPPDB() {
  const steps = [
    {
      title: "1. Pembayaran Formulir",
      description: "Bayar biaya formulir Rp250.000 ke rekening resmi sekolah",
    },
    {
      title: "2. Klik Tombol Daftar",
      description: "Tekan tombol 'Daftar' untuk memulai pendaftaran online",
    },
    {
      title: "3. Isi Formulir Awal",
      description: "Lengkapi data diri, NISN, alamat, dan informasi orang tua",
    },
    {
      title: "4. Upload Bukti Bayar",
      description: "Unggah bukti transfer untuk pembuatan akun",
    },
    {
      title: "5. Buat Akun",
      description: "Sistem akan membuat akun dengan email & password Anda",
    },
    {
      title: "6. Login ke Sistem",
      description: "Masuk ke website dengan akun yang telah dibuat",
    },
    {
      title: "7. Menu Daftar Ulang",
      description: "Buka menu Daftar Ulang untuk tahap selanjutnya",
    },
    {
      title: "8. Upload Berkas",
      description: "Unggah KK, Akta, Ijazah, dan bukti bayar uang pangkal",
    },
    {
      title: "9. Verifikasi",
      description: "Tunggu petugas memeriksa data dan berkas Anda",
    },
    {
      title: "10. Notifikasi Email",
      description: "Hasil verifikasi dikirim melalui email terdaftar",
    },
  ];

  return (
    <section id="panduan" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Minimalist */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Panduan Pendaftaran
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ikuti langkah-langkah berikut untuk proses pendaftaran yang lancar
          </p>
        </div>

        {/* Steps - Clean Vertical Layout */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 group">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center 
                              rounded-full bg-indigo-100 border-2 border-indigo-200
                              group-hover:bg-indigo-500 group-hover:border-indigo-600
                              transition-all duration-300">
                  <span className="font-bold text-indigo-700 group-hover:text-white">
                    {index + 1}
                  </span>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-indigo-200 ml-6 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8 group-last:pb-0">
                <div className="bg-gray-50 rounded-lg p-6 hover:bg-indigo-50 
                              border border-gray-200 hover:border-indigo-200
                              transition-all duration-300 group-hover:shadow-sm">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA - Centered */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg
                           font-semibold hover:bg-indigo-700 transition-colors
                           duration-200 shadow-sm hover:shadow-md">
            Mulai Pendaftaran
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Butuh bantuan? <span className="text-indigo-600 font-medium">ppdb@sekolah.sch.id</span>
          </p>
        </div>

      </div>
    </section>
  );
}