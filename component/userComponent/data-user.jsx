"use client";

import { useEffect, useState } from "react";

export default function PpdbUserPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch("/api/ppdb");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15518a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum ada data pendaftaran</h2>
          <p className="text-gray-600 mb-6">Silakan daftar terlebih dahulu untuk melanjutkan</p>
          <a
            href="/dashboard/ppdb/daftar"
            className="bg-[#15518a] hover:bg-[#0f3a5f] text-white px-6 py-2 rounded-lg font-medium transition inline-block"
          >
            Daftar Sekarang
          </a>
        </div>
      </div>
    );
  }

  const statusVerifikasi = data.status_verifikasi || "pending";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Status Pendaftaran PPDB</h1>
          <p className="text-gray-600 mt-1">Pantau status pendaftaran dan kelengkapan berkas Anda</p>
        </div>

        {/* Nomor Pendaftaran & Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nomor Pendaftaran</p>
              <p className="text-2xl font-bold text-[#15518a]">{data.nomor_pendaftaran}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Status Verifikasi</p>
              <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${
                statusVerifikasi === "verifikasi"
                  ? "bg-green-100 text-green-800"
                  : statusVerifikasi === "ditolak"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {statusVerifikasi.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Data Pribadi */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nama Lengkap</p>
              <p className="text-gray-900 font-medium mt-1">{data.nama_lengkap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NISN</p>
              <p className="text-gray-900 font-medium mt-1">{data.nisn}</p>
            </div>
          </div>
        </div>

        {/* Berkas Upload */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-[#15518a]">
            <h2 className="text-lg font-semibold text-white">Berkas Upload</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {[
                { label: "Ijazah", file: data.ijazah },
                { label: "Akta", file: data.akta },
                { label: "Kartu Keluarga", file: data.kk },
                { label: "Foto", file: data.foto },
                { label: "Rapor", file: data.rapor },
                { label: "SKL", file: data.skl },
                { label: "Bukti Pembayaran", file: data.bukti_pembayaran },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <span className={`text-xs ${item.file ? "text-green-600" : "text-red-600"}`}>
                        {item.file ? "Tersedia" : "Belum Upload"}
                      </span>
                    </div>
                  </div>
                  
                  {item.file && (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#15518a] hover:bg-[#0f3a5f] text-white text-sm rounded transition"
                    >
                      Lihat
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}