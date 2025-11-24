import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export default async function ProfileUserPage() {
  // DIPASTIKAN SERVER COMPONENT
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      // Gaya untuk pesan "Anda harus login"
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white p-10 rounded-xl shadow-2xl max-w-sm text-center border-t-4 border-blue-500">
          <svg
            className="w-12 h-12 text-blue-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m18-7V9a3 3 0 00-3-3h-2"
            ></path>
          </svg>
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
    [rows] = await connection.execute(
      "SELECT nama, email, no_hp_casis FROM users WHERE id = ?",
      [userId]
    );
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
        {/* Header Profil */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-100 rounded-full">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900">
            Informasi Akun
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Lihat detail profil Anda yang terdaftar di sistem.
          </p>
        </div>

        {/* Card Konten Utama */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-10">
            {/* Judul Bagian */}
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
              Detail Profil
            </h2>
            
            <form className="space-y-8">
              {/* Field Nama */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center border-b pb-4">
                <label className="text-sm font-semibold text-gray-700 md:col-span-1">
                  Nama Lengkap
                </label>
                <div className="md:col-span-2">
                  <input
                    defaultValue={user.nama}
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 font-medium"
                    readOnly
                  />
                </div>
              </div>

              {/* Field Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center border-b pb-4">
                <label className="text-sm font-semibold text-gray-700 md:col-span-1">
                  Alamat Email
                </label>
                <div className="md:col-span-2">
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 font-medium"
                    readOnly
                  />
                </div>
              </div>

              {/* Field No HP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
                <label className="text-sm font-semibold text-gray-700 md:col-span-1">
                  Nomor HP
                </label>
                <div className="md:col-span-2">
                  <input
                    type="tel"
                    defaultValue={user.no_hp_casis}
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 font-medium"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
          
          {/* Footer Card untuk Info Edit */}
          <div className="bg-gray-50 px-8 py-5 sm:px-10 border-t">
              <p className="text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                Informasi ini bersifat permanen dan hanya dapat diubah oleh administrator sistem.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}