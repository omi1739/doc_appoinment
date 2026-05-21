"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();

    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      
      <nav className="max-w-7xl mx-auto px-4  flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            width={100}
            height={20}
            alt="Doctor Appointment Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-cyan-600 font-medium transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/appointments"
              className="text-gray-700 hover:text-cyan-600 font-medium transition"
            >
              All Appointments
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-cyan-600 font-medium transition"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : session ? (
            <>
              <div className="flex items-center gap-2">

                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />

                <span className="text-gray-700 font-medium">
                  {session.user?.name || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">

          <ul className="flex flex-col gap-2 p-4">

            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-cyan-600 font-medium transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/appointments"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-cyan-600 font-medium transition"
              >
                All Appointments
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-cyan-600 font-medium transition"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Mobile Auth */}
          <div className="border-t border-gray-200 p-4 space-y-2">

            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              <>
                <div className="flex items-center gap-3 py-2">

                  <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />

                  <p className="text-gray-700 font-medium">
                    {session.user?.name || "User"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-cyan-600 border border-cyan-600 rounded-lg hover:text-cyan-700 font-semibold transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;