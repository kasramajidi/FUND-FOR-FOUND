"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../header/Navbar";
import Search from "../header/Search";
import ProfileAvatar from "../header/ProfileAvatar";
import HamburgerMenu from "../header/HamburgerMenu";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps): React.ReactElement {
  return (
    <>
      <header className={`max-w-[1440px] mt-5 mx-auto ${className || ""}`}>
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 gap-6 items-center">
          <div className="col-span-4">
            <Link href={"/"}>
              <Image
                src={"https://res.cloudinary.com/dkvbdk078/image/upload/v1745050934/Vector_t5ac7v.png"}
                width={28}
                height={48}
                alt="logo"
                className="w-7 h-12"
              />
            </Link>
          </div>
          <div className="col-span-4">
            <Navbar />
          </div>
          <div className="col-span-4 flex items-center justify-end gap-5">
            <Search />
            <ProfileAvatar />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center px-6">
          <Link href={"/"}>
            <Image
              src={"https://res.cloudinary.com/dkvbdk078/image/upload/v1745050934/Vector_t5ac7v.png"}
              width={28}
              height={48}
              alt="logo"
              className="w-7 h-12"
            />
          </Link>
          <div className="flex items-center gap-5">
            <Search />
            <HamburgerMenu />
          </div>
        </div>
      </header>
      <hr className="bg-[#D7CFF9] mt-5 h-[2px] lg:block hidden" />
    </>
  );
}
