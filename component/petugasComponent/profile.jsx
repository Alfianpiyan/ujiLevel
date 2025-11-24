"use client";

export default function ProfilePetugas() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Profil Petugas</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Nama Petugas</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Nama lengkap"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nomor HP</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="08xxxxxxx"
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
