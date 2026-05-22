"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Calendar, Users } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-cyan-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 transition-colors duration-300">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-300/20 dark:bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-300/20 dark:bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">

        {/* Left Content */}
        <div className="space-y-7">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
            Trusted Healthcare Platform
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 dark:text-white lg:text-6xl">
              Book Doctor
              <span className="block text-cyan-600 dark:text-cyan-400">
                Appointments Easily
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-8 text-gray-600 dark:text-slate-400">
              Find experienced doctors, schedule appointments instantly,
              and manage your healthcare journey with DocAppoint.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <Link
              href="/appointments"
              className="flex items-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700 hover:shadow-cyan-500/25"
            >
              Get Appointment
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/appointments"
              className="rounded-2xl border border-gray-300 dark:border-slate-700 px-6 py-3 font-semibold text-gray-700 dark:text-slate-300 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Browse Doctors
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 pt-6">

            <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-md dark:shadow-slate-900/50">
              <Calendar className="mb-3 text-cyan-600 dark:text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10K+</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Appointments</p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-md dark:shadow-slate-900/50">
              <Users className="mb-3 text-cyan-600 dark:text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">500+</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Doctors</p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-md dark:shadow-slate-900/50">
              <ShieldCheck className="mb-3 text-cyan-600 dark:text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">100%</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Secure</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

            <Image
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop"
              alt="Doctor"
              width={550}
              height={650}
              className="h-auto w-full object-cover"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 dark:bg-slate-800/90 p-4 shadow-xl backdrop-blur">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Available Doctors
              </p>

              <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                500+
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}