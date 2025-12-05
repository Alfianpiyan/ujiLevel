"use client";

import { useEffect, useState } from "react";
import { 
  User, BookOpen, Upload, 
  FileText, CreditCard, Calendar,
  GraduationCap, Home, Image,
  AlertCircle, CheckCircle
} from "lucide-react";

export default function PpdbForm() {
  const [jurusanList, setJurusanList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/jurusan")
      .then((res) => res.json())
      .then((res) => setJurusanList(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);

    const res = await fetch("/api/ppdb", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setLoading(false);
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Notice */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#15518a] to-[#1e3a8a] rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6" />
              <h2 className="text-xl font-bold">Gelombang 1</h2>
            </div>
            <p className="text-blue-100">Periode 01 Oktober 2025 — 28 Februari 2026</p>
            <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="font-semibold">Total Biaya Pendaftaran: <span className="text-amber-300">Rp 4.750.000</span></p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-[#15518a] to-[#1e3a8a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Formulir Pendaftaran PPDB</h1>
                <p className="text-blue-100 text-sm mt-1">Isi data dengan lengkap dan benar sesuai dokumen</p>
              </div>
            </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            
            {/* DATA DIRI */}
            <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#15518a] rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Data Diri Siswa</h2>
                  <p className="text-gray-600 text-sm">Informasi pribadi siswa</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    name="nama_lengkap"
                    type="text"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-colors"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">NISN</label>
                  <input
                    name="nisn"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-colors"
                    placeholder="Masukkan 10 digit NISN"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tanggal Lahir
                  </label>
                  <input
                    name="tanggal_lahir"
                    type="date"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-colors"
                    required
                  />
                </div>
              </div>
            </section>

            {/* JURUSAN */}
            <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#15518a] rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pilihan Jurusan</h2>
                  <p className="text-gray-600 text-sm">Pilih jurusan yang diminati</p>
                </div>
              </div>

              <div className="space-y-2">
                <select 
                  name="jurusan_id" 
                  className="w-full border-2 border-gray-200 p-3.5 rounded-lg focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-colors bg-white"
                  required
                >
                  <option value="">-- Pilih Jurusan --</option>

                  {Array.isArray(jurusanList) &&
                    jurusanList.map((j) => (
                      <option key={j.id} value={j.id} className="py-2">
                        {j.nama_jurusan}
                      </option>
                    ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Pilihan jurusan menentukan pembelajaran dan karir Anda di masa depan
                </p>
              </div>
            </section>

            {/* UPLOAD WAJIB */}
            <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#15518a] rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Upload Dokumen Wajib</h2>
                  <p className="text-gray-600 text-sm">Dokumen utama yang diperlukan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "ijazah", label: "Ijazah / SKL", icon: FileText },
                  { name: "akta", label: "Akta Kelahiran", icon: FileText },
                  { name: "kk", label: "Kartu Keluarga", icon: Home },
                  { name: "foto", label: "Pas Foto 3x4", icon: Image },
                ].map((doc, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {doc.label}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#15518a] transition-colors cursor-pointer relative">
                      <input
                        name={doc.name}
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 bg-blue-100 rounded-full mb-2">
                          <doc.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Klik untuk upload</p>
                        <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AKADEMIK */}
            <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#15518a] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Data Akademik</h2>
                  <p className="text-gray-600 text-sm">Dokumen akademik siswa</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "rapor", label: "Buku Rapor", icon: BookOpen },
                  { name: "skl", label: "Surat Keterangan Lulus", icon: FileText },
                ].map((doc, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {doc.label}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#15518a] transition-colors cursor-pointer relative">
                      <input
                        name={doc.name}
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 bg-green-100 rounded-full mb-2">
                          <doc.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Klik untuk upload</p>
                        <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PEMBAYARAN */}
            <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#15518a] rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Bukti Pembayaran</h2>
                  <p className="text-gray-600 text-sm">Upload bukti pembayaran formulir</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Bukti Pembayaran
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#15518a] transition-colors cursor-pointer relative">
                  <input
                    name="bukti_pembayaran"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-amber-100 rounded-full mb-2">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Klik untuk upload bukti bayar</p>
                    <p className="text-xs text-gray-500 mt-1">Foto struk transfer atau bukti pembayaran</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Catatan */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-amber-800">Catatan Penting</h3>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Pastikan semua data yang diisi benar sesuai dokumen asli</li>
                    <li>• File yang diupload harus jelas dan terbaca</li>
                    <li>• Biaya formulir Rp 250.000 sudah termasuk dalam total biaya pendaftaran</li>
                    <li>• Formulir tidak dapat diubah setelah disubmit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#15518a] to-[#1e3a8a] text-white rounded-xl font-semibold text-lg hover:from-[#0f3d6b] hover:to-[#0f3d6b] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Daftar Sekarang</span>
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Dengan menekan tombol ini, Anda menyetujui syarat dan ketentuan yang berlaku
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}