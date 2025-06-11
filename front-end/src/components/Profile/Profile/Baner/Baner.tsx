"use client";
import Cover from "@/components/Profile/BanerProfile/backGround/Cover";
import LogoProfile from "./LogoProfile/LogoProfile";
export default function Baner() {
  return (
    <div className="relative p-2 lg:p-0">
      <Cover />
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <LogoProfile />
      </div>
    </div>
  );
}
