"use client";

import React, { FC } from "react";
import FooterSection from "@/components/footer/FooterSection";
import LanguageSelector from "@/components/footer/LanguageSelector";
import FooterLinks from "@/components/footer/FooterLinks";
import SocialLinks from "@/components/footer/SocialLinks";
import FooterData from "@/components/footer/FooterData";

const Footer: FC = () => {
  return (
    <footer
      className="bg-[#F5F5F5] pt-12 rounded-t-4xl mt-[145px]"
      aria-label="Site footer"
    >
      <div className="w-[85%] mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-5 mb-16">
          {FooterData.sections.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 mb-4" />

      <div className="w-[85%] mx-auto pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-between space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
            <LanguageSelector />
            <div className="md:hidden">
              <SocialLinks links={FooterData.social} />
            </div>
          </div>
          <div className="block">
            <FooterLinks links={FooterData.legal} />
          </div>
          <div className="hidden md:block">
            <SocialLinks links={FooterData.social} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
