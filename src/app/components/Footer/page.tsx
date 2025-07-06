"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Star,
} from "lucide-react";

const BigFootFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 border-t border-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-2xl shadow-lg">
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5 1 3 2.5 3.5V11c-1.5 0-3 1-3 2.5v2c0 1.5 1.5 2.5 3 2.5h1v2c0 1.5 1.5 3 3 3s3-1.5 3-3v-2h1c1.5 0 3-1 3-2.5v-2c0-1.5-1.5-2.5-3-2.5V9c1.5-0.5 2.5-2 2.5-3.5C20 3.5 18.5 2 17 2c-1 0-2 0.5-2.5 1.5C14 2.5 13 2 12 2z" />
                    <circle cx="10.5" cy="5.5" r="1" />
                    <circle cx="13.5" cy="5.5" r="1" />
                    <path d="M8 20c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2zm8 0c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 tracking-wide">
                  BigFoot
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                  Window Cleaning Pro
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Professional window cleaning services that leave your windows
              crystal clear. Trusted by hundreds of satisfied customers across
              the city.
            </p>

            <div className="flex items-center space-x-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-slate-300 text-sm font-medium">
                4.9/5 from 200+ reviews
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="bg-slate-700/50 p-2 rounded-lg group-hover:bg-amber-500/20 transition-all duration-300">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">(555) 123-4567</p>
                  <p className="text-slate-400 text-sm">Mon-Fri 8AM-6PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="bg-slate-700/50 p-2 rounded-lg group-hover:bg-amber-500/20 transition-all duration-300">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">info@bigfoot.com</p>
                  <p className="text-slate-400 text-sm">24/7 Support</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="bg-slate-700/50 p-2 rounded-lg group-hover:bg-amber-500/20 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Seattle, WA</p>
                  <p className="text-slate-400 text-sm">
                    Serving Greater Seattle Area
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Services</h3>
            <div className="space-y-3">
              {[
                "Residential Window Cleaning",
                "Commercial Window Cleaning",
                "Pressure Washing",
                "Gutter Cleaning",
                "Solar Panel Cleaning",
                "Emergency Services",
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                  <span className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours & Social */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Hours & Social</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-slate-300 font-medium text-sm">
                    Business Hours
                  </p>
                  <p className="text-slate-400 text-xs">Mon-Fri: 8AM-6PM</p>
                  <p className="text-slate-400 text-xs">Sat: 9AM-4PM</p>
                  <p className="text-slate-400 text-xs">Sun: Closed</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300 font-medium">Follow Us</p>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                ].map(({ icon: Icon, label }, index) => (
                  <button
                    key={index}
                    className="group bg-slate-700/50 hover:bg-amber-500/20 p-3 rounded-xl transition-all duration-300 border border-transparent hover:border-amber-500/50"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-600">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-slate-400 text-sm">
                © 2025 BigFoot Window Cleaning. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <button className="text-slate-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-slate-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  Terms of Service
                </button>
                <button className="text-slate-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  License #WC-2025-001
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-sm">
                Available for service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BigFootFooter;
