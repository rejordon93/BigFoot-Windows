"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

export default function EmployeeDashboard() {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);

  useEffect(() => {
    const getQuoteData = async () => {
      try {
        const res = await axios.get("/api/quote/get");
        setQuotes(res.data);
      } catch (err) {
        console.error("Failed to fetch quotes:", err);
      }
    };
    getQuoteData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/quote/delete?id=${id}`);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete quote:", err);
      alert("Failed to delete quote. Please try again.");
    }
  };

  const getServiceColor = (serviceType: string) => {
    const colors = {
      "Lawn Care": "bg-green-100 text-green-800",
      "Tree Trimming": "bg-blue-100 text-blue-800",
      Landscaping: "bg-purple-100 text-purple-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[serviceType as keyof typeof colors] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Quotes
          </h1>
          <p className="text-lg text-gray-600">
            Manage and review customer service requests
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white px-6 py-2 rounded-full shadow-sm">
              <span className="text-sm font-medium text-gray-700">
                Total Quotes: {quotes.length}
              </span>
            </div>
          </div>
        </div>

        {/* Quote Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {quote.fullName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getServiceColor(
                      quote.serviceType
                    )}`}
                  >
                    {quote.serviceType}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Quote #{quote.id.toString().padStart(4, "0")}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                        {quote.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-gray-900 text-sm">{quote.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Address
                      </p>
                      <p className="text-gray-900 text-sm">
                        {quote.address}, {quote.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Preferred Date
                      </p>
                      <p className="text-gray-900 text-sm font-medium">
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

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Details
                      </p>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {quote.additionalDetails}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Submitted on{" "}
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {quotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quotes yet
            </h3>
            <p className="text-gray-500">
              Customer quotes will appear here once they start submitting
              requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
