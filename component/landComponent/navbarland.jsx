"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function untuk smooth scroll
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const navLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "PPDB", href: "#panduan" },
    { label: "Kontak Kami", href: "#faq" },
  ];

  return (
    <>
      {/* Navbar Container */}
      <nav className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[90%] max-w-6xl
        rounded-full
        border border-gray-200
        shadow-lg
        transition-all duration-300
        ${scrolled ? "bg-white/90 backdrop-blur-xs" : "bg-white"}
        ${isMenuOpen ? 'rounded-2xl md:rounded-full' : 'rounded-full'}
      `}>
        <div className="flex items-center justify-between px-6 py-3">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1.5 rounded-full">
              <Image
                src="/images/ppdb/LogoTb.png"
                alt="Logo TB"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#15518a] tracking-tight leading-tight">
                SMK
              </p>
              <p className="text-lg font-semibold text-[#15518a] tracking-tight leading-tight">
                Taruna Bhakti
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="
                  font-semibold text-sm 
                  px-4 py-2 
                  rounded-full 
                  text-[#15518a] 
                  hover:text-[#166dbf] 
                  hover:bg-[#166dbf]/10 
                  transition-all duration-300
                  cursor-pointer
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="
                px-8 py-2 
                text-sm font-medium 
                rounded-full 
                border border-[#4EA3D8] 
                bg-[#15518a] 
                text-white 
                hover:bg-white 
                hover:text-[#15518a] 
                transition-all duration-400
              "
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="
                px-8 py-2 
                text-sm font-medium 
                rounded-full 
                border border-[#4EA3D8] 
                bg-[#15518a] 
                text-white 
                hover:bg-white 
                hover:text-[#15518a] 
                transition-all duration-400
              "
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#15518a]" />
            ) : (
              <Menu className="w-6 h-6 text-[#15518a]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 px-6 py-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="
                    text-[#15518a] 
                    font-medium 
                    text-sm 
                    px-4 py-3 
                    rounded-lg 
                    hover:bg-[#15518a]/10 
                    transition-all duration-200
                    cursor-pointer
                  "
                >
                  {link.label}
                </a>
              ))}
              
              {/* Mobile Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    w-full text-center
                    px-6 py-3 
                    text-sm font-medium 
                    rounded-full 
                    border border-[#15518a] 
                    bg-white
                    text-[#15518a] 
                    hover:bg-[#15518a] 
                    hover:text-white 
                    transition-all duration-300
                  "
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    w-full text-center
                    px-6 py-3 
                    text-sm font-medium 
                    rounded-full 
                    border border-[#4EA3D8] 
                    bg-[#15518a] 
                    text-white 
                    hover:bg-white 
                    hover:text-[#15518a] 
                    transition-all duration-300
                  "
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-20" />
    </>
  );
}