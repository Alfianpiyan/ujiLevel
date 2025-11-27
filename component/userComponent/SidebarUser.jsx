"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  CreditCard,
  User,
} from "lucide-react";
import Image from "next/image";
import LogoutButton from "../logoutComponent/logoutbutton";

export default function SidebarUser() {
  const path = usePathname();

  const menus = [
    { name: "Dashboard", path: "/user", icon: Home },
    { name: "PPDB", path: "/user/ppdb", icon: FileText },
    { name: "Form Pembayaran", path: "/user/pembayaran", icon: CreditCard },
    { name: "Profile", path: "/user/profile", icon: User },
  ];

  return (
    <div className="w-64 h-screen bg-white text-gray-800 shadow-xl border-r border-gray-100 p-5 flex flex-col sticky top-0">
      
      {/* Header dengan Logo Foto */}
      <div className="mb-8 border-b pb-6">
        <div className="flex items-center space-x-3 mb-4">
          {/* Logo Foto */}
          <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-blue-200 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Logo Sekolah"
              width={35}
              height={35}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">SMK Taruna Bhakti</h1>
            <p className="text-xs text-gray-500">PPDB 2025</p>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <h2 className="text-sm font-semibold text-blue-800">
            Dashboard User
          </h2>
        </div>
      </div>

      {/* Navigasi Menu */}
      <nav className="flex-grow space-y-1">
        {menus.map((m, i) => {
          const isActive = path === m.path;
          const Icon = m.icon;

          return (
            <Link
              href={m.path}
              key={i}
              className={`
                flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg font-semibold transform scale-[1.02]" 
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-current"}`} />
              <span className="text-sm">{m.name}</span>
            </Link>
          );
        })}
      </nav>
      <LogoutButton />
    </div>
  );
}