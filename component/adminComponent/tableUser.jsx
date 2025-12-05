"use client";
import { useEffect, useState } from "react";

export default function TableUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15518a]"></div>
              <p className="ml-3 text-gray-600">Memuat data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tabel User</h1>
          <p className="text-gray-600 mt-1">Daftar calon siswa yang terdaftar dalam sistem</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#15518a] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Data Calon Siswa</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    NISN
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                    Asal Sekolah
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Status Verifikasi
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center text-gray-400">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-sm">Belum ada data user</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 border-r">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r">
                        {user.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-r">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-r">
                        {user.NISN}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-r">
                        {user.asal_sekolah}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          user.status_verifikasi === "verifikasi"
                            ? "bg-green-100 text-green-700"
                            : user.status_verifikasi === "tolak"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {user.status_verifikasi === "verifikasi"
                            ? "Terverifikasi"
                            : user.status_verifikasi === "tolak"
                            ? "Ditolak"
                            : "Pending"}
                        </span>
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