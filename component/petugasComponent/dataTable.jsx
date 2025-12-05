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

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Data Pendaftar</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Nama</th>
            <th className="p-3 border">NISN</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                Belum ada pendaftar
              </td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-3 border">{item.nama_lengkap}</td>
              <td className="p-3 border">{item.nisn}</td>
              <td
                className={`p-3 border font-semibold ${
                  item.status_verifikasi === "verifikasi"
                    ? "text-green-600"
                    : item.status_verifikasi === "tolak"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {item.status_verifikasi || "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
