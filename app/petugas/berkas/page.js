"use client";

import Sidebar from "@/component/petugas/sidebarpetugas";

export default function Page() {
  const berkas = [
    { nama: "Budi", kk: true, akta: true, foto: false },
    { nama: "Siti", kk: true, akta: true, foto: true },
  ];

  return (
    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Verifikasi Berkas</h1>

        <table className="w-full bg-white rounded-xl shadow border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">KK</th>
              <th className="p-3 border">Akta</th>
              <th className="p-3 border">Foto</th>
            </tr>
          </thead>

          <tbody>
            {berkas.map((b, i) => (
              <tr key={i}>
                <td className="p-3 border">{b.nama}</td>
                <td className="p-3 border">{b.kk ? "✔" : "✘"}</td>
                <td className="p-3 border">{b.akta ? "✔" : "✘"}</td>
                <td className="p-3 border">{b.foto ? "✔" : "✘"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
