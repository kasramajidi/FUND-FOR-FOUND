import { useState } from "react";
import { FaDiscord, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const updates = [
  {
    id: 1,
    name: "Amirhossein Shirani",
    platform: "Discord",
    icon: <FaDiscord />,
    date: "10 July 2024",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 2,
    name: "Amirhossein Shirani",
    platform: "YouTube",
    icon: <FaYoutube />,
    date: "10 May 2024",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. .",
  },
  {
    id: 3,
    name: "Amirhossein Shirani",
    platform: "Twitter",
    icon: <FaTwitter />,
    date: "5 April 2024",
    message:
      "Update from Twitter: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
  },
  {
    id: 4,
    name: "Amirhossein Shirani",
    platform: "Instagram",
    icon: <FaInstagram />,
    date: "20 March 2024",
    message:
      "Update from Instagram: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
  },
];

export default function Update() {
  const [showAll, setShowAll] = useState(false);

  const visibleUpdates = showAll ? updates : updates.slice(0, 2);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-8 w-full max-sm:gap-4">
        {visibleUpdates.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 md:gap-0 md:flex-row md:items-start relative max-sm:p-3"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-lg border-4 border-[#7c4dff] bg-gray-200 flex items-center justify-center mr-0 md:mr-6 mb-2 md:mb-0 max-sm:w-10 max-sm:h-10 max-sm:border-2"></div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-bold text-lg text-gray-800 max-sm:text-base">
                    {item.name}
                  </span>
                  <span className="text-gray-500 ml-2 max-sm:text-xs">
                    published a new update on{" "}
                    <span className="font-semibold text-gray-700">
                      {item.platform}
                    </span>
                  </span>
                </div>
                <span className="text-[#a084e8] text-sm mt-2 md:mt-0 md:absolute md:right-8 md:top-6 max-sm:static max-sm:mt-2 max-sm:text-xs">
                  {item.date}
                </span>
              </div>
              <p className="text-gray-700 mt-2 text-base max-sm:text-sm">
                {item.message}
              </p>
              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-2 border cursor-pointer border-[#a084e8] text-[#a084e8] px-4 py-2 rounded-md bg-[#f3f0ff] hover:bg-[#ede9fe] transition max-sm:px-2 max-sm:py-1 max-sm:text-xs">
                  <span className="text-lg max-sm:text-base">{item.icon}</span>
                  <span className="font-medium">{item.platform}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-8 self-center px-8 py-2 rounded-md border border-[#a084e8] text-[#a084e8] bg-[rgba(247,245,255,1)] font-medium hover:bg-[rgba(230,228,245,1)] cursor-pointer transition max-sm:px-4 max-sm:py-1.5 max-sm:text-sm"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {showAll ? "hide all" : "View all"}
      </button>
    </div>
  );
}
