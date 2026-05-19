"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

const inputStyle =
  "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const [message, setMessage] = useState({
    error: "",
    success: false,
    loading: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage({ ...message, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage({ ...message, error: "Passwords do not match" });
    }

    if (formData.password.length < 6) {
      return setMessage({
        ...message,
        error: "Password must be at least 6 characters",
      });
    }

    try {
      setMessage({ ...message, loading: true });

      console.log(formData);

      setMessage({
        loading: false,
        error: "",
        success: true,
      });
    } catch {
      setMessage({
        loading: false,
        success: false,
        error: "Registration failed",
      });
    }
  };

  const InputField = ({
    label,
    icon: Icon,
    type = "text",
    name,
    placeholder,
    passwordToggle,
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
            passwordToggle
              ? show[name]
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

        {passwordToggle && (
          <button
            type="button"
            onClick={() =>
              setShow({
                ...show,
                [name]: !show[name],
              })
            }
            className="absolute right-4 top-3.5 text-gray-400"
          >
            {show[name] ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join us to book appointments
          </p>
        </div>

        {message.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {message.error}
          </div>
        )}

        {message.success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-600 text-sm flex items-center gap-2">
            <CheckCircle size={18} />
            Account created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="First Name"
              icon={User}
              name="firstName"
              placeholder="Siyam"
            />

            <InputField
              label="Last Name"
              icon={User}
              name="lastName"
              placeholder="Omi"
            />
          </div>

          <InputField
            label="Email"
            icon={Mail}
            type="email"
            name="email"
            placeholder="siyam@gmail.com"
          />

          <InputField
            label="Password"
            icon={Lock}
            name="password"
            placeholder="••••••••"
            passwordToggle
          />

          <InputField
            label="Confirm Password"
            icon={Lock}
            name="confirmPassword"
            placeholder="••••••••"
            passwordToggle
          />

          <button
            type="submit"
            disabled={message.loading}
            className="w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
          >
            {message.loading
              ? "Creating account..."
              : "Create Account"}
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

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-600 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;