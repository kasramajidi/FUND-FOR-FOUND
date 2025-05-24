"use client";
import Cover from "@/components/Profile/BanerProfile/backGround/Cover";
import LogoProfile from "@/components/Profile/BanerProfile/LogoProfile/LogoProfile";
import Communication from "@/components/Profile/BanerProfile/Communication/Communication";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";

export default function Baner() {
  return (
    <div className="relative p-2 lg:p-0">
      <Cover />
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <LogoProfile />
      </div>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Communication />
        <Link href="/profile/setting" className="hidden lg:flex">
          <button className="bg-[rgba(100,79,193,1)] flex items-center gap-2 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-[rgba(100,79,193,0.8)]"><IoSettingsOutline />Setting</button>        
        </Link>
        <Link href={`/profile/setting`} className="lg:hidden block">
          <IoMdSettings size={30} className="mr-5 text-[rgba(100,79,193,1)]"/>
        </Link>
      </div>
    </div>
  );
}
