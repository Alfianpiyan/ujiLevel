"use client";
import { useEffect, useState } from "react";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/ppdb/pendaftar", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15518a]"></div>
          <p className="ml-3 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-[#15518a] px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Data Pendaftar</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-r">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-r">
                NISN
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center text-gray-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-sm">Belum ada pendaftar</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {item.nama_lengkap}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-r">
                    {item.nisn}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.status_verifikasi === "verifikasi"
                          ? "bg-green-100 text-green-700"
                          : item.status_verifikasi === "tolak"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status_verifikasi || "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}