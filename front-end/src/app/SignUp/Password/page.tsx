"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useChangePassword from "../../../components/SignUp/Password/useChangePassword";
import BackButtonP from "../../../components/SignUp/Password/BackButtonP";

const passwordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
  confirmPassword: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface FormData {
  password: string;
  confirmPassword: string;
}

// Simple SVG Icons for visibility toggle
const EyeIcon = () => (
  <svg
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.100391 6.54004C1.34039 2.81004 4.86029 0.120117 9.00029 0.120117C13.1403 0.120117 16.6502 2.80979 17.9002 6.52979C18.0002 6.82979 18.0002 7.15996 17.9002 7.45996C16.6602 11.19 13.1403 13.8799 9.00029 13.8799C4.86029 13.8799 1.34039 11.1902 0.100391 7.47021C0.000390626 7.17021 0.000390626 6.84004 0.100391 6.54004ZM13.3704 7C13.3704 9.42 11.4203 11.3799 9.00029 11.3799C6.58029 11.3799 4.62041 9.42 4.62041 7C4.62041 4.58 6.58029 2.62012 9.00029 2.62012C11.4203 2.62012 13.3704 4.58 13.3704 7Z"
      fill="#C7C6C6"
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.758 9.758"
    />
  </svg>
);

export default function SetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { mutate: changePassword, isPending: isLoading } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem("user");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.id) {
          setUserId(userData.id.toString());
        } else {
          console.error("User object doesn't contain an ID");
        }
      } else {
        console.error("No user object found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const onSubmit = (data: FormData) => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    changePassword(
      { userId, password: data.password },
      {
        onSuccess: (response) => {
          console.log("Password set successfully:", response.message);
          router.push("/SignUp/Welcome");
        },
        onError: (error) => {
          console.error("Failed to set password:", error);
        },
      }
    );
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <BackButtonP />
      <div className="max-w-md w-full space-y-8 p-6 sm:p-10 z-10">
        <div className="text-center">
          <Image
            src={"/image/Vector12.svg"}
            width={75}
            height={78}
            alt="logo-password"
            className="justify-self-center mx-auto"
          />
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#644FC1]">
            Set your password
          </h2>
        </div>

        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="rounded-md">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  {...register("password")}
                  className={`appearance-none relative block w-full px-3 py-2 sm:py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 cursor-pointer pr-3 flex items-center text-sm leading-5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {/* Helper Text */}
              <ul className="text-xs text-gray-500 mt-2 pl-1 list-disc list-inside space-y-1">
                <li>At least 8 characters long but 12 or more is better.</li>
                <li>
                  A combination of uppercase letters, lowercase letters,
                  numbers, and symbols.
                </li>
              </ul>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1 pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Re enter password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  {...register("confirmPassword")}
                  className={`appearance-none relative block w-full px-3 py-2 sm:py-3 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm`}
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1 pl-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                !isValid || isLoading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-[#644FC1] hover:bg-indigo-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isLoading ? "Setting Password..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
