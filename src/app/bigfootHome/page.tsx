"use client";
import React, { FormEvent, useState } from "react";
import { z } from "zod";
import BigFootStory from "./components/BigFootStory";
import EmployeesCards from "./components/EmployeesCards";
import axios from "axios";

// Zod schema for form validation
const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  zip: z.string().min(5, "Zip code must be at least 5 characters"),
  serviceType: z.string().min(3, "Please specify the service you need"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  additionalDetails: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function BigFootHome() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      fullName,
      email,
      phone,
      address,
      zip,
      serviceType,
      preferredDate,
      additionalDetails,
    };

    try {
      // Validate form data with Zod
      const validatedData = quoteSchema.parse(formData);
      await axios.post("/api/quote/create", validatedData);

      // Clear any previous errors
      setErrors({});

      // Here you would typically send the data to your API
      console.log("Form submitted successfully:", validatedData);

      // Reset form after successful submission
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setZip("");
      setServiceType("");
      setPreferredDate("");
      setAdditionalDetails("");

      alert("Quote request submitted successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Partial<QuoteFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <BigFootStory />
      <EmployeesCards />
      <div id="quotes" className="max-w-4xl mx-auto px-4 py-12 scroll-mt-24">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-600 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 mb-4">
              Request a Quote
            </h1>
            <p className="text-slate-300 text-lg">
              Get professional window and gutter cleaning services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
                {errors.zip && (
                  <p className="text-red-400 text-sm mt-1">{errors.zip}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Service Needed
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select a service</option>
                <option value="window-cleaning">Window Cleaning</option>
                <option value="gutter-cleaning">Gutter Cleaning</option>
                <option value="both">Window & Gutter Cleaning</option>
                <option value="pressure-washing">Pressure Washing</option>
                <option value="other">Other</option>
              </select>
              {errors.serviceType && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.serviceType}
                </p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
              {errors.preferredDate && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Additional Details
              </label>
              <textarea
                placeholder="Any additional information about your service request..."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
              />
              {errors.additionalDetails && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.additionalDetails}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
