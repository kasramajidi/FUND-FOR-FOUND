"use client";
import React, { useRef, useState, useEffect } from "react";
import ContributionTier from "./ContributionTier/ContributionTier";
import About from "./About/About";
import Team from "./Team/Team";
import Individual from "./Individual/Individual";
import Update from "./Update/Update";
import FAQ from "./FAQ/FAQ";

const Menu = [
  { title: "Contribution Tier", id: "contribution-tier" },
  { title: "About", id: "about" },
  { title: "team", id: "team" },
  { title: "top backers & contributors", id: "individual" },
  { title: "faq", id: "faq" },
  { title: "update", id: "update" },
];

const menuMobile = [
  { title: "OverView" },
  { title: "top backers & contributors" },
  { title: "faq" },
  { title: "updates" },
];

export default function MenuProfile() {
  const sectionRefs = {
    "contribution-tier": useRef(null),
    about: useRef(null),
    team: useRef(null),
    individual: useRef(null),
    faq: useRef(null),
    update: useRef(null),
  };

  const [active, setActive] = useState("contribution-tier");
  const [activeMobile, setActiveMobile] = useState(0);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const offsets = Object.entries(sectionRefs).map(([key, ref]) => ({
        key,
        offset: ref.current
          ? Math.abs(ref.current.getBoundingClientRect().top - 120) // 120px offset for sticky menu
          : Infinity,
      }));
      const closest = offsets.reduce((a, b) => (a.offset < b.offset ? a : b));
      setActive(closest.key);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section on menu click
  const handleMenuClick = (id) => {
    setActive(id);
    const ref = sectionRefs[id];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100, // adjust for sticky menu height
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Menu */}
      <div className="hidden lg:block max-w-7xl mx-auto sticky top-0 bg-white z-50">
        <div className="max-w-5xl w-full px-[128px] flex items-start justify-between gap-8 mt-20 border-b pb-5 border-[rgba(231,231,231,1)]">
          {Menu.map((item) => (
            <span
              key={item.title}
              className={`font-bold cursor-pointer uppercase pb-2 transition-all duration-200 ${
                active === item.id
                  ? "border-b-2 border-purple-700"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => handleMenuClick(item.id)}
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
                activeMobile === idx
                  ? "border-b-2 border-purple-700"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveMobile(idx)}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-28 max-w-5xl mx-auto">
        <div className="hidden lg:block">
          <div ref={sectionRefs["contribution-tier"]} id="contribution-tier">
            <ContributionTier />
          </div>
          <div ref={sectionRefs["about"]} id="about">
            <About />
          </div>
          <div ref={sectionRefs["team"]} id="team">
            <Team />
          </div>
          <div ref={sectionRefs["individual"]} id="individual">
            <Individual />
          </div>
          <div ref={sectionRefs["faq"]} id="faq">
            <FAQ />
          </div>
          <div ref={sectionRefs["update"]} id="update">
            <Update />
          </div>
        </div>
        <div className="block lg:hidden">
          {activeMobile === 0 && (
            <>
              <About />
              <Team />
            </>
          )}
          {activeMobile === 1 && <Individual />}
          {activeMobile === 2 && <FAQ />}
          {activeMobile === 3 && <Update />}
        </div>
      </div>
    </>
  );
}
