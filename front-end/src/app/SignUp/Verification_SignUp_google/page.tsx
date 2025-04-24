"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface GoogleResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

// This interface is for JWT decoding
interface GoogleJwtPayload {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

interface GoogleInitializeConfig {
  client_id: string | undefined;
  callback: (response: GoogleResponse) => void;
  auto_select: boolean;
  context: string;
  ux_mode: string;
  cancel_on_tap_outside: boolean;
}

interface GoogleButtonConfig {
  type: string;
  theme: string;
  size: string;
  text: string;
  shape: string;
  logo_alignment: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleInitializeConfig) => void;
          renderButton: (
            element: HTMLElement | null,
            config: GoogleButtonConfig
          ) => void;
        };
      };
    };
  }
}

export default function Verification_SignUp_google() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setToken } = useAuth();

  // Function to decode JWT token from Google
  const decodeJwt = (token: string): GoogleJwtPayload => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return {};
    }
  };

  const handleCredentialResponse = async (response: GoogleResponse) => {
    try {
      console.log(
        "Got Google response:",
        response.credential ? "Has credential" : "No credential"
      );

      if (!response.credential) {
        setError("Authentication failed. Please try again.");
        return;
      }

      // Decode the JWT to get user information
      const payload = decodeJwt(response.credential);
      console.log("Google user info:", payload);

      if (!payload.email) {
        setError("Could not retrieve email from Google. Please try again.");
        return;
      }

      // Create user object with actual email from Google
      const user = {
        id: new Date().getTime(), // Generate a unique ID
        username: payload.name || payload.email.split("@")[0],
        email: payload.email,
        name: payload.name || "",
        firstName: payload.given_name || "",
        lastName: payload.family_name || "",
        avatar: payload.picture || "",
        provider: "google",
      };

      // Generate a simple JWT token (for development only)
      // In production, this should be issued by your server
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          sub: user.id,
          email: user.email,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        })
      )}.DEVELOPMENT_SIGNATURE`;

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(user));

      // Use context to set token instead of directly using localStorage
      setToken(token);

      console.log("Signup successful with email:", user.email);
      router.push("/brand");
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please try again later.");
    }
  };

  // لود کردن اسکریپت گوگل
  useEffect(() => {
    const script = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    ) as HTMLScriptElement | null;

    const tryInitialize = () => {
      if (window.google && window.google.accounts?.id) {
        setIsLoading(false); // فقط isLoading رو false می‌کنیم، تا useEffect دوم دکمه رو بسازه
      } else {
        setTimeout(tryInitialize, 300);
      }
    };

    if (script) {
      if (script.getAttribute("data-loaded") === "true") {
        tryInitialize();
      } else {
        script.addEventListener("load", () => {
          script.setAttribute("data-loaded", "true");
          tryInitialize();
        });
      }
    } else {
      const newScript = document.createElement("script");
      newScript.src = "https://accounts.google.com/gsi/client";
      newScript.async = true;
      newScript.defer = true;
      newScript.onload = () => {
        newScript.setAttribute("data-loaded", "true");
        tryInitialize();
      };
      newScript.onerror = () => {
        setError("Failed to load Google API.");
        setIsLoading(false);
      };
      document.head.appendChild(newScript);
    }
  }, []);

  // اجرای renderButton بعد از رندر DOM
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const buttonElement = document.getElementById("google-signin-button");
      if (
        buttonElement &&
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          context: "signin",
          ux_mode: "popup",
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(buttonElement, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "left",
        });
      }
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-6 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Sign up with Google</span>
        </div>

        {/* Logo */}
        <div className="justify-self-center self-center my-8">
          <Image
            src={"/image/Vectord.svg"}
            width={109}
            height={100}
            alt="logo-google"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-normal text-[#644FC1] mb-2">
            Choose an account
          </h2>
          <p className="text-gray-600">to continue with Google</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Google Button */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div
              id="google-signin-button"
              className="w-full flex justify-center"
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            This site is protected by reCAPTCHA and the Google{" "}
            <Link
              href="https://policies.google.com/privacy"
              className="text-[#644FC1] hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="https://policies.google.com/terms"
              className="text-[#644FC1] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
}
