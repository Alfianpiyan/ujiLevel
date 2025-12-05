"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoutButton from "../logoutComponent/logoutbutton";

export default function AdminSidebar() {
  const path = usePathname();

  const menus = [
    { 
      name: "Dashboard", 
      path: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: "Tabel User", 
      path: "/admin/tableUser",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      name: "Tabel Petugas", 
      path: "/admin/tablePetugas",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      name: "Profil", 
      path: "/admin/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-2xl border-r border-gray-200 flex flex-col sticky top-0">
      
      {/* Header dengan Logo */}
      <div className="p-6 bg-gradient-to-br from-[#15518a] to-[#0f3a5f]">
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
                <div className={isActive ? "text-white" : "text-gray-600 group-hover:text-[#15518a]"}>
                  {m.icon}
                </div>
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