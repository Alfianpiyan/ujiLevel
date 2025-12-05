"use client";

import { useState } from "react";
import { Eye, EyeOff, User, ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    const session = await fetch("/api/auth/session").then((res) =>
      res.json()
    );

    console.log("SESSION CLIENT:", session);

    if (session?.user?.role === "admin") {
      window.location.href = "/admin";
    } else if (session?.user?.role === "petugas") {
      window.location.href = "/petugas";
    } else {
      window.location.href = "/user";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      
      {/* Decorative Background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-6xl">
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
              
              {/* Back Button */}
              <button
                onClick={() => router.push("/")}
                className="mb-4 flex items-center gap-2 text-[#15518a] hover:text-[#0f3d6b] transition-colors font-medium self-start"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </button>

              {/* Centered Content */}
              <div className="flex-1 flex flex-col justify-center">
                
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Selamat Datang
                  </h1>
                  <p className="text-gray-600">Masuk ke akun PPDB Anda</p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleLogin}>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="contoh@email.com"
                        required
                        className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-all"
                      />
                      <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Masukkan password"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#15518a] focus:ring-2 focus:ring-[#15518a]/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>

                  {/* Global Error */}
                  {errors.global && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-center text-sm flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {errors.global}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-semibold text-white text-lg transition-all ${
                      loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-[#15518a] to-[#1e3a8a] hover:from-[#0f3d6b] hover:to-[#15518a] shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : "Masuk"}
                  </button>
                </form>

                {/* Register Link */}
                <div className="text-center pt-6 mt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Belum punya akun?{" "}
                    <a href="/register" className="text-[#15518a] font-semibold hover:text-[#0f3d6b]">
                      Daftar di sini
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image/Branding */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-[#15518a] to-[#1e3a8a] p-12">
              <div className="h-full flex flex-col items-center justify-center text-white relative z-10">
                
                {/* Logo */}
                <div className="mb-8 relative w-48 h-48">
                  <Image
                    src="/images/ppdb/LogoTb.png"
                    alt="SMK Taruna Bhakti"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Text Content */}
                <div className="text-center space-y-3 mb-10">
                  <h2 className="text-3xl font-bold">
                    SMK Taruna Bhakti
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Sistem PPDB Online
                  </p>
                  <p className="text-blue-200 text-sm">
                    Tahun Ajaran 2025/2026
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    { icon: "✓", text: "Pendaftaran Online 24/7" },
                    { icon: "✓", text: "Proses Cepat & Mudah" },
                    { icon: "✓", text: "6 Program Keahlian" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                        {item.icon}
                      </div>
                      <span className="text-sm text-white">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 SMK Taruna Bhakti
        </p>
      </div>

    </div>
  );
}