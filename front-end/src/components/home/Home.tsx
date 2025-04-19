"use client";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { FC } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
}

const Home: FC = () => {
  const { isAuthenticated }: AuthContextType = useAuth();
  return (
    <div className="flex flex-col items-center justify-center mt-24 px-6 lg:px-0">
      <h1 className="text-[#270F94] lg:text-[32px] text-[20px] font-bold">
        Create your profile and take the first step towards new opportunities
      </h1>
      <span className="text-[#717171] lg:text-center text-justify max-w-[900px] mt-8">
        By creating your account, you all gain access to a thriving community
        where brands and individuals are committed to offering you ongoing
        support. This support network will empower you with the resources,
        guidance, and connections you need to succeed, ensuring that you&apos;re
        never alone on your journey.
      </span>
      <div className="flex flex-col items-center justify-between border border-[#644FC1] rounded-lg px-8 pt-[65px] pb-[34px] mt-[99px] h-[459px] w-[319px]">
        <Image
          src="https://res.cloudinary.com/dkvbdk078/image/upload/v1745059589/Vector5_ogqneh.png"
          alt="profile"
          width={70}
          height={60}
        />
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-[#644FC1] text-[24px] font-bold">
            Brand or organization
          </h2>
          <span className="text-xs text-start text-[#959595]">
            If your brand is established and you are looking for continuous
            support, get started now.
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {isAuthenticated ? (
            <Link href={"/Brand"}>
              <button className="bg-[#644FC1] text-white px-4 py-2 rounded-lg cursor-pointer">
                Start
              </button>
            </Link>
          ) : (
            <Link href={"/Login"}>
              <button className="bg-[#644FC1] hover:bg-[#644FF1] text-white w-[259px] py-2 rounded-lg cursor-pointer">
                Start
              </button>
            </Link>
          )}
          <Link href={"/AboutUs"}>
            <span className="text-[#8D75F7] text-xs underline">learn more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
