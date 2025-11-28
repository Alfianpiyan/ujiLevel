"use client";
import { useEffect, useState } from "react";

export default function PembayaranPetugas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [showActions, setShowActions] = useState({});

  async function loadData() {
    try {
      const res = await fetch("/api/pembayaran", { cache: "no-store" });
      const result = await res.json();
      setData(result);
      
      // Reset showActions berdasarkan data terbaru
      const initialShowActions = {};
      result.forEach(item => {
        initialShowActions[item.id] = false;
      });
      setShowActions(initialShowActions);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateStatus(id, newStatus) {
    setUpdating(id);
    try {
      await fetch(`/api/pembayaran/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_verifikasi: newStatus }),
      });
      await loadData(); // Refresh data setelah update
      
      // Sembunyikan kembali tombol aksi setelah update
      setShowActions(prev => ({
        ...prev,
        [id]: false
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  }

  function handleUpdateClick(id) {
    // Tampilkan tombol verifikasi/tolak untuk item ini
    setShowActions(prev => ({
      ...prev,
      [id]: true
    }));
  }

  function handleCancelAction(id) {
    // Sembunyikan tombol verifikasi/tolak
    setShowActions(prev => ({
      ...prev,
      [id]: false
    }));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data pembayaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Verifikasi Pembayaran PPDB</h1>
          <p className="text-gray-600 mt-2">Kelola dan verifikasi pembayaran calon siswa</p>
        </div>

        {/* Info Panel */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Menunggu Verifikasi</p>
                <p className="text-2xl font-bold text-blue-900">
                  {data.filter(item => !item.status_verifikasi || item.status_verifikasi === "pending").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Terverifikasi</p>
                <p className="text-2xl font-bold text-green-900">
                  {data.filter(item => item.status_verifikasi === "verifikasi").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">Ditolak</p>
                <p className="text-2xl font-bold text-red-900">
                  {data.filter(item => item.status_verifikasi === "tolak").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nomor Pendaftaran
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Berkas
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-600">Belum ada data pembayaran</p>
                        <p className="text-gray-500 mt-1">Data pembayaran akan muncul di sini setelah calon siswa melakukan upload</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                      {/* Nomor Pendaftaran */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.nomor_pendaftaran}
                        </div>
                      </td>

                      {/* Nama Lengkap */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.nama_lengkap}
                        </div>
                      </td>

                      {/* Berkas */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {[
                            { key: "ijazah", label: "Ijazah" },
                            { key: "kk", label: "KK" },
                            { key: "akta", label: "Akta" },
                            { key: "rapor", label: "Rapor" },
                            { key: "foto", label: "Foto" },
                            { key: "skl", label: "SKL" },
                            { key: "bukti_pembayaran", label: "Bukti Bayar" },
                          ].map(({ key, label }) =>
                            item[key] ? (
                              <a
                                key={key}
                                href={item[key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition duration-200"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {label}
                              </a>
                            ) : (
                              <span
                                key={key}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {label}
                              </span>
                            )
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status_verifikasi === "verifikasi"
                            ? "bg-green-100 text-green-800"
                            : item.status_verifikasi === "tolak"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status_verifikasi === "verifikasi"
                            ? "Terverifikasi"
                            : item.status_verifikasi === "tolak"
                            ? "Ditolak"
                            : "Menunggu"}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col sm:flex-row gap-2">
                          {!showActions[item.id] ? (
                            // Tampilkan tombol Update saja
                            <button
                              onClick={() => handleUpdateClick(item.id)}
                              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Update
                            </button>
                          ) : (
                            // Tampilkan tombol Verifikasi, Tolak, dan Batal
                            <>
                              {item.status_verifikasi !== "verifikasi" && (
                                <button
                                  onClick={() => updateStatus(item.id, "verifikasi")}
                                  disabled={updating === item.id}
                                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition duration-200"
                                >
                                  {updating === item.id ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                      Memproses...
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      Verifikasi
                                    </>
                                  )}
                                </button>
                              )}

                              {item.status_verifikasi !== "tolak" && (
                                <button
                                  onClick={() => updateStatus(item.id, "tolak")}
                                  disabled={updating === item.id}
                                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition duration-200"
                                >
                                  {updating === item.id ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                      Memproses...
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                      Tolak
                                    </>
                                  )}
                                </button>
                              )}

                              <button
                                onClick={() => handleCancelAction(item.id)}
                                className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gray-600 hover:bg-gray-700 text-white transition duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Batal
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}