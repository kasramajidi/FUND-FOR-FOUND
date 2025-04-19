"use client";
import {RootLayout} from "./RootLayout";
import "./globals.css";
export const Metadata = {
  title: "Shopping",
  description: "This is a shopping site",
};  
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
