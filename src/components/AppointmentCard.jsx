import React from "react";
import Image from "next/image";
import { MapPin, BriefcaseMedical, Star } from "lucide-react";
import Link from "next/link";

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-linear-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
        {appointment.image ? (
          <Image
            src={appointment.image}
            width={400}
            height={256}
            alt={appointment.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-cyan-400 opacity-50">
            <BriefcaseMedical size={64} />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold shadow-md backdrop-blur">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          {appointment.rating || 4.9}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        {/* Name + Specialty */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {appointment.name || appointment.doctor_name || "Dr. Smith"}
          </h2>

          <p className="mt-2 inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700">
            {appointment.specialty || "General"}
          </p>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-6 text-gray-600">
          {appointment.description || "Professional medical consultation"}
        </p>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-600 shrink-0" />
            <span>{appointment.location || "Medical Center"}</span>
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseMedical size={16} className="text-cyan-600 shrink-0" />
            <span>{appointment.experience || "5 years"} experience</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Consultation Fee</p>

            <h3 className="text-2xl font-extrabold text-cyan-700">
              ৳{appointment.fee || "500"}
            </h3>
          </div>

        <Link href={`/appointments/${appointment._id}`} className="">
          <button className="rounded-2xl cursor-pointer bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg active:scale-95">
             View Details 
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
