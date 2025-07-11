"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

type Quote = {
  serviceType: string;
  preferredDate: string;
  status: "completed" | "pending";
};

type ActivityItem = Quote & {
  action: string;
  date: string;
};

export default function RecentActivity() {
  const [sortType, setSortType] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quote, setQuote] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuoteData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/quote/get");
        setQuote(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch quote data", error);
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };
    getQuoteData();
  }, []);

  const sortedActivity: ActivityItem[] = quote
    .map((q) => ({
      ...q,
      action: `${q.serviceType} ${
        q.status === "completed" ? "completed" : "requested"
      }`,
      date: q.preferredDate,
    }))
    .sort((a, b) => {
      if (sortType === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortType === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortType === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  const getActivityIcon = (status: string) => {
    return status === "completed" ? CheckCircle2 : AlertCircle;
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Recent Activity */}
      <div
        className={`bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-600/50 shadow-2xl transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-xl">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Recent Activity
            </h3>
          </div>

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-slate-700/50 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-slate-600/50 hover:border-amber-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                {sortOptions.find((option) => option.value === sortType)?.label}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-slate-600/50 shadow-2xl z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortType(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 first:rounded-t-xl last:rounded-b-xl hover:bg-slate-700/50 ${
                      sortType === option.value
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-6 bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 animate-pulse"
              >
                <div className="p-3 bg-slate-600/50 rounded-xl">
                  <div className="w-5 h-5 bg-slate-500 rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-600/50 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-600/50 rounded w-1/2"></div>
                </div>
                <div className="px-4 py-2 bg-slate-600/50 rounded-xl">
                  <div className="h-3 w-16 bg-slate-500 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activity List */}
        {!isLoading && (
          <div className="space-y-4">
            {sortedActivity.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.status);

              return (
                <div
                  key={`${activity.serviceType}-${activity.date}-${index}`}
                  className={`group flex items-center space-x-4 p-6 bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 ${
                    isLoaded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      activity.status === "completed"
                        ? "bg-green-500/20 group-hover:bg-green-500/30"
                        : "bg-yellow-500/20 group-hover:bg-yellow-500/30"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        activity.status === "completed"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-white font-medium text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {activity.action}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 group-hover:scale-105 ${
                      activity.status === "completed"
                        ? "bg-green-500/20 text-green-400 group-hover:bg-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30"
                    }`}
                  >
                    {activity.status
                      ? activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1)
                      : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sortedActivity.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-slate-700/30 rounded-2xl inline-block mb-4">
              <Clock className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-slate-400">No recent activity to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
