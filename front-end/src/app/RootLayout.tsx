"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./../context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const hideFooter =
    pathName === "/SignUp/Verification-email" ||
    pathName === "/SignUp" ||
    pathName === "/signup" ||
    pathName === "/SignUp/Verify-code" ||
    pathName === "/signup/verify-code" ||
    pathName === "/SignUp/Password" ||
    pathName === "/signup/password" ||
    pathName === "/SignUp/Welcome" ||
    pathName === "/signup/welcome" ||
    pathName === "/login" ||
    pathName === "/Login" ||
    pathName === "/Login/Verification-email"||
    pathName === "/login/verification-email"||
    pathName === "/Login/Verification-email/Verify-code" ||
    pathName === "/login/verification-email/verify-code" ||
    pathName === "/Login/Verification-email/Verify-code/forgot-password" ||
    pathName === "/login/verification-email/verify-code/forgot-password" ||
    pathName === "/Login/Verification_Login_google" ||
    pathName === "/login/verification_Login_google" ||
    pathName === "/SignUp/Verification_SignUp_google" ||
    pathName === "/signUp/verification_SignUp_google"

  const hideWelcome =
    pathName === "/SignUp/Welcome" || pathName === "/signup/welcome";
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {!hideWelcome && <Header />}
          {children}
          {!hideFooter && <Footer />}
        </body>
      </html>
    </AuthProvider>
  );
};
