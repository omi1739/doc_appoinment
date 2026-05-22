"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();

    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">

      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            width={120}
            height={24}
            alt="Doctor Appointment Logo"
            className="dark:invert brightness-110"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/appointments"
              className="text-gray-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
            >
              All Appointments
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard"
              className="text-gray-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">

          <ThemeToggle />

          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse"></div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-200 dark:border-slate-700"
                />
                <span className="text-gray-700 dark:text-slate-200 font-medium">
                  {session.user?.name || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-semibold shadow-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all font-semibold shadow-sm shadow-cyan-500/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-slate-300 p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">

          <ul className="flex flex-col gap-1 p-4">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/appointments"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                All Appointments
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Mobile Auth */}
          <div className="border-t border-gray-100 dark:border-slate-800 p-4 space-y-3">

            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse"></div>
            ) : session ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-200 dark:border-slate-700"
                  />
                  <p className="text-gray-700 dark:text-slate-200 font-semibold">
                    {session.user?.name || "User"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-3 text-cyan-600 dark:text-cyan-400 border border-cyan-600 dark:border-cyan-400 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-950 font-semibold transition-colors"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-semibold transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;