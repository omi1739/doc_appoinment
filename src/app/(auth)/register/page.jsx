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
  "w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors";

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
    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-slate-300">
      {label}
    </label>

    <div className="relative">
      <Icon size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-slate-500" />

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
          className="absolute right-4 top-3.5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
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
  };

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    const password = registerData.password;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least 1 lowercase letter.");
      return;
    }

    const { data, error } = await signUp.email({
      ...registerData,
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
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 dark:bg-slate-950 px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl dark:shadow-slate-900/50 border border-transparent dark:border-slate-800">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2">Join us to book appointments</p>
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
            className="w-full mt-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition shadow-md shadow-cyan-600/10"
          >
            Create Account
          </button>

          {/* Divider */}
          <p className="text-center text-gray-500 dark:text-slate-500">or</p>

          {/* Google Button */}
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="w-full flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-slate-700 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition-colors"
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
        <p className="text-center text-sm text-gray-600 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-600 dark:text-cyan-400 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
