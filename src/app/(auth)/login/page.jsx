"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { authClient, signIn } from "@/lib/auth-client";
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
      <Icon
        size={18}
        className="absolute left-4 top-3.5 text-gray-400 dark:text-slate-500"
      />

      <input
        type={
          password
            ? showPassword
              ? "text"
              : "password"
            : type
        }
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
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      )}
    </div>
  </div>
);

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Login Failed");
    }
  };

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      ...loginData,
    });

    if (error) {
      console.log(error.message);
      toast.error(error.message || "Login Failed");
      return;
    }
    toast.success("Login Successful");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl dark:shadow-slate-900/50 border border-transparent dark:border-slate-800">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <InputField
            label="Email"
            icon={Mail}
            type="email"
            name="email"
            placeholder="you@example.com"
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

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-slate-400">
              <input type="checkbox" className="dark:accent-cyan-600" />
              Remember me
            </label>
            <Link
              href="#"
              className="text-cyan-600 dark:text-cyan-400 font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition shadow-md shadow-cyan-600/10"
          >
            Sign In
          </button>

          {/* Divider */}
          <p className="text-center text-gray-500 dark:text-slate-500">
            or
          </p>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-gray-300 dark:border-slate-700 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition-colors"
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
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-cyan-600 dark:text-cyan-400 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
