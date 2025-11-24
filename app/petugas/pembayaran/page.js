"use client";

import Sidebar from "@/component/petugas/sidebarpetugas";

export default function Page() {
  const pembayaran = [
    {
      nama: "Budi",
      bukti: "/uploads/budi.jpg",
      status: "Menunggu Verifikasi",
    },
    {
      nama: "Siti",
      bukti: "/uploads/siti.jpg",
      status: "Terverifikasi",
    },
  ];

  return (
    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Verifikasi Pembayaran</h1>

        <div className="space-y-4">
          {pembayaran.map((p, i) => (
            <div key={i} className="p-4 bg-white shadow rounded-xl flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{p.nama}</p>
                <p className="text-sm text-gray-600">{p.status}</p>
              </div>

              <a href={p.bukti} target="_blank" className="text-blue-600 underline">
                Lihat Bukti
              </a>

              <div className="space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded">Setujui</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded">Tolak</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
