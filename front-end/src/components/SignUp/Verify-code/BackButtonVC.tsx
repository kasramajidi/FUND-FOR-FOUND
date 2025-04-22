import Link from "next/link";

export default function BackButtonVC() {
  return (
    <Link
      href="/SignUp/Verification-email"
      className="hidden lg:block absolute top-28 left-24 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 text-[#644FC1] w-[39px] h-[33px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </Link>
  );
}
