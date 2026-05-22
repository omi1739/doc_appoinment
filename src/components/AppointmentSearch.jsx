"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import AppointmentCard from "./AppointmentCard";
import { BriefcaseMedical } from "lucide-react";

export default function AppointmentSearch({ appointments = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("all");

  // Get unique specialties from appointments
  const specialties = useMemo(() => {
    const unique = [
      ...new Set(appointments.map((apt) => apt.specialty)),
    ].filter(Boolean);
    return unique.sort();
  }, [appointments]);

  // Filter appointments based on search and specialty
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        (appointment.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (appointment.specialty || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (appointment.location || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (appointment.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        filterSpecialty === "all" || appointment.specialty === filterSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, filterSpecialty, appointments]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Available Appointments
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-slate-400">
            Book your medical consultation
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-400 dark:text-slate-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Specialty Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterSpecialty("all")}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                filterSpecialty === "all"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              All Specialties
            </button>

            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setFilterSpecialty(specialty)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  filterSpecialty === specialty
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Results count */}
          {searchQuery || filterSpecialty !== "all" ? (
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Found {filteredAppointments.length} appointment
              {filteredAppointments.length !== 1 ? "s" : ""}
            </p>
          ) : null}
        </div>

        {/* Cards Grid */}
        {filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                appointment={appointment}
                key={appointment._id}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 py-16 text-center">
            <BriefcaseMedical
              size={48}
              className="mx-auto mb-4 text-gray-400 dark:text-slate-600"
            />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-slate-400">
              {appointments.length === 0
                ? "No appointments available"
                : "No results found"}
            </h3>
            <p className="mt-2 text-gray-500 dark:text-slate-500">
              {appointments.length === 0
                ? "Please check back later"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
