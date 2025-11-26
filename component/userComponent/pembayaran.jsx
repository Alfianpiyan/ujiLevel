"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RiwayatPembayaran() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/pembayaran", { cache: "no-store" });
        const data = await res.json();

        // Pastikan selalu array
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal load data pembayaran:", err);
        setPayments([]); // fallback
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Riwayat Pembayaran</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Nomor Pendaftaran</th>
              <th className="border p-3 text-left">Nama</th>
              <th className="border p-3 text-left">Tanggal Upload</th>
              <th className="border p-3 text-left">Bukti Pembayaran</th>
              <th className="border p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Belum ada data pembayaran.
                </td>
              </tr>
            )}

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
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      ⏳ Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
