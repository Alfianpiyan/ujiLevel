"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RiwayatPembayaran() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function loadData() {
    const res = await fetch("/api/pembayaran", { cache: "no-store" });
    const data = await res.json();
    setPayments(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateStatus(id, status) {
    setUpdatingId(id);

    const res = await fetch(`/api/pembayaran/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setUpdatingId(null);

    if (!res.ok) {
      alert("Gagal update status!");
      return;
    }

    // reload data
    loadData();
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Riwayat Pembayaran</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Nomor Pendaftaran</th>
              <th className="border p-3">Nama</th>
              <th className="border p-3">Tanggal Upload</th>
              <th className="border p-3">Bukti Pembayaran</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((item) => (
              <tr key={item.id}>
                <td className="border p-3">{item.nomor_pendaftaran}</td>
                <td className="border p-3">{item.nama_lengkap}</td>

                <td className="border p-3">
                  {item.tanggal_upload
                    ? new Date(item.tanggal_upload).toLocaleDateString("id-ID")
                    : "-"}
                </td>

                <td className="border p-3">
                  {item.bukti_pembayaran ? (
                    <Image
                      src={item.bukti_pembayaran}
                      alt="Bukti Pembayaran"
                      width={80}
                      height={80}
                      className="rounded border"
                    />
                  ) : (
                    <span className="text-gray-500">Tidak ada</span>
                  )}
                </td>

                <td className="border p-3">
                  {item.status_pembayaran === "verifikasi" ? (
                    <span className="text-green-600 font-semibold">
                      ✔ Terverifikasi
                    </span>
                  ) : item.status_pembayaran === "tolak" ? (
                    <span className="text-red-600 font-semibold">
                      ✘ Ditolak
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      ⏳ Pending
                    </span>
                  )}
                </td>

                <td className="border p-3 space-x-2">
                  <button
                    onClick={() => updateStatus(item.id, "verifikasi")}
                    disabled={updatingId === item.id}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    {updatingId === item.id ? "..." : "Verifikasi"}
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "tolak")}
                    disabled={updatingId === item.id}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Belum ada data pembayaran.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
