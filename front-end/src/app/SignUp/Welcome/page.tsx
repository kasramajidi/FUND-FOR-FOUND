"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#644FC1] mb-4 md:mb-8">
          Welcome to 3F
        </h1>

        <div className="relative w-full h-52 sm:h-64 my-4 sm:my-8">
          <Image
            src="https://res.cloudinary.com/dkvbdk078/image/upload/v1745340854/image_1_urhmlb.png"
            alt="Celebration"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <div className="mb-8 sm:mb-10">
          <p className="text-lg sm:text-xl text-gray-600">
            Your journey begins here.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 mt-2">
            Ready to start?
          </p>
        </div>

        <div className="flex flex-row space-x-3 justify-center">
          <Link
            href="/"
            className="bg-[#644FC1] text-white py-1.5 px-4 rounded-md text-sm hover:bg-[#5342a3] transition-colors"
          >
            Go homepage
          </Link>
          <Link
            href="/Login"
            className="bg-[#644FC1] text-white py-1.5 px-4 rounded-md text-sm hover:bg-[#5342a3] transition-colors"
          >
            Start project
          </Link>
        </div>
      </div>
    </div>
  );
}
