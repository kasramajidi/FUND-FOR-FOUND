"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./../context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const hideHeader = pathName === "/SignUp/Verification-email" || pathName === "/SignUp" || pathName === "/signup" ;

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
