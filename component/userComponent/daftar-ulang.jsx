"use client";

import { useState } from "react";

export default function daftarPage() {
  const [form, setForm] = useState({
    tinggi: "",
    berat: "",
    nama_ortu: "",
    no_hp: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form daftar ulang berhasil disimpan!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Form Pendaftaran Kedua</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">

        <div>
          <label className="font-semibold">Tinggi Badan (cm)</label>
          <input type="number" className="w-full p-2 border rounded mt-1" onChange={(e)=>setForm({...form, tinggi: e.target.value})} />
        </div>

        <div>
          <label className="font-semibold">Berat Badan (kg)</label>
          <input type="number" className="w-full p-2 border rounded mt-1" onChange={(e)=>setForm({...form, berat: e.target.value})} />
        </div>

        <div>
          <label className="font-semibold">Nama Orang Tua</label>
          <input type="text" className="w-full p-2 border rounded mt-1" onChange={(e)=>setForm({...form, nama_ortu: e.target.value})} />
        </div>

        <div>
          <label className="font-semibold">No HP Orang Tua</label>
          <input type="text" className="w-full p-2 border rounded mt-1" onChange={(e)=>setForm({...form, no_hp: e.target.value})} />
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}
