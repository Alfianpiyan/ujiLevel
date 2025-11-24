import SidebarUser from "@/component/userComponent/SidebarUser";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SidebarUser />
      <main className="flex-1 p-6 bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
}
