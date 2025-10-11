"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] lg:w-[70%] z-50 
                    backdrop-blur-xl bg-white/20 border border-white/20 
                    shadow-xl rounded-2xl transition-all duration-300">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-[#A33CFC] to-[#FC3EAA] text-transparent bg-clip-text tracking-wide"
        >
          Blogs
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#A33CFC] to-[#FC3EAA] text-white font-medium hover:scale-105 transition-transform shadow-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-xl border border-[#A33CFC] text-[#A33CFC] hover:bg-[#A33CFC] hover:text-white font-medium transition shadow-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <span className="text-[#132237] text-sm md:text-base">
                👋 Welcome, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FC3EAA] to-[#A33CFC] text-white font-medium hover:scale-105 transition-transform shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-[#A33CFC]" />
          ) : (
            <Menu className="w-6 h-6 text-[#A33CFC]" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/40 backdrop-blur-2xl border-t border-white/20 shadow-xl px-6 py-4 space-y-4 rounded-b-2xl animate-fade-in">
          {!user ? (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-5 py-2 rounded-xl bg-gradient-to-r from-[#A33CFC] to-[#FC3EAA] text-white font-medium shadow-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-5 py-2 rounded-xl border border-[#A33CFC] text-[#A33CFC] hover:bg-[#A33CFC] hover:text-white font-medium transition shadow-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <p className="text-center text-[#132237]">
                👋 Welcome, <span className="font-semibold">{user.name}</span>
              </p>
              <button
                onClick={handleLogout}
                className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-[#FC3EAA] to-[#A33CFC] text-white font-medium shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
