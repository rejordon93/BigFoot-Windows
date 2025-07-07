"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    try {
      await axios.post("/api/signUp", {
        username,
        email,
        password,
      });

      // Simulate delay and success message
      setTimeout(() => {
        setMessage("✅ Account created! Redirecting to login...");
        setIsLoading(false);
        setTimeout(() => {
          router.push("/login");
          console.log("Redirecting to login...");
        }, 1500);
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Sign up failed. Please try again."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Sign up failed. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-lime-500/10 to-emerald-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glass Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Logo/Title */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="inline-block p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Join Us Today
            </h2>
            <p className="text-white/70 mt-2">
              Create your account to get started
            </p>
          </motion.div>

          {/* Success / Error Messages */}
          {message && (
            <motion.div
              className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-2xl mb-6 text-sm backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl mb-6 text-sm backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Username Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Password Strength Indicator */}
            <motion.div variants={itemVariants}>
              <div className="flex space-x-1 mb-2">
                <div
                  className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
                    password.length >= 8 ? "bg-emerald-500" : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
                    password.length >= 8 && /[A-Z]/.test(password)
                      ? "bg-emerald-500"
                      : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
                    password.length >= 8 &&
                    /[A-Z]/.test(password) &&
                    /[0-9]/.test(password)
                      ? "bg-emerald-500"
                      : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
                    password.length >= 8 &&
                    /[A-Z]/.test(password) &&
                    /[0-9]/.test(password) &&
                    /[^A-Za-z0-9]/.test(password)
                      ? "bg-emerald-500"
                      : "bg-white/20"
                  }`}
                />
              </div>
              <p className="text-xs text-white/60">
                Password strength: {password.length < 8 ? "Too short" : "Good"}
              </p>
            </motion.div>

            {/* Terms Agreement */}
            <motion.div variants={itemVariants}>
              <label className="flex items-start space-x-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500 focus:ring-2"
                  required
                />
                <span>
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-emerald-300 hover:text-emerald-200 underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-emerald-300 hover:text-emerald-200 underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>

          {/* Sign In Link */}
          <motion.p
            className="text-center text-white/70 mt-6 text-sm"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <motion.a
              href="/login"
              className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Sign in
            </motion.a>
          </motion.p>

          {/* Social Login Options */}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-md"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-md"
          animate={{
            y: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-4 w-6 h-6 bg-gradient-to-r from-lime-500/30 to-emerald-500/30 rounded-full blur-sm"
          animate={{
            x: [0, 15, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>
    </div>
  );
}
