"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./../context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const hideHeader = pathName === "/SignUp/Verification-email" || pathName === "/SignUp" || pathName === "/signup" || pathName === "/SignUp/Verify-code"|| pathName === "/SignUp/verify-code" || pathName === "/SignUp/Password" || pathName === "/SignUp/password" || pathName === "/SignUp/Welcome" || pathName === "/SignUp/welcome";

  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          {!hideHeader && <Footer />}
        </body>
      </html>
    </AuthProvider>
  );
};
