export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
        <p className="text-gray-600 mt-2">
          Kamu tidak memiliki izin untuk mengakses halaman ini.
        </p>

        <a
          href="/"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
