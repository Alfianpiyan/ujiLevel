import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export default async function ProfileUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white p-10 rounded-xl shadow-2xl max-w-sm text-center border-t-4 border-blue-500">
          <p className="text-xl font-semibold text-gray-800">
            Anda harus login terlebih dahulu.
          </p>
        </div>
      </div>
    );
  }

  const userId = session.user.id;

  let rows = [];
  try {
    // PANGGIL connection() DULU
    const conn = await connection();
    [rows] = await conn.execute(
      "SELECT nama, email, no_hp_casis FROM users WHERE id = ?",
      [userId]
    );
    await conn.end(); // Tutup koneksi
  } catch (error) {
    console.error("Database query failed:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500 p-8 bg-white shadow-md rounded-lg">
          Terjadi kesalahan saat memuat data profil.
        </p>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500 p-8 bg-white shadow-md rounded-lg">
          Data profil tidak ditemukan.
        </p>
      </div>
    );
  }

  const user = rows[0];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* header & form */}
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Profil User
        </h1>
        <form className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div>
            <label className="block font-medium text-gray-700">Nama</label>
            <input
              value={user.nama}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              value={user.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">No HP</label>
            <input
              value={user.no_hp_casis}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
