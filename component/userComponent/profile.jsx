import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export default async function ProfileUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center border border-gray-200">
          <p className="text-lg font-medium text-gray-700">
            Anda harus login terlebih dahulu.
          </p>
        </div>
      </div>
    );
  }

  const userId = session.user.id;

  let rows = [];
  try {
    const conn = await connection();
    [rows] = await conn.execute(
      "SELECT nama, email, NISN, jenis_kelamin, agama, asal_sekolah FROM users WHERE id = ?",
      [userId]
    );
    await conn.end();
  } catch (error) {
    console.error("Database query failed:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-lg text-red-600">
            Terjadi kesalahan saat memuat data profil.
          </p>
        </div>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-lg text-red-600">
            Data profil tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  const user = rows[0];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil User</h1>
          <p className="text-gray-600">Informasi data pribadi Anda</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
              <input
                value={user.nama}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                value={user.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">NISN</label>
              <input
                value={user.NISN ?? ""}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
              <input
                value={user.jenis_kelamin}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Agama</label>
              <input
                value={user.agama}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Asal Sekolah</label>
              <input
                value={user.asal_sekolah}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}