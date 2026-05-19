"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";


const inputStyle =
  "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState({
    loading: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage({
      ...message,
      error: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage({
        ...message,
        loading: true,
      });

      console.log(formData);

      // Your login API here
    } catch {
      setMessage({
        loading: false,
        error: "Login failed",
      });
    } finally {
      setMessage((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const InputField = ({
    label,
    icon: Icon,
    type = "text",
    name,
    placeholder,
    password,
  }) => (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-3.5 text-gray-400"
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
          value={formData[name]}
          onChange={handleChange}
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>
        </div>

        {/* Error */}
        {message.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {message.error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField
            label="Email"
            icon={Mail}
            type="email"
            name="email"
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            icon={Lock}
            name="password"
            placeholder="••••••••"
            password
          />

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              href="#"
              className="text-cyan-600 font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={message.loading}
            className="w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
          >
            {message.loading
              ? "Signing in..."
              : "Sign In"}
          </button>

                <p className="text-center">or</p>
                <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                    <Image
                        src='/googleicon.png'
                        alt="Google Logo"
                        width={18}
                        height={18}
                    />
                    Continue with Google
                </div>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          
          <Link
            href="/register"
            className="text-cyan-600 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;