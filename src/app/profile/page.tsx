"use client";
import React, { FormEvent, useState } from "react";
import { User, MapPin, Save, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Profile saved successfully!");
      setFirstName("");
      setLastName("");
      setCity("");
      setState("");
      setZip("");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Failed to save profile. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center px-4 py-8">
      <div className="flex flex-col lg:flex-row bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full border border-slate-600">
        {/* Left Side - Branding & Visual */}
        <div className="relative w-full lg:w-2/5 bg-gradient-to-br from-amber-500 to-orange-600 p-8 lg:p-12 flex flex-col justify-center items-center text-center">
          <div className="relative mb-8">
            <div className="bg-slate-900/20 backdrop-blur-sm p-6 rounded-3xl shadow-2xl">
              <svg
                className="w-20 h-20 text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5 1 3 2.5 3.5V11c-1.5 0-3 1-3 2.5v2c0 1.5 1.5 2.5 3 2.5h1v2c0 1.5 1.5 3 3 3s3-1.5 3-3v-2h1c1.5 0 3-1 3-2.5v-2c0-1.5-1.5-2.5-3-2.5V9c1.5-0.5 2.5-2 2.5-3.5C20 3.5 18.5 2 17 2c-1 0-2 0.5-2.5 1.5C14 2.5 13 2 12 2z" />
                <circle cx="10.5" cy="5.5" r="1" />
                <circle cx="13.5" cy="5.5" r="1" />
                <path d="M8 20c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2zm8 0c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-wide">
            BigFoot
          </h1>
          <p className="text-slate-900/80 text-lg font-semibold mb-6">
            Window Cleaning Pro
          </p>
          <p className="text-slate-900/70 text-base leading-relaxed max-w-md">
            Complete your profile to get personalized quotes and track your
            window cleaning services with ease.
          </p>

          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-slate-900/30 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-900/50 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-3/5 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg mb-4">
                <User className="w-8 h-8 text-slate-900" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Complete Your Profile
              </h2>
              <p className="text-slate-400">
                Tell us about yourself to get started
              </p>
            </div>

            {/* Feedback Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-xl flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">{success}</span>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Enter zip"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="group w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Save Profile</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Your information is secure and will only be used to provide you
                with better service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
