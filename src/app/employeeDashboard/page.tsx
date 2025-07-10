"use client";
import React, { useEffect, useState } from "react";
import {
  Trash2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  LogOut,
  Briefcase,
} from "lucide-react";
import axios from "axios";

type QuoteType = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  serviceType: string;
  preferredDate: string;
  additionalDetails: string;
  createdAt: string;
};

import { useRouter } from "next/navigation";

export default function EmployeeDashboard() {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getQuotes = async () => {
      const res = await axios.get("/api/quote/get");
      setQuotes(res.data);
    };
    getQuotes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // Optimistically update UI
      setQuotes((prev) => prev.filter((q) => q.id !== id));

      // Send DELETE request with id
      await axios.delete(`/api/quote/delete?id=${id}`);
    } catch (err) {
      console.error("Failed to delete quote:", err);
      alert("Failed to delete quote. Please try again.");
    }
  };

  const handleBackToHome = async () => {
    try {
      router.push("/");
      console.log("Navigating to home...");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  };

  const getServiceColor = (serviceType: string) => {
    const colors = {
      "Lawn Care": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Tree Trimming": "bg-sky-100 text-sky-800 border-sky-200",
      Landscaping: "bg-violet-100 text-violet-800 border-violet-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[serviceType as keyof typeof colors] || colors.default;
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "Lawn Care":
        return "🌱";
      case "Tree Trimming":
        return "🌳";
      case "Landscaping":
        return "🌸";
      default:
        return "🏡";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Employee Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage customer service requests
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                <span className="text-sm font-semibold text-gray-700">
                  Total Quotes:{" "}
                  <span className="text-blue-600">{quotes.length}</span>
                </span>
              </div>
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quote Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, index) => (
            <div
              key={quote.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Card Header */}
              <div className="relative p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {quote.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        Quote #{quote.id.toString().padStart(4, "0")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getServiceColor(
                      quote.serviceType
                    )} shadow-sm`}
                  >
                    <span className="mr-2 text-lg">
                      {getServiceIcon(quote.serviceType)}
                    </span>
                    {quote.serviceType}
                  </span>
                  <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100/50">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Email
                      </p>
                      <p className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium truncate">
                        {quote.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50/50 border border-green-100/50">
                    <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Phone
                      </p>
                      <p className="text-gray-900 text-sm font-medium">
                        {quote.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100/50">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Address
                      </p>
                      <p className="text-gray-900 text-sm font-medium">
                        {quote.address}, {quote.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100/50">
                    <Calendar className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Preferred Date
                      </p>
                      <p className="text-gray-900 text-sm font-bold">
                        {new Date(quote.preferredDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/50 border border-gray-100/50">
                    <FileText className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Additional Details
                      </p>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {quote.additionalDetails}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-medium">
                    Submitted on{" "}
                    {new Date(quote.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {quotes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileText className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No quotes yet
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Customer quotes will appear here once they start submitting
              requests.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
