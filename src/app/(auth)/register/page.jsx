"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const inputStyle =
  "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500";

const InputField = ({
  label,
  icon: Icon,
  type = "text",
  name,
  placeholder,
  password,
  showPassword,
  setShowPassword,
}) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">
      {label}
    </label>

    <div className="relative">
      <Icon size={18} className="absolute left-4 top-3.5 text-gray-400" />

      <input
        type={password ? (showPassword ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        className={inputStyle}
        required
      />

      {password && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3.5 text-gray-400"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

const RegisterPage = () => {

    const handleGoogleRegister = async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      } catch (error) {
        console.error("Google Register Error:", error);
        toast.error("Google Registration Failed");
      }
    }

      


  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    const { data, error } = await signUp.email({
      ...registerData
    });

    if (error) {
      console.log(error.message);
      toast.error(error.message || "Registration Failed");
      return;
    }
    toast.success("Registration Successful");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>

          <p className="text-gray-500 mt-2">Join us to book appointments</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <InputField
            label="Full Name"
            icon={User}
            name="name"
            placeholder="Siyam Islam Omi"
          />

          {/* Email */}
          <InputField
            label="Email"
            icon={Mail}
            type="email"
            name="email"
            placeholder="siyam@gmail.com"
          />

          {/* Image URL */}
          <InputField
            label="Profile Image URL"
            icon={ImageIcon}
            name="image"
            placeholder="https://example.com/photo.jpg"
          />

          {/* Password */}
          <InputField
            label="Password"
            icon={Lock}
            name="password"
            placeholder="••••••••"
            password
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
          >
            Create Account
          </button>

          {/* Divider */}
          <p className="text-center text-gray-500">or</p>

          {/* Google Button */}
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="w-full flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-100 transition"
          >
            <Image
              src="/googleicon.png"
              alt="Google Logo"
              width={18}
              height={18}
            />
            Continue with Google
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
