"use client";

import { useEffect, useState } from "react";

export default function PpdbForm() {
  const [paymentMethod, setPaymentMethod] = useState("full"); // default: full (lunas)
  const [jurusanList, setJurusanList] = useState([]);

  useEffect(() => {
    fetch("/api/jurusan")
      .then((res) => res.json())
      .then((res) => setJurusanList(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    // VALUE DIKIRIM SUDAH SESUAI ENUM MYSQL:
    // "full" atau "cicil"

    const res = await fetch("/api/ppdb", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="bg-green-50 border border-green-300 text-green-800 p-4 rounded-lg mb-6">
        <p className="font-semibold">
          Gelombang 1 : Periode 01 Oktober 2025 — 28 Februari 2026
        </p>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Pendaftaran PPDB</h1>
        <p className="text-gray-600">Isi data dengan lengkap dan benar</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* =========================== */}
        {/* ==== DATA DIRI SISWA ====== */}
        {/* =========================== */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Data Diri Siswa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                name="nama_lengkap"
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
              <input
                name="nisn"
                maxLength={10}
                pattern="[0-9]{10}"
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
              <input
                name="tanggal_lahir"
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              />
            </div>
          </div>
        </section>

        {/* ============================ */}
        {/* ==== PILIH JURUSAN ========= */}
        {/* ============================ */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Pilihan Jurusan</h2>

          <select name="jurusan_id" className="w-full border p-3 rounded-lg" required>
            <option value="">-- Pilih Jurusan --</option>

            {Array.isArray(jurusanList) &&
              jurusanList.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.nama_jurusan}
                </option>
              ))}
          </select>
        </section>

        {/* ============================ */}
        {/* ==== UPLOAD BERKAS ========= */}
        {/* ============================ */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Upload Dokumen Wajib</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Ijazah / SKL
              <input name="ijazah" type="file" required />
            </label>

            <label>
              Akta
              <input name="akta" type="file" required />
            </label>

            <label>
              Kartu Keluarga
              <input name="kk" type="file" required />
            </label>

            <label>
              Pas Foto
              <input name="foto" type="file" required />
            </label>
          </div>
        </section>

        {/* ============================ */}
        {/* ==== AKADEMIK ============== */}
        {/* ============================ */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Data Akademik</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Buku Rapor
              <input name="rapor" type="file" required />
            </label>

            <label>
              SK Nilai
              <input name="sk_nilai" type="file" required />
            </label>
          </div>
        </section>

        {/* =============================== */}
        {/* ==== METODE PEMBAYARAN ========= */}
        {/* =============================== */}
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Metode Pembayaran</h2>

          <select
            name="metode_pembayaran"
            className="w-full border p-3 rounded-lg bg-white"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="full">Lunas</option>
            <option value="cicil">Cicilan</option>
          </select>

          {/* CICILAN */}
          {paymentMethod === "cicil" && (
            <div className="mt-4">
              <label>Bukti Pembayaran Awal (min 3 juta)</label>
              <input name="bukti_pembayaran" type="file" required />
            </div>
          )}

          {/* FULL */}
          {paymentMethod === "full" && (
            <div className="mt-4">
              <label>Bukti Pembayaran Lunas</label>
              <input name="bukti_pembayaran" type="file" required />
            </div>
          )}
        </section>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
          >
            Daftar Sekarang
          </button>
        </div>
      </form>
    </div>
  );
}
