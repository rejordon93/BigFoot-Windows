"use client";
import React, { FormEvent, useState, useEffect } from "react";
import {
  User,
  MapPin,
  Save,
  CheckCircle,
  AlertCircle,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";

// Zod validation schema
const profileSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastname: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be less than 50 characters"),
  zip: z
    .string()
    .regex(
      /^\d{5}(-\d{4})?$/,
      "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
    ),
  phone: z
    .string()
    .regex(
      /^[\+]?[1-9]?[\d\s\-\(\)]{10,}$/,
      "Please enter a valid phone number"
    ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ValidationErrors {
  [key: string]: string;
}

export default function EditProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const router = useRouter();

  // Load existing profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/profile/get");
        const data = await response.json();

        if (data) {
          setFirstName(data.firstname || "");
          setLastName(data.lastname || "");
          setCity(data.city || "");
          setState(data.state || "");
          setZip(data.zip || "");
          setPhone(data.phone || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Real-time validation as user types
  const validateField = (field: keyof ProfileFormData, value: string) => {
    try {
      profileSchema.shape[field].parse(value);
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: unused, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData: ProfileFormData = {
      firstname,
      lastname,
      city,
      state,
      zip,
      phone,
    };

    try {
      // Validate all fields
      const validatedData = profileSchema.parse(formData);
      await axios.put("/api/profile/put", validatedData);

      // Clear any existing validation errors
      setValidationErrors({});
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const errors: ValidationErrors = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as string;
          errors[field] = error.message;
        });
        setValidationErrors(errors);
        setError("Please fix the validation errors below.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

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
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse border-2 border-white"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-wide">
            BigFoot
          </h1>
          <p className="text-slate-900/80 text-lg font-semibold mb-6">
            Window Cleaning Pro
          </p>
          <p className="text-slate-900/70 text-base leading-relaxed max-w-md">
            Update your profile information to keep your account current and
            receive personalized service.
          </p>

          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-slate-900/30 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-900/50 rounded-full"></div>
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
                Edit Your Profile
              </h2>
              <p className="text-slate-400">Update your information below</p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateField("firstname", e.target.value);
                    }}
                    placeholder="Enter first name"
                    className={`w-full bg-slate-700/50 border ${
                      validationErrors.firstname
                        ? "border-red-500"
                        : "border-slate-600"
                    } rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                  {validationErrors.firstname && (
                    <p className="mt-2 text-sm text-red-400">
                      {validationErrors.firstname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateField("lastname", e.target.value);
                    }}
                    placeholder="Enter last name"
                    className={`w-full bg-slate-700/50 border ${
                      validationErrors.lastname
                        ? "border-red-500"
                        : "border-slate-600"
                    } rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                  {validationErrors.lastname && (
                    <p className="mt-2 text-sm text-red-400">
                      {validationErrors.lastname}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setCity(e.target.value);
                      validateField("city", e.target.value);
                    }}
                    placeholder="Enter city"
                    className={`w-full bg-slate-700/50 border ${
                      validationErrors.city
                        ? "border-red-500"
                        : "border-slate-600"
                    } rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                </div>
                {validationErrors.city && (
                  <p className="mt-2 text-sm text-red-400">
                    {validationErrors.city}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      validateField("state", e.target.value);
                    }}
                    placeholder="Enter state"
                    className={`w-full bg-slate-700/50 border ${
                      validationErrors.state
                        ? "border-red-500"
                        : "border-slate-600"
                    } rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                  {validationErrors.state && (
                    <p className="mt-2 text-sm text-red-400">
                      {validationErrors.state}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => {
                      setZip(e.target.value);
                      validateField("zip", e.target.value);
                    }}
                    placeholder="Enter zip code"
                    className={`w-full bg-slate-700/50 border ${
                      validationErrors.zip
                        ? "border-red-500"
                        : "border-slate-600"
                    } rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                  {validationErrors.zip && (
                    <p className="mt-2 text-sm text-red-400">
                      {validationErrors.zip}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      validateField("phone", e.target.value);
                    }}
                    placeholder="Enter phone number"
                    className={`w-full bg-slate-700/50 border ${
                      validationErrors.phone
                        ? "border-red-500"
                        : "border-slate-600"
                    } rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-2 text-sm text-red-400">
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-slate-600/50 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-slate-500"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Cancel</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-amber-500/50 disabled:to-orange-600/50 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Update Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>

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
