"use client";

import { useEffect, useState } from "react";

export default function PpdbForm() {
  const [paymentMethod, setPaymentMethod] = useState("Lunas");
  const [jurusanList, setJurusanList] = useState([]);

  useEffect(() => {
    fetch("/api/jurusan")
      .then((res) => res.json())
      .then((res) => setJurusanList(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const res = await fetch("/api/ppdb", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Pendaftaran PPDB</h1>
        <p className="text-gray-600">Isi data dengan lengkap dan benar</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>

        {/* DATA DIRI */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Data Diri Siswa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                name="nama_lengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
              <input
                name="nisn"
                type="text"
                placeholder="10 digit NISN"
                maxLength={10}
                pattern="[0-9]{10}"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
              <input
                name="tanggal_lahir"
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>
        </section>

        {/* PILIH JURUSAN */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Pilihan Jurusan
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Jurusan</label>
            <select
              name="jurusan_id"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              required
            >
              <option value="">-- Pilih Jurusan --</option>

              {Array.isArray(jurusanList) &&
                jurusanList.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.nama_jurusan}
                  </option>
                ))}
            </select>
          </div>
        </section>

        {/* UPLOAD BERKAS */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Upload Dokumen Wajib
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ijazah / SKL
                <input 
                  name="ijazah" 
                  type="file" 
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required 
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Akta Kelahiran
                <input 
                  name="akta" 
                  type="file" 
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required 
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Kartu Keluarga (KK)
                <input 
                  name="kk" 
                  type="file" 
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required 
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Pas Foto
                <input 
                  name="foto" 
                  type="file" 
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required 
                />
              </label>
            </div>
          </div>
        </section>

        {/* AKADEMIK */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Data Akademik
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Buku Rapor
              <input 
                name="rapor" 
                type="file" 
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required 
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Surat Keterangan Nilai Rapor
              <input 
                name="sk_nilai" 
                type="file" 
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required 
              />
            </label>
          </div>
        </section>

        {/* PEMBAYARAN */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Metode Pembayaran
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Metode Pembayaran</label>
            <select
              name="metode_pembayaran"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="Lunas">Lunas</option>
              <option value="Cicilan">Cicilan</option>
            </select>

            {paymentMethod === "Cicilan" && (
              <div className="mt-4 space-y-4">
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium">
                    <span className="font-bold">Note:</span> Minimal pembayaran awal Rp 3.000.000
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bukti Pembayaran Awal
                  </label>
                  <input
                    name="bukti_pembayaran"
                    type="file"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    accept="image/*,.pdf"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload bukti pembayaran awal minimal Rp 3.000.000 (format: JPG, PNG, atau PDF)
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "Lunas" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bukti Pembayaran Lunas
                </label>
                <input
                  name="bukti_pembayaran"
                  type="file"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*,.pdf"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload bukti pembayaran lunas (format: JPG, PNG, atau PDF)
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Daftar Sekarang
          </button>
        </div>
      </form>
    </div>
  );
}