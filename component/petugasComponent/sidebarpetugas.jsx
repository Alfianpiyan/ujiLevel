export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5 space-y-6">
      <h1 className="text-2xl font-bold">PPDB Petugas</h1>

      <nav className="space-y-2">
        <a className="block p-3 rounded hover:bg-gray-700" href="/admin">Dashboard</a>
        <a className="block p-3 rounded hover:bg-gray-700" href="/petugas/pendaftar">Data Pendaftar</a>
        <a className="block p-3 rounded hover:bg-gray-700" href="/petugas/pembayaran">Verifikasi Pembayaran</a>
        <a className="block p-3 rounded hover:bg-gray-700" href="/petugas/berkas">Verifikasi Berkas</a>
        <a className="block p-3 rounded hover:bg-gray-700" href="/petugas/jurusan">Daftar Jurusan</a>
        <a className="block p-3 rounded hover:bg-gray-700" href="/petugas/profile">Profile</a>
      </nav>
    </aside>
  );
}
