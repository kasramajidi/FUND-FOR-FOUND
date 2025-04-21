"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import usePostData from "./usePostData";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(15, "First name must not exceed 15 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must not exceed 20 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { mutate: registerUser, isPending: isLoading } = usePostData();

  const submitForm = (data: FormData) => {
    registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full flex flex-col gap-4 px-4 sm:px-0"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="firstName"
          className="text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <input
          {...register("firstName")}
          type="text"
          id="firstName"
          className="w-full p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
          Last name
        </label>
        <input
          {...register("lastName")}
          type="text"
          id="lastName"
          className="w-full p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="e.g. yourname@yahoo.com"
          className="w-full p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-1">
        We will send you 6 digit code to your email.
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 cursor-pointer bg-indigo-500 text-white rounded-lg text-base font-medium transition-colors mt-4
          ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-600"
          }`}
      >
        {isLoading ? "Processing..." : "Continue"}
      </button>
    </form>
  );
}
