"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { registerUser } from "@/app/lib/action";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-3xl from-blue-50 via-white to-purple-50 py-12 px-4">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto relative">
        
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-[#15518a] hover:text-[#0f3d6b] transition-colors bg-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* Header Card */}
        <div className="bg-gradient-to-r from-[#15518a] to-[#1e3a8a] rounded-2xl p-8 mb-8 shadow-xl text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Formulir Pendaftaran Siswa Baru
              </h1>
              <p className="text-blue-100 mt-1">
                SMK Taruna Bhakti • Tahun Ajaran 2025/2026
              </p>
            </div>
          </div>
          <p className="text-blue-100">
            Lengkapi formulir di bawah ini dengan data yang benar dan teliti. Pastikan semua informasi akurat sebelum mengirim.
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl font-medium text-sm flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
          
          <form
            action={async (formData) => {
              setLoading(true);
              setMessage("");

              try {
                const res = await registerUser(formData);

                if (res?.error) {
                  setMessage(res.error);
                  setLoading(false);
                  return;
                }

                router.push("/success");
              } catch (err) {
                console.error(err);
                setMessage("Gagal mengirim data. Coba lagi.");
                setLoading(false);
              }
            }}
            className="space-y-10"
          >

            {/* Section 1: Data Calon Siswa */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-[#15518a]">
                <div className="w-8 h-8 rounded-lg bg-[#15518a] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Data Calon Siswa
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Nama Lengkap" name="nama" placeholder="Masukkan nama lengkap" />
                <Input type="email" label="Email Aktif" name="email" placeholder="contoh@email.com" />
                <Input label="NISN" name="nisn" placeholder="Nomor Induk Siswa Nasional" />
                <Input label="Asal Sekolah" name="asal_sekolah" placeholder="SMP/MTs asal" />
                <Input label="Tempat Lahir" name="tempat" placeholder="Kota tempat lahir" />
                <Input type="date" label="Tanggal Lahir" name="tanggal_lahir" />
              </div>
            </div>

            {/* Section 2: Data Pribadi */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-[#15518a]">
                <div className="w-8 h-8 rounded-lg bg-[#15518a] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Data Pribadi
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
                  <select 
                    name="jenis_kelamin" 
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-all"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                
                <Input label="Agama" name="agama" placeholder="Contoh: Islam" />
                <Input label="Nama Orang Tua/Wali" name="nama_orang_tua" placeholder="Nama lengkap" />
                <Input label="Pekerjaan Orang Tua/Wali" name="pekerjaan_orang_tua" placeholder="Pegawai Swasta" />
              </div>
              
              <div className="mt-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Alamat Lengkap Tempat Tinggal
                </label>
                <textarea
                  name="alamat"
                  required
                  placeholder="Masukkan alamat lengkap..."
                  className="w-full px-4 py-3 min-h-[120px] border-2 border-gray-200 rounded-xl bg-white focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-all"
                />
              </div>
            </div>

            {/* Section 3: Kontak & Berkas */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-[#15518a]">
                <div className="w-8 h-8 rounded-lg bg-[#15518a] text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Kontak & Berkas
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="No HP Orang Tua" name="no_hp_ortu" type="tel" placeholder="08xxxxxxxxxx" />
                <Input label="No HP Calon Siswa" name="no_hp_casis" type="tel" placeholder="08xxxxxxxxxx" />
                <Input label="Buat Password" name="password" type="password" placeholder="Minimal 6 karakter" />
                <Input 
                  label="Nama Pengirim / Nama Akun Bank"
                  name="nama_pengirim"
                  placeholder="Nama sesuai pada bukti transfer"
                />
                <Input 
                  label="Nominal Pembayaran"
                  type="number"
                  name="nominal"
                  placeholder="Contoh: 150000"
                />
              </div>

              {/* Upload File */}
              <div className="mt-6 p-6 border-2 border-dashed border-[#15518a] rounded-xl bg-blue-50/50">
                <label className="font-semibold text-[#15518a] text-base mb-3 block">
                  Upload Bukti Pembayaran
                </label>

                <input
                  type="file"
                  name="bukti_pembayaran"
                  required
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#15518a] file:text-white hover:file:bg-[#0f3d6b] cursor-pointer transition-all"
                />

                <p className="text-xs text-gray-500 mt-3">
                  Format: JPG, PNG, PDF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg text-lg transition-all ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#15518a] to-[#1e3a8a] hover:from-[#0f3d6b] hover:to-[#15518a] hover:scale-[1.02] hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim Data...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Daftar Sekarang
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

// Input Component
function Input({ label, name, type = "text", placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-all"
      />
    </div>
  );
}