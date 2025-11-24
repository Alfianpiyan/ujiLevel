import Sidebar from "@/component/petugasComponent/sidebarpetugas";

export default function PetugasLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
