"use client";
import { useState } from "react";

export default function profileAdmin() {
  const [form, setForm] = useState({
    nama: "Nama Petugas",
    email: "petugas@example.com",
    hp: "08123456789",
  });

  function handleSubmit(e) {
    e.preventDefault();
    // simpan ke API nanti
    alert("Profil disimpan (dummy)");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Profil Petugas</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nama</label>
          <input
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">No HP</label>
          <input
            value={form.hp}
            onChange={(e) => setForm({ ...form, hp: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Simpan
          </button>
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setForm({
            nama: "Nama Petugas",
            email: "petugas@example.com",
            hp: "08123456789"
          })}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
