"use client";
import { RootLayout } from "./RootLayout";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const Metadata = {
  title: "Shopping",
  description: "This is a shopping site",
};

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <RootLayout>{children}</RootLayout>
    </QueryClientProvider>
  );
}
