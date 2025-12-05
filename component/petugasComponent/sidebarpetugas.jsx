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

export default function SidebarPetugas() {
  const path = usePathname();

  const menus = [
    { name: "Dashboard", path: "/petugas", icon: Home },
    { name: "Data Pendaftar", path: "/petugas/pendaftar", icon: FileText },
    { name: "Verifikasi Berkas", path: "/petugas/pembayaran", icon: CreditCard },
    { name: "Profile", path: "/petugas/profile", icon: User },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-2xl border-r border-gray-200 flex flex-col sticky top-0">
      
      {/* Header dengan Logo */}
      <div className="p-4 bg-gradient-to-br from-[#15518a] to-[#0f3a5f]">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo Sekolah"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">SMK Taruna Bhakti</h1>
            <p className="text-xs text-blue-200">PPDB 2025</p>
          </div>
        </div>
      </div>

      {/* Navigasi Menu */}
      <nav className="flex-grow p-4 space-y-2">
        {menus.map((m, i) => {
          const isActive = path === m.path;
          const Icon = m.icon;

          return (
            <Link
              href={m.path}
              key={i}
              className={`
                group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-[#15518a] text-white shadow-lg" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#15518a]"
                }
              `}
            >
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-[#15518a]/10"}
              `}>
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600 group-hover:text-[#15518a]"}`} />
              </div>
              <span className="font-medium">{m.name}</span>
              
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <LogoutButton />
      </div>
    </div>
  );
}