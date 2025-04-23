"use client";

import BackButton from "./../../components/SignUp/BackButton";
import Logo from "./../../components/SignUp/Logo";
import SignUpForm from "./../../components/SignUp/SignUpForm";
import Footer from "./../../components/SignUp/Footer";
import GoogleSingUp from "@/components/SignUp/Google/Google";
export default function SignUp() {
  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="px-4 py-8 max-w-[440px] lg:max-w-[600px] mx-auto">
        <main className="flex flex-col items-center gap-6">
          <h1 className="text-2xl  sm:text-4xl text-gray-800 text-center font-medium">
            Create your personal account
          </h1>

          <Logo />
          
          <GoogleSingUp/>
          <div className="relative w-full text-center my-2">
            <span className="relative z-10 bg-white px-4 text-sm text-gray-500">
              or
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <SignUpForm />
          <Footer />
        </main>
      </div>
    </div>
  );
}
