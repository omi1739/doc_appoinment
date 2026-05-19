"use client";

import Image from "next/image";
import { MapPin, BriefcaseMedical, Star } from "lucide-react";

const AppointmentPage = () => {
  return (
    <div>
      

      <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold shadow-md backdrop-blur">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          4.9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        
        {/* Name + Specialty */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {doctor.name}
          </h2>

          <p className="mt-1 inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700">
            {doctor.specialty}
          </p>
        </div>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {doctor.description}
        </p>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-500">
          
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-600" />
            <span>{doctor.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseMedical size={16} className="text-cyan-600" />
            <span>{doctor.experience} experience</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-sm text-gray-500">
              Consultation Fee
            </p>

            <h3 className="text-3xl font-extrabold text-cyan-700">
              ৳{doctor.fee}
            </h3>
          </div>

          <button className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </div>


    </div>
  )
}

export default AppointmentPage





