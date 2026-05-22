"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Trash2, 
  Edit3, 
  LogOut, 
  Grid, 
  UserCheck, 
  Mail, 
  Image as ImageIcon,
  Heart,
  PlusCircle,
  AlertCircle,
  X,
  Users
} from "lucide-react";
import Image from "next/image";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

 function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  
  // Dashboard Navigation State
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "profile"
  
  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  
  // Edit Booking Modal State
  const [editBooking, setEditBooking] = useState(null); // The booking currently being edited
  const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  // Edit Profile Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    image: "",
  });

  // Delete Confirmation Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [isDeletingBooking, setIsDeletingBooking] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Fetch bookings when session is loaded
  const fetchBookings = useCallback(async () => {
    if (!session) return;
    setLoadingBookings(true);
    try {
      // Fetch JWT token
      const tokenRes = await fetch("/api/token");
      const tokenData = await tokenRes.json();
      const token = tokenData.token;

      if (!token) {
        throw new Error("Unable to retrieve session token");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      Promise.resolve().then(() => {
        fetchBookings();
      });
    }
  }, [session, fetchBookings]);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Open Edit Booking Modal
  const openEditBooking = (booking) => {
    setEditBooking(booking);
    setBookingFormData({
      patientName: booking.patientName || "",
      gender: booking.gender || "Male",
      phone: booking.phone || "",
      appointmentDate: booking.appointmentDate || "",
      appointmentTime: booking.appointmentTime || "",
    });
  };

  // Handle Edit Booking Change
  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Booking Edit
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    if (!editBooking) return;
    setIsUpdatingBooking(true);
    
    try {
      const tokenRes = await fetch("/api/token");
      const tokenData = await tokenRes.json();
      const token = tokenData.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings/update/${editBooking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingFormData),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking");
      }

      toast.success("Appointment updated successfully!");
      setEditBooking(null);
      
      // Update state instantly without reload
      setBookings((prev) =>
        prev.map((b) =>
          b._id === editBooking._id
            ? { ...b, ...bookingFormData, updatedAt: new Date().toISOString() }
            : b
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not update booking");
    } finally {
      setIsUpdatingBooking(false);
    }
  };

  // Handle Booking Delete - Show Confirmation Modal
  const handleDeleteBooking = (bookingId) => {
    setDeleteBookingId(bookingId);
    setShowDeleteModal(true);
  };

  // Confirm Delete - Perform the actual deletion
  const confirmDelete = async () => {
    if (!deleteBookingId) return;

    setIsDeletingBooking(true);
    try {
      const tokenRes = await fetch("/api/token");
      const tokenData = await tokenRes.json();
      const token = tokenData.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings/${deleteBookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete booking");
      }

      toast.success("Appointment cancelled successfully!");
      // Update UI instantly
      setBookings((prev) => prev.filter((b) => b._id !== deleteBookingId));
      setShowDeleteModal(false);
      setDeleteBookingId(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not cancel appointment");
    } finally {
      setIsDeletingBooking(false);
    }
  };

  // Cancel Delete - Close the modal
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteBookingId(null);
  };

  // Open Edit Profile Modal
  const openEditProfile = () => {
    setProfileFormData({
      name: session?.user?.name || "",
      image: session?.user?.image || "",
    });
    setShowProfileModal(true);
  };

  // Submit Profile Edit
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: profileFormData.name,
        image: profileFormData.image,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setShowProfileModal(false);
      
      // Refresh session client state to display updated information immediately
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-50/30">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50/40 via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-100 dark:border-cyan-900/30 shadow-inner mb-4">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-full">
                {session.user?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 truncate max-w-full mb-6">
                {session.user?.email}
              </p>

              {/* Navigation Menu */}
              <div className="w-full space-y-2">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "bookings"
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/10"
                      : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Grid size={18} />
                  My Bookings
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "profile"
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/10"
                      : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <UserCheck size={18} />
                  My Profile
                </button>

                <div className="border-t border-gray-100 dark:border-slate-800 my-4 pt-4"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all cursor-pointer"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header Title */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {activeTab === "bookings" ? "Manage Appointments" : "Account Settings"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                  {activeTab === "bookings" 
                    ? "View and edit your upcoming consultations." 
                    : "Update your profile image and display name."
                  }
                </p>
              </div>
              {activeTab === "bookings" && (
                <button
                  onClick={() => router.push("/appointments")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-100 dark:bg-cyan-900/30 hover:bg-cyan-200 dark:hover:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 font-bold text-sm rounded-xl transition cursor-pointer"
                >
                  <PlusCircle size={16} />
                  Book New
                </button>
              )}
            </div>

            {/* TAB CONTENT: MY BOOKINGS */}
            {activeTab === "bookings" && (
              <div>
                {loadingBookings ? (
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-3xl p-16 shadow-sm flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 dark:text-slate-400 font-medium">Fetching appointment data...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-3xl p-16 shadow-sm flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-900/20 rounded-full flex items-center justify-center mb-4">
                      <Heart className="text-cyan-600 dark:text-cyan-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">No Bookings Yet</h3>
                    <p className="text-gray-500 dark:text-slate-400 max-w-sm mb-6">
                      You haven&apos;t scheduled any appointments yet. Book a session with one of our trusted medical professionals.
                    </p>
                    <button
                      onClick={() => router.push("/appointments")}
                      className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-lg shadow-cyan-600/10 hover:shadow-cyan-600/20 transition cursor-pointer"
                    >
                      Browse Available Doctors
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
                      <div 
                        key={booking._id} 
                        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Top Accent line */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-cyan-400 to-blue-500"></div>

                        {/* Doctor Details */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center">
                            {booking.doctorImage ? (
                              <Image
                                src={booking.doctorImage}
                                alt={booking.doctorName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <Users className="text-cyan-600 dark:text-cyan-400" size={24} />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{booking.doctorName}</h3>
                            <span className="inline-block bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
                              {booking.specialty || "Specialist"}
                            </span>
                          </div>
                        </div>

                        {/* Appointment/Patient Info */}
                        <div className="bg-gray-50/80 dark:bg-slate-800/50 rounded-2xl p-4 space-y-2 text-sm text-gray-600 dark:text-slate-300 mb-6">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
                            <span><span className="font-semibold text-gray-700 dark:text-slate-200">Patient:</span> {booking.patientName} ({booking.gender})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
                            <span><span className="font-semibold text-gray-700 dark:text-slate-200">Phone:</span> {booking.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
                            <span><span className="font-semibold text-gray-700 dark:text-slate-200">Date:</span> {booking.appointmentDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
                            <span><span className="font-semibold text-gray-700 dark:text-slate-200">Time:</span> {booking.appointmentTime}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEditBooking(booking)}
                            className="grow flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-bold text-sm rounded-xl border border-gray-200 dark:border-slate-700 transition cursor-pointer"
                          >
                            <Edit3 size={14} />
                            Reschedule
                          </button>
                          
                          <button
                            onClick={() => handleDeleteBooking(booking._id)}
                            className="flex items-center justify-center p-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-xl border border-red-100 dark:border-red-900/30 transition cursor-pointer"
                            title="Cancel Appointment"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: MY PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                <div className="max-w-2xl space-y-6">
                  
                  {/* Detailed User Information */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-slate-800">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-slate-700">
                      <Image
                        src={session.user?.image || "/default-avatar.png"}
                        alt="Profile avatar"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 px-2.5 py-1 rounded-full uppercase">Registered Member</span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{session.user?.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Member since {session.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name Card */}
                      <div className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-2xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                          <User className="text-cyan-600 dark:text-cyan-400" size={20} />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-gray-400 uppercase">Display Name</span>
                          <span className="font-semibold text-gray-800 dark:text-slate-200 text-sm mt-0.5 block">{session.user?.name}</span>
                        </div>
                      </div>

                      {/* Email Card */}
                      <div className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-2xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                          <Mail className="text-cyan-600 dark:text-cyan-400" size={20} />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-gray-400 uppercase">Email Address</span>
                          <span className="font-semibold text-gray-800 dark:text-slate-200 text-sm mt-0.5 block">{session.user?.email}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={openEditProfile}
                      className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-md transition cursor-pointer"
                    >
                      Update Profile Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: RESCHEDULE/EDIT BOOKING */}
      {editBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="relative w-full max-w-lg overflow-hidden bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-gray-100 dark:border-slate-800 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-4 bg-linear-to-r from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reschedule Appointment</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">Edit details for booking</p>
              </div>
              <button
                onClick={() => setEditBooking(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateBooking} className="p-6 space-y-4">
              
              {/* Readonly Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 text-sm">
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Doctor (Read Only)</span>
                  <span className="font-semibold text-gray-700 dark:text-slate-200">{editBooking.doctorName}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Your Email (Read Only)</span>
                  <span className="font-semibold text-gray-700 dark:text-slate-200 truncate block">{editBooking.userEmail}</span>
                </div>
              </div>

              {/* Patient Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Patient Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3 text-gray-400 dark:text-slate-500" />
                  <input
                    type="text"
                    name="patientName"
                    value={bookingFormData.patientName}
                    onChange={handleBookingFormChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Gender & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Gender</label>
                  <select
                    name="gender"
                    value={bookingFormData.gender}
                    onChange={handleBookingFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-3 text-gray-400 dark:text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={bookingFormData.phone}
                      onChange={handleBookingFormChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Preferred Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="date"
                      name="appointmentDate"
                      value={bookingFormData.appointmentDate}
                      onChange={handleBookingFormChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Preferred Time Slot</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-slate-500" />
                    <select
                      name="appointmentTime"
                      value={bookingFormData.appointmentTime}
                      onChange={handleBookingFormChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800"
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
                disabled={isUpdatingBooking}
                className="w-full mt-6 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg disabled:bg-gray-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isUpdatingBooking ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPDATE USER PROFILE */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="relative w-full max-md overflow-hidden bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-gray-100 dark:border-slate-800 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-4 bg-linear-to-r from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Update Profile Details</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">Modify your membership details</p>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
              
              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Display Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3 text-gray-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={profileFormData.name}
                    onChange={(e) => setProfileFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    placeholder="E.g., Siyam Islam"
                    required
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">Profile Photo URL</label>
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-4 top-3 text-gray-400 dark:text-slate-500" />
                  <input
                    type="url"
                    value={profileFormData.image}
                    onChange={(e) => setProfileFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full mt-6 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg disabled:bg-gray-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isUpdatingProfile ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating profile...
                  </>
                ) : (
                  "Save Details"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM DELETE APPOINTMENT */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        title="Cancel Appointment?"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={isDeletingBooking}
      />
    </div>
  );
}

export default Dashboard;

