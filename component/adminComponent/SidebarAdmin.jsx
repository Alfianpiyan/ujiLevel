"use client";

import LogoutButton from "../logoutComponent/logoutbutton";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <a href="/admin" className="block hover:text-blue-600">
          Dashboard
        </a>

        <a href="/admin/tableUser" className="block hover:text-blue-600">
          Tabel User
        </a>

        <a href="/admin/tablePetugas" className="block hover:text-blue-600">
          Tabel Petugas
        </a>

        <a href="/admin/profile" className="block hover:text-blue-600">
          Profil
        </a>
      </nav>
      <LogoutButton />
    </aside>
  );
}
