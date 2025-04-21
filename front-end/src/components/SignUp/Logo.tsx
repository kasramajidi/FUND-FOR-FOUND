import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600">
        FUND FOR FOUND
      </h2>
      <div className="w-[60px] sm:w-[80px]">
        <Image
          src="/image/Vectord.svg"
          width={80}
          height={80}
          alt="logo-signup"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
