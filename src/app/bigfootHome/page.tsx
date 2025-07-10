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

interface ToastMessage {
  id: string;
  type: "success" | "error";
  message: string;
}

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
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, message };
    setToastMessages((prev) => [...prev, newToast]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToastMessages((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToastMessages((prev) => prev.filter((toast) => toast.id !== id));
  };

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

      addToast(
        "success",
        "Quote request submitted successfully! We'll get back to you soon."
      );
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
        addToast(
          "error",
          "Please correct the errors in the form and try again."
        );
      } else {
        addToast("error", "Something went wrong. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {toastMessages.map((toast) => (
          <div
            key={toast.id}
            className={`
              max-w-sm w-full px-4 py-3 rounded-lg shadow-2xl 
              transform transition-all duration-500 ease-out
              animate-in slide-in-from-right-full
              ${
                toast.type === "success"
                  ? "bg-green-600 border-l-4 border-green-400"
                  : "bg-red-600 border-l-4 border-red-400"
              }
            `}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white leading-5">
                  {toast.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => removeToast(toast.id)}
                  className="inline-flex text-white/70 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
