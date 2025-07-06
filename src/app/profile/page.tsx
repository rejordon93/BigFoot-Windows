"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import img from "../../../public/profile.jpg";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await axios.post("/api/profile", {
        firstname,
        lastname,
        city,
        state,
        zip,
      });

      setSuccess("✅ Profile saved successfully!");
      setFirstName("");
      setLastName("");
      setCity("");
      setState("");
      setZip("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("❌ Failed to save profile. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={img}
            alt="Profile visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Complete Your Profile
          </h2>

          {/* Feedback Messages */}
          {success && (
            <div className="mb-4 text-green-600 text-center font-medium">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter zip"
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
