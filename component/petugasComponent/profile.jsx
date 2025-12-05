import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export default async function ProfilePetugasPage() {
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

  // pastikan role petugas
  if (session.user.role !== "petugas_ppdb" && session.user.role !== "petugas") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow max-w-sm text-center">
          <p className="text-lg font-medium text-gray-700">
            Anda bukan petugas.
          </p>
        </div>
      </div>
    );
  }

  const petugasId = session.user.id;

  let rows = [];
  try {
    const conn = await connection();
    [rows] = await conn.execute(
      "SELECT id_petugas, nama, email, no_telp, role FROM petugas WHERE id_petugas = ?",
      [petugasId]
    );
    await conn.end();
  } catch (err) {
    console.error(err);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-red-600">
            Gagal mengambil data.
          </p>
        </div>
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-gray-700">Data petugas tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const petugas = rows[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profil Petugas</h1>
          <p className="text-gray-600 mt-1">Informasi data petugas PPDB</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header Card */}
          <div className="bg-[#15518a] px-6 py-4 rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{petugas.nama}</h2>
                <p className="text-blue-100 text-sm">{petugas.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  value={petugas.nama}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <input
                  value={petugas.role}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                value={petugas.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
              <input
                value={petugas.no_telp || "-"}
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