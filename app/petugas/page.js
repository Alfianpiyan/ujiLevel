"use client";

import Sidebar from "@/component/petugasComponent/sidebarpetugas";
import DashboardCards from "@/component/petugasComponent/dashboardcard";
import DataTable from "@/component/petugasComponent/dataTable";
import JurusanTable from "@/component/petugasComponent/jurusanTable";

export default function petugasDashboard() {
  return (
    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

        <DashboardCards />

        <h2 className="text-2xl font-bold mt-12 mb-4">Pendaftar Terbaru</h2>
        <DataTable />

        <h2 className="text-2xl font-bold mt-12 mb-4">Daftar Jurusan & Kuota</h2>
        <JurusanTable />
      </main>
    </div>
  );
}
