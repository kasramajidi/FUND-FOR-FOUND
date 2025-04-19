import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";

export default function Header(): React.ReactElement {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/image/Vector.png"
                width={28}
                height={48}
                alt="logo"
                className="w-7 h-12"
              />
            </Link>
            <Search />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2" type="button">
              <Image
                src="/image/VectorIcon.png"
                width={20}
                height={20}
                alt="search"
              />
            </button>
            <HamburgerMenu />
          </div>
        </div>
      </div>
      <div className="border-b border-[#E7E7E7]"></div>
    </header>
  );
}
