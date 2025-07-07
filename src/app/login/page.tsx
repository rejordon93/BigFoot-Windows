"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { itemVariants } from "./components/LoginFuns";
import { containerVariants } from "./components/LoginFuns";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      await axios.post("/api/login", {
        email,
        password,
      });

      // Simulate delay and success message
      setTimeout(() => {
        setMessage("✅ Login successful! Redirecting...");
        setIsLoading(false);
        setTimeout(() => {
          router.push("/");
          console.log("Redirecting to dashboard...");
        }, 1500);
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlMessage = searchParams.get("message");
    if (urlMessage) {
      setMessage(urlMessage);

      // Auto-clear message after 5 seconds
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const clearMessage = () => setMessage("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-3xl"
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
              className="inline-block p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-white/70 mt-2">Sign in to your account</p>
          </motion.div>

          {/* Success / Error Messages */}
          {message && (
            <motion.div
              className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-2xl mb-6 text-sm backdrop-blur-sm flex justify-between items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span>{message}</span>
              <button
                onClick={clearMessage}
                className="ml-2 text-green-200 hover:text-green-100 transition-colors"
              >
                ×
              </button>
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
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

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.p
            className="text-center text-white/70 mt-6 text-sm"
            variants={itemVariants}
          >
            Don&apos;t have an account?{" "}
            <motion.a
              href="/signUp"
              className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Sign up
            </motion.a>
          </motion.p>

          {/* Forgot Password */}
          <motion.div className="text-center mt-4" variants={itemVariants}>
            <motion.a
              href="/forgot-password"
              className="text-white/60 hover:text-white/80 text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Forgot your password?
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-md"
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
          className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-full blur-md"
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
      </motion.div>
    </div>
  );
}
