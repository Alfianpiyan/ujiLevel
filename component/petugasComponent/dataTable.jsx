export default function DataTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Data Pendaftar</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Nama</th>
            <th className="p-3 border">NISN</th>
            <th className="p-3 border">Asal Sekolah</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-3 border">Budi Santoso</td>
            <td className="p-3 border">1234567890</td>
            <td className="p-3 border">SMP 5 Depok</td>
            <td className="p-3 border text-green-600 font-bold">Terverifikasi</td>
            <td className="p-3 border">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Detail</button>
            </td>
          </tr>

          <tr>
            <td className="p-3 border">Ani Lestari</td>
            <td className="p-3 border">9876543210</td>
            <td className="p-3 border">SMP 2 Bogor</td>
            <td className="p-3 border text-yellow-600 font-bold">Pending</td>
            <td className="p-3 border">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
