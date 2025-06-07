"use client";
import React, { useState } from "react";
import ContributionTier from "./ContributionTier/ContributionTier";
import About from "./About/About";
import Team from "./Team/Team";
import Individual from "./Individual/Individual";
const Menu = [
  {
    title: "Contribution Tier",
  },
  {
    title: "About",
  },
  {
    title: "team",
  },
  {
    title: "top backers & contributors",
  },
  {
    title: "faq",
  },
  {
    title: "update",
  },
];

const menuMobile = [
  {
    title: "OverView",
  },
  {
    title: "top backers & contributors",
  },
  {
    title: "faq",
  },
  {
    title: "updates",
  },
];

export default function MenuProfile() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="max-w-5xl w-full px-[128px] flex items-start justify-between gap-8 mt-20 border-b pb-5 border-[rgba(231,231,231,1)]">
          {Menu.map((item, idx) => (
            <span
              key={item.title}
              className={`font-bold cursor-pointer uppercase pb-2 transition-all duration-200 ${
                active === idx
                  ? "border-b-2 border-purple-700"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActive(idx)}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden max-w-7xl mx-auto">
        <div className="w-full px-4 flex items-start justify-between gap-4 mt-20 border-b pb-5 border-[rgba(231,231,231,1)] overflow-x-auto">
          {menuMobile.map((item, idx) => (
            <span
              key={item.title}
              className={`whitespace-nowrap font-bold cursor-pointer uppercase pb-2 transition-all duration-200 ${
                active === idx
                  ? "border-b-2 border-purple-700"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActive(idx)}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-28 max-w-5xl mx-auto">
        {active === 0 && <ContributionTier />}
        <About />
        <Team />
        <Individual />
      </div>
    </>
  );
}
