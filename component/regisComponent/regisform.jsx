"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { registerUser } from "@/app/lib/action";

// --- START: KOMPONEN UTAMA ---
export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background.jpg"
          alt="Gedung Sekolah"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-blue-200 transition-colors z-20 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:bg-black/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      {/* Form Container */}
      <div className="mt-10 w-full max-w-6xl bg-white/95 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 lg:p-10 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Formulir Pendaftaran Siswa Baru
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Isi data diri Anda dengan benar dan teliti
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="p-4 bg-red-100 text-red-800 text-center border border-red-300 rounded-lg font-medium text-sm">
            {message}
          </div>
        )}

        {/* FORM */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >

          {/* Kolom 1 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-2">
              Data Calon Siswa
            </h3>
            <Input label="Nama Lengkap" name="nama" placeholder="Masukkan nama lengkap" />
            <Input type="email" label="Email Aktif" name="email" placeholder="contoh@email.com" />
            <Input label="NISN" name="nisn" placeholder="Nomor Induk Siswa Nasional" />
            <Input label="Asal Sekolah" name="asal_sekolah" placeholder="SMP/MTs asal" />
            <Input label="Tempat Lahir" name="tempat" placeholder="Kota tempat lahir" />
          </div>

          {/* Kolom 2 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-2">
              Data Pribadi
            </h3>

            <Input type="date" label="Tanggal Lahir" name="tanggal_lahir" />

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
              <select 
                name="jenis_kelamin" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <Input label="Agama" name="agama" placeholder="Contoh: Islam" />
            <Input label="Nama Orang Tua/Wali" name="nama_orang_tua" placeholder="Nama lengkap" />
            <Input label="Pekerjaan Orang Tua/Wali" name="pekerjaan_orang_tua" placeholder="Pegawai Swasta" />
          </div>

          {/* Kolom 3 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-2">
              Kontak & Berkas
            </h3>

            <Input label="No HP Orang Tua" name="no_hp_ortu" type="tel" placeholder="08xxxxxxxxxx" />
            <Input label="No HP Calon Siswa" name="no_hp_casis" type="tel" placeholder="08xxxxxxxxxx" />
            <Input label="Buat Password" name="password" type="password" placeholder="Minimal 6 karakter" />

            {/* Upload File */}
            <div className="p-4 border border-blue-200 rounded-xl bg-blue-50 flex flex-col gap-3 shadow-inner">
              <label className="font-semibold text-blue-700 text-sm">
                Upload Bukti Pembayaran
              </label>

              <input
                type="file"
                name="bukti_pembayaran"
                required
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200 cursor-pointer"
              />

              <p className="text-xs text-gray-500">
                Format: JPG, PNG, PDF. Max 2MB.
              </p>
            </div>

            {/* Tambahan Baru */}
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

          {/* Full Address */}
          <div className="lg:col-span-3 flex flex-col pt-4 border-t border-gray-200">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap Tempat Tinggal
            </label>
            <textarea
              name="alamat"
              required
              placeholder="Masukkan alamat lengkap..."
              className="w-full px-4 py-3 min-h-[120px] border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="lg:col-span-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg text-xl transition ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed flex items-center justify-center gap-3" 
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mengirim Data...</span>
                </>
              ) : "Daftar Sekarang"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// --- START: INPUT COMPONENT ---
function Input({ label, name, type = "text", placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
