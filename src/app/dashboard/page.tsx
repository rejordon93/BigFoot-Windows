"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User, MapPin, Mail, Phone, Edit3, ArrowLeft } from "lucide-react";
import ProfileServices from "./components/ProfileServices/page";

type profileDataType = {
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
};
type userData = {
  email: string;
  isOnline: boolean;
};

export default function Dashboard() {
  const [profileData, setProfileData] = useState<profileDataType | null>(null);
  const [userData, setUserData] = useState<userData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const resData = async () => {
      const res = await axios.get("/api/profile/get");
      setProfileData(res.data.profileData);
      setIsLoaded(true);
    };
    resData();
  }, []);

  useEffect(() => {
    const data = async () => {
      const res = await axios.get("/api/user");
      setUserData(res.data.user);
    };
    data();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-slate-400">Manage your profile and preferences</p>
        </div>

        {/* Profile Header */}
        <div
          className={`bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-600/50 p-8 mb-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative group">
              <div className="w-28 h-28 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/25">
                <User className="w-14 h-14 text-slate-900" />
              </div>
              <div
                className={`absolute -top-2 -right-2 w-7 h-7 ${
                  userData?.isOnline ? "bg-green-500" : "bg-gray-500"
                } rounded-full border-3 border-slate-800 shadow-lg`}
              >
                {userData?.isOnline && (
                  <div className="w-full h-full rounded-full animate-ping bg-green-400 opacity-75"></div>
                )}
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {profileData?.firstname} {profileData?.lastname}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
                <div className="flex items-center justify-center lg:justify-start space-x-2 bg-slate-700/30 rounded-xl p-3 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">
                    {profileData?.city}, {profileData?.state} {profileData?.zip}
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 bg-slate-700/30 rounded-xl p-3 backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">{userData?.email}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 bg-slate-700/30 rounded-xl p-3 backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">
                    {profileData?.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button className="group flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25">
                <Edit3 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>
                  <Link href="/dashboard/components/EditProfile">
                    Edit Profile
                  </Link>
                </span>
              </button>

              <button className="group flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>
                  <Link href="/">Return to Home</Link>
                </span>
              </button>
            </div>
          </div>
        </div>

        <ProfileServices />
      </div>
    </div>
  );
}
