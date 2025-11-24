"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Pendaftar</h3>
          <p className="text-4xl font-bold mt-2">120</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Belum Diverifikasi</h3>
          <p className="text-4xl font-bold mt-2">35</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Pembayaran Masuk</h3>
          <p className="text-4xl font-bold mt-2">85</p>
        </div>

      </div>

      {/* Aktivitas Terbaru */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Aktivitas Terbaru</h2>

        <div className="bg-white rounded-xl shadow divide-y">
          <div className="p-4 hover:bg-gray-50 transition">
            <span className="font-medium">Budi</span> mengunggah bukti pembayaran.
          </div>

          <div className="p-4 hover:bg-gray-50 transition">
            <span className="font-medium">Siti</span> melengkapi berkas pendaftaran.
          </div>

          <div className="p-4 hover:bg-gray-50 transition">
            <span className="font-medium">Rani</span> membuat akun baru.
          </div>
        </div>
      </section>

      {/* Info Sistem */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Informasi Sistem</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Status Server</h3>
            <p className="text-green-600 font-semibold">Online</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Total Petugas Aktif</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>
      </section>
    </div>
  );
}
