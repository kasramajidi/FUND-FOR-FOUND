"use client";

import { useState } from "react";
import useUserStore from "@/store/useUserStore";
import { usePostData } from "@/components/SignUp/usePostData";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { firstName, lastName, email } = useUserStore();
  const { mutate, isLoading, error } = usePostData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setPasswordError("");
    await mutate({ firstName, lastName, email, password });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 bg-indigo-500 text-white rounded-lg font-medium
            ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-600"
            }`}
        >
          {isLoading ? "Processing..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
}
