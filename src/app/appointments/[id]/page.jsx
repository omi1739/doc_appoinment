import React from "react";
import Image from "next/image";
import { MapPin, Briefcase, Building2, Clock, Star } from "lucide-react";

const fetchSingleAppointment = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
  );
  const data = res.json();
  return data || {};
};

const AppointmentDetails = async ({ params }) => {
  const { id } = await params;
  const appointment = await fetchSingleAppointment(id);

  // Mock availability times (replace with actual data when available)
  const availabilitySlots = appointment.availability || [
    { time: "09:00 AM", end: "12:00 PM" },
    { time: "04:00 PM", end: "07:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
            {/* Left: Doctor Image */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-linear-to-br from-cyan-100 to-blue-100 flex items-center justify-center mb-6">
                {appointment.image ? (
                  <Image
                    src={appointment.image}
                    width={400}
                    height={320}
                    alt={appointment.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Briefcase size={80} className="text-cyan-400 opacity-50" />
                )}
              </div>
            </div>

            {/* Right: Doctor Information */}
            <div className="md:col-span-3 space-y-6">
              {/* Specialty Badge */}
              <div>
                <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {appointment.specialty || "Specialist"}
                </span>
              </div>

              {/* Name and Rating */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {appointment.name || "Dr. Smith"}
                </h1>
                <div className="flex items-center gap-2">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span className="text-lg font-semibold text-gray-700">
                    {appointment.rating || 4.9} / 5.0
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base leading-7">
                {appointment.description || "Professional medical consultation"}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
                {/* Experience */}
                <div className="flex items-start gap-3">
                  <Clock
                    className="text-cyan-600 shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Experience
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {appointment.experience || "5 years"}
                    </p>
                  </div>
                </div>

                {/* Workplace */}
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-cyan-600 shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Workplace
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {appointment.workplace || "Medical Center"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-cyan-600 shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {appointment.location || "City Center"}
                    </p>
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="flex items-start gap-3">
                  <Briefcase
                    className="text-cyan-600 shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Consultation Fee
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ৳{appointment.fee || "500"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Availability
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availabilitySlots.map((slot, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                    >
                      {slot} 
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button className="w-full mt-8 px-8 py-4 bg-cyan-600 text-white font-semibold rounded-2xl hover:bg-cyan-700 transition-all duration-300 hover:shadow-lg active:scale-95">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
