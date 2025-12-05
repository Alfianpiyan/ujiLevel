import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export default async function ProfileUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow max-w-sm text-center">
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-red-600">
            Terjadi kesalahan saat memuat data profil.
          </p>
        </div>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-red-600">
            Data profil tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  const user = rows[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profil User</h1>
          <p className="text-gray-600 mt-1">Informasi data pribadi Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header Card */}
          <div className="bg-[#15518a] px-6 py-4 rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user.nama}</h2>
                <p className="text-blue-100 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  value={user.nama}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">NISN</label>
                <input
                  value={user.NISN ?? "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                value={user.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
                <input
                  value={user.jenis_kelamin}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agama</label>
                <input
                  value={user.agama}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Asal Sekolah</label>
              <input
                value={user.asal_sekolah}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}