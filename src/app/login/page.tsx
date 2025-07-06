"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import img from "../../../public/login.jpg";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => {
        const { hasProfile } = res.data;

        router.push(hasProfile ? "/profile" : "/bigfootHome");
        router.push("/bigfootHome");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error)
        setError("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="flex flex-col-reverse md:flex-row max-w-5xl w-full shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Form Section */}
        <motion.div
          className="w-full md:w-1/2 p-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>

          {/* Success / Error Messages */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <a href="/signUp" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 h-64 md:h-auto relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={img}
            alt="Login visual"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
