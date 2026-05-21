"use client";

import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { X, Calendar, Clock, User, Phone, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingSection({ appointmentId, doctorName, fee }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to book an appointment");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Fetch JWT token from our bridge route
      const tokenRes = await fetch("/api/token");
      const tokenData = await tokenRes.json();
      const token = tokenData.token;

      if (!token) {
        toast.error("Authentication session expired. Please login again.");
        router.push("/login");
        return;
      }

      // 2. Submit booking to Express backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to book appointment");
      }

      toast.success("Appointment booked successfully!");
      setIsOpen(false);
      
      // Reset form
      setFormData({
        patientName: "",
        gender: "Male",
        phone: "",
        appointmentDate: "",
        appointmentTime: "",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred during booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-8 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:shadow-lg active:scale-[0.98] cursor-pointer shadow-md"
      >
        Book Appointment
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg overflow-hidden bg-white/95 border border-gray-100 shadow-2xl rounded-3xl animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-linear-to-r from-cyan-50 to-blue-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Book Appointment</h3>
                <p className="text-sm text-gray-500 mt-0.5">With {doctorName}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBook} className="p-6 space-y-4">
              
              {/* Doctor and User Readonly */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm">
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Doctor</span>
                  <span className="font-semibold text-gray-700">{doctorName}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Your Email</span>
                  <span className="font-semibold text-gray-700 truncate block">{session?.user?.email || "N/A"}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-200/60 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Consultation Fee:</span>
                  <span className="text-lg font-bold text-cyan-600">৳{fee}</span>
                </div>
              </div>

              {/* Patient Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Patient Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient full name"
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Gender & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Preferred Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white text-gray-700"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Preferred Time Slot</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-3.5 text-gray-400" />
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white text-gray-700"
                      required
                    >
                      <option value="">Select Time Slot</option>
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                      <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                      <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Booking...
                  </>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
