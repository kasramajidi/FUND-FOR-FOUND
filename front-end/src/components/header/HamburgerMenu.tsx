import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
interface MenuItem {
  name: string;
  link: string;
  hasArrow: boolean;
}

const dataPage: MenuItem[] = [
  {
    name: "Explore",
    link: "/Explore",
    hasArrow: true,
  },
  {
    name: "Home",
    link: "/",
    hasArrow: true,
  },
  {
    name: "About us",
    link: "/AboutUs",
    hasArrow: false,
  },
  {
    name: "Help & Support",
    link: "/Help&Support",
    hasArrow: false,
  },
];

const dataPageAuthenticated: MenuItem[] = [
  {
    name: "Explore",
    link: "/Explore",
    hasArrow: true,
  },
  {
    name: "Home",
    link: "/",
    hasArrow: true,
  },
  {
    name: "profile",
    link: "/profile",
    hasArrow: false,
  },
  {
    name: "settings",
    link: "/",
    hasArrow: false,
  },
  {
    name: "About us",
    link: "/AboutUs",
    hasArrow: false,
  },
  {
    name: "Help & Support",
    link: "/Help&Support",
    hasArrow: false,
  },
];

export default function HamburgerMenu(): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, clearToken } = useAuth();

  const handleLogout = (): void => {
    localStorage.removeItem("userData");
    clearToken();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5"
        type="button"
        aria-label="Open menu"
      >
        <span
          className={`w-6 h-0.5 bg-[#644FC1] transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-[#644FC1] transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-[#644FC1] transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40">
          {/* Top Bar */}
          <div className="flex justify-between items-center p-6">
            <Link href="/">
              <Image
                src="https://res.cloudinary.com/dkvbdk078/image/upload/v1745050934/Vector_t5ac7v.png"
                width={28}
                height={48}
                alt="logo"
                className="w-7 h-12"
              />
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2" type="button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#644FC1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="#644FC1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-6 pt-8">
            {isAuthenticated
              ? dataPageAuthenticated.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex justify-between items-center py-4 text-[#644FC1] text-xl font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    {item.hasArrow && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="#644FC1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                ))
              : dataPage.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex justify-between items-center py-4 text-[#644FC1] text-xl font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    {item.hasArrow && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="#644FC1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                ))}
          </div>

          {/* Bottom Buttons */}
          <div className="absolute bottom-8 left-6 right-6 space-y-4">
            {isAuthenticated ? (
              <>
                <button
                  className="w-full py-3 text-[#644FC1] border border-[#644FC1] rounded-lg"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <span onClick={handleLogout}>Logout</span>
                </button>
                <button
                  className="w-full py-3 text-white bg-[#644FC1] rounded-lg"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <Link href={"/Brand"}>Start</Link>
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  className="w-full py-3 text-[#644FC1] border border-[#644FC1] rounded-lg"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <Link href={"/Login"}>Login/signup</Link>
                </button>
                <button
                  className="w-full py-3 text-white bg-[#644FC1] rounded-lg"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <Link href={"/Brand"}>Start</Link>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
