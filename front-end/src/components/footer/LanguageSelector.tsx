import React, { FC } from "react";

const LanguageSelector: FC = () => (
  <button
    type="button"
    className="flex items-center space-x-1 text-xs md:text-sm bg-white px-4 md:px-8 py-1.5 md:py-2 text-gray-600 hover:text-gray-900"
    aria-label="Select language"
  >
    <span>English (100%)</span>
    <svg
      className="w-3 h-3 md:w-4 md:h-4 ml-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
);

export default LanguageSelector;
