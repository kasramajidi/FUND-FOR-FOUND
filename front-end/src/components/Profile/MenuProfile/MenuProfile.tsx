"use client";
import React, { useState } from "react";
import ContributionTier from "./ContributionTier/ContributionTier";
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

export default function MenuProfile() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="max-w-7xl mx-auto flex items-center justify-between mt-20 border-b pb-5 border-[rgba(231,231,231,1)]">
        <div className="max-w-5xl w-full px-[128px] flex items-start justify-between gap-8">
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
      <div className="max-w-5xl mx-auto mt-32">
        <ContributionTier/>
      </div>
    </div>
  );
}
