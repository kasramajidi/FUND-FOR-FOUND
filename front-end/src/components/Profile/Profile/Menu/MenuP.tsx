"use client";
import React, { useRef, useState, useEffect } from "react";
import BandOrOrganization from "./BandOrOrganization/BandOrOrganization";
import Contribution from "./Contribution/Contribution";
import Edit from "@/components/Profile/MenuProfile/About/Edit";
import useGetUser from "./Contribution/useGetContribution";

export default function MenuP() {
  // Get data for both components
  const { data: brandsData, isLoading: brandsLoading } = useGetUser();
  const { data: contributionData, isLoading: contributionLoading } =
    useGetUser();

  // Create dynamic menu based on available data
  const [dynamicMenu, setDynamicMenu] = useState([]);

  useEffect(() => {
    const menuItems = [];

    // Only add menu items if they have data
    if (brandsData && brandsData.length > 0) {
      menuItems.push({
        title: "brand or organization",
        id: "brand-or-organization",
      });
    }

    if (contributionData && contributionData.length > 0) {
      menuItems.push({ title: "contribution", id: "contribution" });
    }

    // Always add Edit
    menuItems.push({ title: "About", id: "about" });

    setDynamicMenu(menuItems);
  }, [brandsData, contributionData]);

  const sectionRefs = {
    "brand-or-organization": useRef(null),
    contribution: useRef(null),
    about: useRef(null),
  };

  // Set initial active state based on available menu items
  const [active, setActive] = useState("");

  useEffect(() => {
    if (dynamicMenu.length > 0) {
      setActive(dynamicMenu[0].id);
    }
  }, [dynamicMenu]);

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

  const [activeMobile, setActiveMobile] = useState(0);

  // Don't render anything while loading
  if (brandsLoading || contributionLoading) {
    return <div className="text-center py-8">Loading menu data...</div>;
  }

  return (
    <>
      {/* Menu */}
      <div className="hidden lg:block max-w-7xl mx-auto sticky mt-[110px] top-0 bg-white z-50">
        <div className="max-w-5xl w-full px-[128px] flex items-start justify-between gap-8 mt-20 border-b pb-5 border-[rgba(231,231,231,1)]">
          {dynamicMenu.map((item) => (
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

      {/* Content */}
      <div className="mt-28 max-w-5xl mx-auto">
        <div className="hidden lg:block">
          {brandsData && brandsData.length > 0 && (
            <div
              ref={sectionRefs["brand-or-organization"]}
              id="brand-or-organization"
            >
              <BandOrOrganization />
            </div>
          )}
          {contributionData && contributionData.length > 0 && (
            <div ref={sectionRefs["contribution"]} id="contribution">
              <Contribution />
            </div>
          )}
          <div ref={sectionRefs["about"]} id="about">
            <Edit />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex justify-center gap-4 mb-6">
          {dynamicMenu.map((item, index) => (
            <button
              key={item.title}
              className={`px-4 py-2 rounded ${
                activeMobile === index
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveMobile(index)}
            >
              {item.title}
            </button>
          ))}
        </div>

        {activeMobile === 0 && brandsData && brandsData.length > 0 && (
          <BandOrOrganization />
        )}
        {activeMobile === 1 &&
          contributionData &&
          contributionData.length > 0 && <Contribution />}
        {activeMobile === 2 && <Edit />}
      </div>
    </>
  );
}
