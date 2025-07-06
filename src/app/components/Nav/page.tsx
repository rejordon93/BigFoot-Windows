"use client";
import React, { useState } from "react";
import { User, LogOut, Quote, Menu, X, LogIn } from "lucide-react";
import Link from "next/link";

const BigFootNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getCookie = () => {
    if (document.cookie) {
      console.log("Cookies found:", document.cookie);
    } else {
      console.log("No cookies set.");
    }
  };
  getCookie();
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 shadow-2xl border-b border-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side - BigFoot Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                {/* BigFoot Icon */}
                <svg
                  className="w-10 h-10 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5 1 3 2.5 3.5V11c-1.5 0-3 1-3 2.5v2c0 1.5 1.5 2.5 3 2.5h1v2c0 1.5 1.5 3 3 3s3-1.5 3-3v-2h1c1.5 0 3-1 3-2.5v-2c0-1.5-1.5-2.5-3-2.5V9c1.5-0.5 2.5-2 2.5-3.5C20 3.5 18.5 2 17 2c-1 0-2 0.5-2.5 1.5C14 2.5 13 2 12 2z" />
                  <circle cx="10.5" cy="5.5" r="1" />
                  <circle cx="13.5" cy="5.5" r="1" />
                  <path d="M8 20c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2zm8 0c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 tracking-wide">
                BigFoot
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Window & Gutter Cleaning
              </p>
            </div>
          </div>

          {/* Right side - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 px-4 py-3 rounded-xl hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600">
              <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">
                <Link href="/login">Login</Link>
              </span>
            </button>
            <button className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 px-4 py-3 rounded-xl hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600">
              <Quote className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Quotes</span>
            </button>

            <button className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 px-4 py-3 rounded-xl hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">
                <Link href="/profile">Profile</Link>
              </span>
            </button>

            <button className="group flex items-center space-x-3 text-slate-300 hover:text-red-400 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-red-600/20 backdrop-blur-sm border border-transparent hover:border-red-500/50">
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-300 hover:text-amber-400 focus:outline-none focus:text-amber-400 transition-all duration-300 p-2 rounded-lg hover:bg-slate-700/50"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-sm rounded-2xl mt-4 mb-4 shadow-2xl border border-slate-600">
            <div className="px-4 pt-4 pb-4 space-y-2">
              <button className="group flex items-center space-x-4 text-slate-300 hover:text-white transition-all duration-300 px-4 py-4 rounded-xl hover:bg-slate-700/50 w-full text-left border border-transparent hover:border-slate-600">
                <Quote className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-lg">Quotes</span>
              </button>

              <button className="group flex items-center space-x-4 text-slate-300 hover:text-white transition-all duration-300 px-4 py-4 rounded-xl hover:bg-slate-700/50 w-full text-left border border-transparent hover:border-slate-600">
                <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-lg">Profile</span>
              </button>

              <button className="group flex items-center space-x-4 text-slate-300 hover:text-red-400 transition-all duration-300 px-4 py-4 rounded-xl hover:bg-red-600/20 w-full text-left border border-transparent hover:border-red-500/50">
                <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-lg">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BigFootNavbar;
