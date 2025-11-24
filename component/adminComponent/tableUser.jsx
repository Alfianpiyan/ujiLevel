"use client";

export default function TableUser() {
  const data = [
    { id: 1, nama: "Budi", email: "budi@example.com" },
    { id: 2, nama: "Siti", email: "siti@example.com" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tabel User</h1>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.nama}</td>
              <td className="p-3">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
