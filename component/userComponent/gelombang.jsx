"use client";

export default function PeriodePendaftaran() {
  return (
    <div className="w-full py-20 bg-gradient-to-b from-[#f8fafc] to-[#eef3f9]">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#15518a] tracking-tight mb-6">
          Periode Pendaftaran
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Pilih periode pendaftaran yang sesuai dan ketahui rincian biaya lengkapnya
        </p>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Gelombang 1 - Highlighted */}
          <div className="relative">
            {/* Ribbon */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-[#15518a] text-white px-6 py-2 rounded-lg shadow-lg font-bold text-sm">
                REKOMENDASI
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#15518a]/20 hover:border-[#15518a] transition-all duration-300 overflow-hidden h-full">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#15518a] to-[#1e3a8a] p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Gelombang 1</h3>
                <p className="text-blue-100 text-lg">01 Oktober 2025 — 28 Februari 2026</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">Rp 4.300.000</span>
                  <span className="text-blue-100 text-sm">Total Pendaftaran</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                {/* Biaya Pokok */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-200">
                    Rincian Biaya Pendaftaran
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: "Gedung Sarpras Sekolah", amount: "1.800.000" },
                      { label: "Dana Praktek Siswa", amount: "700.000" },
                      { label: "Administrasi & Kegiatan", amount: "800.000" },
                      { label: "Seragam Kejuruan & Olahraga", amount: "400.000" },
                      { label: "Iuran Pendidikan Juli 2026", amount: "600.000" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-semibold text-gray-900">Rp {item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Section */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[#15518a]/5 to-[#1e3a8a]/5 rounded-xl border border-[#15518a]/10">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total Biaya Pendaftaran</span>
                    <span className="text-2xl font-bold text-[#15518a]">Rp 4.300.000</span>
                  </div>
                </div>

                {/* Seragam Koperasi */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-semibold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#15518a] rounded-full"></span>
                    Pembelian Terpisah di Koperasi TB
                  </h5>
                  <div className="space-y-2">
                    {[
                      { label: "Kemeja Biru", amount: "150.000" },
                      { label: "Seragam Jurusan", amount: "150.000" },
                      { label: "Dasi & Atribut", amount: "150.000" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{item.label}</span>
                        <span className="font-semibold text-gray-800 text-sm">Rp {item.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 text-sm">Total Seragam Koperasi</span>
                      <span className="font-bold text-gray-800">Rp 450.000</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Harga dapat berubah sesuai ketentuan koperasi
                  </p>
                </div>

                {/* Total Keseluruhan */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[#15518a] to-[#1e3a8a] rounded-xl text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Keseluruhan</span>
                    <span className="text-2xl font-bold">Rp 4.750.000</span>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">
                    Biaya pendaftaran + seragam koperasi
                  </p>
                </div>

                {/* Catatan Pembayaran */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h6 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Informasi Pembayaran
                  </h6>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#15518a] font-bold">•</span>
                      <span>Minimal pembayaran awal: <span className="font-semibold">Rp 3.000.000</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#15518a] font-bold">•</span>
                      <span>Pelunasan hingga akhir Februari 2026</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#15518a] font-bold">•</span>
                      <span>Biaya formulir: <span className="font-semibold">Rp 250.000</span> (sebelum mengisi form)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#15518a] font-bold">•</span>
                      <span>Rekening BSI: 7222352643 a.n PPDB SMK TARUNA BHAKTI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Gelombang 2 */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-[#15518a]/30 transition-all duration-300 overflow-hidden h-full">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Gelombang 2</h3>
                <p className="text-gray-300 text-lg">01 Maret 2026 — 09 Juli 2026</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">Rp 4.450.000</span>
                  <span className="text-gray-300 text-sm">Total Pendaftaran</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                {/* Biaya Pokok */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-200">
                    Rincian Biaya Pendaftaran
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: "Gedung Sarpras Sekolah", amount: "1.950.000" },
                      { label: "Dana Praktek Siswa", amount: "700.000" },
                      { label: "Administrasi & Kegiatan", amount: "800.000" },
                      { label: "Seragam Kejuruan & Olahraga", amount: "400.000" },
                      { label: "Iuran Pendidikan Juli 2026", amount: "600.000" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-semibold text-gray-900">Rp {item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total Biaya Pendaftaran</span>
                    <span className="text-2xl font-bold text-gray-900">Rp 4.450.000</span>
                  </div>
                </div>

                {/* Seragam Koperasi */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-semibold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Pembelian Terpisah di Koperasi TB
                  </h5>
                  <div className="space-y-2">
                    {[
                      { label: "Kemeja Biru", amount: "150.000" },
                      { label: "Seragam Jurusan", amount: "150.000" },
                      { label: "Dasi & Atribut", amount: "150.000" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{item.label}</span>
                        <span className="font-semibold text-gray-800 text-sm">Rp {item.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 text-sm">Total Seragam Koperasi</span>
                      <span className="font-bold text-gray-800">Rp 450.000</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Harga dapat berubah sesuai ketentuan koperasi
                  </p>
                </div>

                {/* Total Keseluruhan */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Keseluruhan</span>
                    <span className="text-2xl font-bold">Rp 4.900.000</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    Biaya pendaftaran + seragam koperasi
                  </p>
                </div>

                {/* Catatan Pembayaran */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h6 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Informasi Pembayaran
                  </h6>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-800 font-bold">•</span>
                      <span>Minimal pembayaran awal: <span className="font-semibold">Rp 3.000.000</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-800 font-bold">•</span>
                      <span>Pelunasan hingga akhir Februari 2026</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-800 font-bold">•</span>
                      <span>Biaya formulir: <span className="font-semibold">Rp 250.000</span> (sebelum mengisi form)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-800 font-bold">•</span>
                      <span>Rekening BSI: 7222352643 a.n PPDB SMK TARUNA BHAKTI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#15518a]/10 to-[#1e3a8a]/10 px-6 py-4 rounded-xl border border-[#15518a]/20">
            <span className="text-3xl">💡</span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">
                Hemat <span className="text-[#15518a] font-bold">Rp 150.000</span> dengan mendaftar di Gelombang 1
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Selain lebih murah, Anda juga mendapatkan prioritas pemilihan jurusan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}