"use client";
import React, { useState } from "react";
import Info from "@/components/Profile/setting/Info/Info";
import ContributionTiers from "@/components/Profile/setting/ContributionTiers/ContributionTiers";
import About from "@/components/Profile/setting/About/About";
import TeamS from "@/components/Profile/setting/Team/TeamS";
import Pay from "@/components/Profile/setting/Pay/Pay";
import UpdateS from "@/components/Profile/setting/Update/UpdateS";
const menuItems = [
  { label: "Info" },
  { label: "Contribution tiers" },
  { label: "About" },
  { label: "Team" },
  { label: "Updates" },
  { label: "Expenses" },
  { label: "Pay out" },
];

const sections = {
  Info: <Info />,
  "Contribution tiers": <ContributionTiers />,
  About: <About />,
  Team: <TeamS/>,
  Updates: <UpdateS/>,
  Expenses: <div>Expenses section</div>,
  "Pay out": <Pay/> ,
};

export default function Page() {
  const [active, setActive] = useState("Info");

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-4 sm:py-9 px-2 sm:px-16">
      {/* Sidebar Desktop */}
      <aside className="hidden sm:flex w-[260px] bg-white rounded-2xl shadow p-6 flex-col gap-2 min-h-[90vh]">
        <div className="mb-6">
          <span className="block text-xl font-bold text-[#7c4dff] tracking-wide mb-2">
            FUND FOR FOUND
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`flex cursor-pointer items-center justify-between text-[17px] font-medium py-2 px-3 rounded transition ${
                active === item.label
                  ? "text-[#7c4dff] bg-[#ede9fe]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActive(item.label)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Sidebar Mobile */}
      <nav className="flex sm:hidden w-full bg-white rounded-2xl shadow mb-4 px-2 py-2 gap-1 overflow-x-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex cursor-pointer items-center text-[15px] font-medium py-2 px-3 rounded transition whitespace-nowrap ${
              active === item.label
                ? "text-[#7c4dff] bg-[#ede9fe]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive(item.label)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {/* Main Content */}
      <div className="flex-1">{sections[active]}</div>
    </div>
  );
}
