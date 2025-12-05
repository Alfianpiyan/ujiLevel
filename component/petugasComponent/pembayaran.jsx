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
      await loadData();
      
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
    setShowActions(prev => ({
      ...prev,
      [id]: true
    }));
  }

  function handleCancelAction(id) {
    setShowActions(prev => ({
      ...prev,
      [id]: false
    }));
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Verifikasi Pendaftaran PPDB</h1>
          <p className="text-gray-600 mt-1">Kelola dan verifikasi pendaftaran calon siswa</p>
        </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Menunggu Verifikasi</p>
            <p className="text-3xl font-bold text-gray-900">
              {data.filter(item => !item.status_verifikasi || item.status_verifikasi === "pending").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Terverifikasi</p>
            <p className="text-3xl font-bold text-gray-900">
              {data.filter(item => item.status_verifikasi === "verifikasi").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Ditolak</p>
            <p className="text-3xl font-bold text-gray-900">
              {data.filter(item => item.status_verifikasi === "tolak").length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#15518a] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Daftar Pendaftar</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    No. Pendaftaran
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    Berkas
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center text-gray-400">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm">Belum ada data pendaftar</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 border-r">
                        {item.nomor_pendaftaran}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900 border-r">
                        {item.nama_lengkap}
                      </td>

                      <td className="px-6 py-4 border-r">
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
                                className="inline-flex items-center px-2 py-1 rounded text-xs bg-[#15518a] text-white hover:bg-[#0f3a5f] transition"
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
                                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-200 text-gray-500"
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

                      <td className="px-6 py-4 border-r">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          item.status_verifikasi === "verifikasi"
                            ? "bg-green-100 text-green-700"
                            : item.status_verifikasi === "tolak"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {item.status_verifikasi === "verifikasi"
                            ? "Terverifikasi"
                            : item.status_verifikasi === "tolak"
                            ? "Ditolak"
                            : "Menunggu"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {!showActions[item.id] ? (
                            <button
                              onClick={() => handleUpdateClick(item.id)}
                              className="px-3 py-2 rounded-lg text-sm bg-[#15518a] hover:bg-[#0f3a5f] text-white transition"
                            >
                              Update
                            </button>
                          ) : (
                            <>
                              {item.status_verifikasi !== "verifikasi" && (
                                <button
                                  onClick={() => updateStatus(item.id, "verifikasi")}
                                  disabled={updating === item.id}
                                  className="px-3 py-2 rounded-lg text-sm bg-green-600 hover:bg-green-700 text-white transition"
                                >
                                  {updating === item.id ? "Memproses..." : "Verifikasi"}
                                </button>
                              )}

                              {item.status_verifikasi !== "tolak" && (
                                <button
                                  onClick={() => updateStatus(item.id, "tolak")}
                                  disabled={updating === item.id}
                                  className="px-3 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 text-white transition"
                                >
                                  {updating === item.id ? "Memproses..." : "Tolak"}
                                </button>
                              )}

                              <button
                                onClick={() => handleCancelAction(item.id)}
                                className="px-3 py-2 rounded-lg text-sm bg-gray-500 hover:bg-gray-600 text-white transition"
                              >
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