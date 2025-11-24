export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard User</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-gray-500">Status Pendaftaran</h2>
          <p className="text-xl font-bold">Sedang Diproses</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-gray-500">Pembayaran</h2>
          <p className="text-xl font-bold">Belum Upload</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-gray-500">Daftar Ulang</h2>
          <p className="text-xl font-bold">Belum Tersedia</p>
        </div>

      </div>
    </div>
  );
}
