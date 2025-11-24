"use client";

export default function TablePetugas() {
  const data = [
    { id: 1, nama: "Aldi", role: "Verifikator" },
    { id: 2, nama: "Nadia", role: "Admin Dokumen" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tabel Petugas</h1>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.nama}</td>
              <td className="p-3">{p.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
