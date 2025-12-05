"use client";
import { useEffect, useState } from "react";

export default function TablePetugas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    no_telp: "",
    role: "petugas"
  });

  async function loadData() {
    try {
      const res = await fetch("/api/petugas", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      // Filter hanya petugas, tidak termasuk admin
      setData(json.filter(p => p.role === "petugas"));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/petugas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Petugas berhasil ditambahkan!");
        setShowModal(false);
        setForm({ nama: "", email: "", password: "", no_telp: "", role: "petugas" });
        loadData(); // Refresh data
      } else {
        const data = await res.json();
        alert(data.error || "Gagal menambahkan petugas");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tabel Petugas</h1>
            <p className="text-gray-600 mt-1">Daftar petugas yang terdaftar dalam sistem</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#15518a] hover:bg-[#0f3a5f] text-white rounded-lg transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Petugas
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#15518a] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Data Petugas</h2>
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
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    No. Telepon
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center text-gray-400">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-sm">Belum ada data petugas</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((petugas) => (
                    <tr key={petugas.id_petugas} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 border-r">
                        {petugas.id_petugas}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r">
                        {petugas.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-r">
                        {petugas.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {petugas.no_telp || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Tambah Petugas */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="bg-[#15518a] px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold text-white">Tambah Petugas Baru</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15518a] focus:border-[#15518a]"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15518a] focus:border-[#15518a]"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15518a] focus:border-[#15518a]"
                  placeholder="Minimal 6 karakter"
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={form.no_telp}
                  onChange={(e) => setForm({ ...form, no_telp: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15518a] focus:border-[#15518a]"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-[#15518a] hover:bg-[#0f3a5f] text-white rounded-lg transition disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm({ nama: "", email: "", password: "", no_telp: "", role: "petugas" });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}