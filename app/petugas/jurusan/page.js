"use client";

import Sidebar from "@/component/petugas/sidebarpetugas";
import JurusanTable from "@/component/petugas/jurusanTable";

export default function Page() {
  return (
    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Daftar Jurusan & Kuota</h1>
        <JurusanTable />
      </main>
    </div>
  );
}
