import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavbarBrandProps {
  currentStep?: number;
  totalSteps?: number;
}

const NavbarBaner: React.FC<NavbarBrandProps> = ({ totalSteps = 3 }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentStep = () => {
    if (pathname?.includes("part-two")) return 2;
    if (pathname?.includes("part-three")) return 3;
    return 1;
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const currentStep = getCurrentStep();

    switch (currentStep) {
      case 3:
        router.push("/brand/part-two");
        break;
      case 2:
        router.push("/brand");
        break;
      default:
        router.push("/");
        break;
    }
  };

  // Generate array of steps
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const currentStep = getCurrentStep();

  return (
    <div className="w-full py-4 lg:py-6 px-4 lg:px-6 mt-4 lg:mt-6 flex items-center justify-between shadow-[19px_7px_20px_rgba(149,149,149,0.15)]">
      <button
        onClick={handleBack}
        className="text-indigo-600 cursor-pointer hidden lg:block hover:text-indigo-800 transition-colors"
        aria-label="Go back"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 lg:w-8 lg:h-8"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex items-center justify-center flex-1">
        {steps.map((step) => (
          <React.Fragment key={step}>
            {/* Step circle */}
            <div
              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-base lg:text-lg font-medium
                ${
                  step <= currentStep
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
            >
              {step}
            </div>

            {/* Connecting line (if not last step) */}
            {step < totalSteps && (
              <div
                className={`h-[1px] w-[60px] lg:w-[120px]
                  ${
                    step < currentStep
                      ? "bg-indigo-600"
                      : "bg-[rgba(245,245,245,1)]"
                  }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavbarBaner;
