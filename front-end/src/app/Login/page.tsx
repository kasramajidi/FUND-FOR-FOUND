"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Google from "../../components/Login/Google/Google";
import GoogleRes from "@/components/Login/Google/GoogleRes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// Eye icon components
const EyeIcon = () => (
  <svg
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-500"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.100391 6.54004C1.34039 2.81004 4.86029 0.120117 9.00029 0.120117C13.1403 0.120117 16.6502 2.80979 17.9002 6.52979C18.0002 6.82979 18.0002 7.15996 17.9002 7.45996C16.6602 11.19 13.1403 13.8799 9.00029 13.8799C4.86029 13.8799 1.34039 11.1902 0.100391 7.47021C0.000390626 7.17021 0.000390626 6.84004 0.100391 6.54004ZM13.3704 7C13.3704 9.42 11.4203 11.3799 9.00029 11.3799C6.58029 11.3799 4.62041 9.42 4.62041 7C4.62041 4.58 6.58029 2.62012 9.00029 2.62012C11.4203 2.62012 13.3704 4.58 13.3704 7Z"
      fill="currentColor"
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.758 9.758"
    />
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://fund-for-found-u0xg.onrender.com/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );

      // Store JWT and user data
      if (response.data && response.data.jwt) {
        try {
          // Use the context function to set the token instead of directly using localStorage
          setToken(response.data.jwt);

          if (response.data.user) {
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
            console.log("User data stored successfully", response.data.user);
          }

          // Redirect to dashboard or home
          router.push("/brand");
        } catch (storageError) {
          console.error("Error storing data in localStorage:", storageError);
          setError(
            "Error saving your login information. Please check your browser settings."
          );
        }
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Mobile version (shown on small screens) */}
      <div className="w-full max-w-md px-6 py-8 md:hidden">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#644FC1]">FUND FOR FOUND</h1>
          <div className="flex justify-center my-6">
            <Image
              src="/image/Vectord.svg"
              alt="3F Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <p className="text-sm text-gray-700">
            Create an account or sign in to start creating
          </p>
        </div>

        <GoogleRes />

        <div className="relative w-full text-center my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative">
            <span className="px-3 bg-white text-xs text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#644FC1] focus:border-[#644FC1]"
              placeholder="yourname@yahoo.com"
            />
          </div>

          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#644FC1] focus:border-[#644FC1]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <Link
              href="/Login/Verification-email"
              className="text-sm text-[#644FC1]"
            >
              Forget your password?
            </Link>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md bg-[#644FC1] text-white text-sm font-medium ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-1">Don&apos;t have one?</p>
          <Link href="/SignUp" className="text-[#644FC1] text-sm font-medium">
            Create an account
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500">
          <div className="mb-1">
            <span>Privacy Policy</span>
            <span className="mx-2">&</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Desktop version (hidden on small screens) */}
      <div className="hidden md:flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#644FC1]">
              FUND FOR FOUND
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Create an account or sign in to start creating
            </p>
            <div className="flex justify-center my-8">
              <Image
                src="/image/Vectord.svg"
                alt="3F Logo"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          <div className="mt-8">
            <Google />

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#644FC1] focus:border-[#644FC1] focus:z-10 sm:text-sm"
                  placeholder="yourname@yahoo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#644FC1] focus:border-[#644FC1] focus:z-10 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
                <div className="text-left mt-1">
                  <Link
                    href="/Login/Verification-email"
                    className="text-sm text-[#644FC1]"
                  >
                    Forget your password?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#644FC1] hover:bg-[#5342a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#644FC1] ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Logging in..." : "Continue"}
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-col items-center">
              <p className="text-sm text-gray-600">Don&apos;t have one? </p>
              <Link
                href="/SignUp"
                className="font-medium text-[#644FC1] hover:text-[#5342a3]"
              >
                <span>Create an account</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            This site is protected by reCAPTCHA and the Google{" "}
            <Link
              href="https://policies.google.com/privacy"
              className="text-[#644FC1]"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="https://policies.google.com/terms"
              className="text-[#644FC1]"
            >
              Terms of Service
            </Link>{" "}
            apply.
          </div>
        </div>
      </div>
    </div>
  );
}
