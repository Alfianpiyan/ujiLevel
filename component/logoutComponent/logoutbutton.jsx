"use client";

import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export default function LogoutButton() {
  const handleLogout = () => {
    Swal.fire({
      title: "Kamu yakin?",
      text: "Kamu akan keluar dari akun ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(); // langsung logout
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left mt-5 p-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition"
    >
      Logout
    </button>
  );
}
