"use client";

import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res || res.error) {
      setErrors({ global: "Email atau password salah" });
      setLoading(false);
      return;
    }

    window.location.href = "/user";
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative">
      <Image
        src="/images/background.jpg"
        alt="Gedung Sekolah"
        fill
        className="object-cover brightness-85"
        priority
      />

      <div className="w-full max-w-md bg-white/35 backdrop-blur-xs border border-white/40 shadow-2xl rounded-2xl p-8 space-y-6 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-white/90 text-sm">Masukkan akun Anda</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-white">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Masukkan email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/70"
              />
              <User className="w-5 h-5 absolute right-3 top-3 text-gray-700" />
            </div>
            {errors.email && (
              <p className="text-red-300 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/70"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm">{errors.password}</p>
            )}
          </div>

          {errors.global && (
            <p className="text-red-300 text-center text-sm">{errors.global}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700/90 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition shadow-lg"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white text-sm">
          Calon siswa baru?{" "}
          <a href="/register" className="text-blue-200 underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}
