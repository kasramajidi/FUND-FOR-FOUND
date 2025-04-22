"use client";

import { useEffect, useState } from "react";
import BackButtonV from "@/components/SignUp/Verification-email/BackButtonV";
import Logo from "./../../../components/SignUp/Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import usePostEmail from "@/components/SignUp/usePostEmail";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export default function VerificationEmailPageLogin() {
  const router = useRouter();
  const [storedEmail, setStoredEmail] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userDataString = localStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData && userData.email) {
            setStoredEmail(userData.email);
            setValue("email", userData.email);
          }
        }
      } catch (error) {
        console.error("Error reading email from localStorage:", error);
      }
    }
  }, [setValue]);

  const { mutate: sendEmail, isPending: isLoading } = usePostEmail();

  const submitForm = (data: FormData) => {
    sendEmail(data, {
      onSuccess: () => {
        console.log("Verification email sent successfully");
        router.push("/Login/Verification-email/Verify-code");
      },
      onError: (error) => {
        console.error("Failed to send verification email:", error);
      },
    });
  };

  return (
    <div className="bg-white">
      <BackButtonV />
      <div className="px-4 py-8 max-w-[440px] mx-auto">
        <main className="flex flex-col items-center gap-8">
          <h1 className="text-2xl sm:text-3xl text-gray-800 text-center font-medium">
            Confirm your email
          </h1>

          <Logo />

          <form
            onSubmit={handleSubmit(submitForm)}
            className="w-full flex flex-col gap-4 px-4 sm:px-0"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder={storedEmail || "example@example.com"}
                className="w-full p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {/* Display validation error */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 cursor-pointer bg-indigo-500 text-white rounded-lg text-base font-medium transition-colors mt-2
                ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-600"
                }`}
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
