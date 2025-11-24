"use client";

import AdminSidebar from "@/component/adminComponent/SidebarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
