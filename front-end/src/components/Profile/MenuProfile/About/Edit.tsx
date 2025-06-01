import React from "react";

export default function Edit() {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-0">
      <div className="rounded-lg">
        <div className="w-full h-[200px] sm:h-[300px] lg:h-[433px] bg-gray-200 rounded-md flex items-center justify-center overflow-hidden mb-4 sm:mb-5 lg:mb-6">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[rgba(199,198,198,1)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2 2l1.586-1.586a2 2 0 012.828 0L20 18m-4-8h.01M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <div className="mb-6 sm:mb-7 lg:mb-8 text-[rgba(149,149,149,1)]">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Summary</h2>
          <p className="text-xs sm:text-sm mb-3 sm:mb-4">
            Introduce yourself, your team (if you have) and your background.
          </p>
          <p className="text-xs sm:text-sm">
            Briefly describe about the long term and short term goal of your
            brand and why it&apos;s important to you.
          </p>
        </div>

        {/* The Impact Section */}
        <div className="mb-6 sm:mb-7 lg:mb-8 text-[rgba(149,149,149,1)]">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
            The Impact
          </h2>
          <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-xs sm:text-sm pl-2 sm:pl-4">
            <li>
              Share more about your brand and highlight how contributions can
              make a meaningful impact
            </li>
            <li>
              Explain why your brand is important to contributors and how it
              positively influences the world.
            </li>
            <li>
              Showcase your brand&apos;s proven success and past achievements,
              if applicable
            </li>
            <li>
              Help people connect with your brand&apos;s mission and build trust
              by sharing authentic stories and experiences
            </li>
          </ul>
        </div>

        <div className="text-[rgba(149,149,149,1)]">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
            The story
          </h2>
          <p className="text-xs sm:text-sm">
            Share the vision of your organization and the journey that led to
            its establishment
          </p>
        </div>
      </div>
    </div>
  );
}
