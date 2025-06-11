"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Info from "@/components/Profile/setting/Info/Info";
const menuItems = [
  { label: "Public profile", icon: <FiArrowRight /> },
  { label: "Info" },
  { label: "Contribution tiers" },
  { label: "About" },
  { label: "Team" },
  { label: "Updates" },
  { label: "Expenses" },
  { label: "Pay out" },
];

const sections = {
  "Public profile": <div>Public profile section</div>,
  Info: <Info />,
  "Contribution tiers": <div>Contribution tiers section</div>,
  About: <div>About section</div>,
  Team: <div>Team section</div>,
  Updates: <div>Updates section</div>,
  Expenses: <div>Expenses section</div>,
  "Pay out": <div>Pay out section</div>,
};

export default function Page() {
  const [active, setActive] = useState("Info");

  return (
    <div className="flex gap-8 py-9 px-16">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white rounded-2xl  shadow p-6 flex flex-col gap-2">
        <div className="mb-6">
          <span className="block text-xl font-bold text-[rgba(100,79,193,1)] tracking-wide mb-2">
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
              {item.icon && <span>{item.icon}</span>}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1">{sections[active]}</div>
    </div>
  );
}
