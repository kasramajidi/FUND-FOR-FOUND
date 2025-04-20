import React, { FC } from "react";
import Link from "next/link";

interface Link {
  label: string;
  href: string;
}

interface FooterSectionProps {
  title: string;
  links: Link[];
}

const FooterSection: FC<FooterSectionProps> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="md:text-sm text-xs text-gray-600 hover:text-indigo-600 hover:underline transition-colors duration-200"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterSection;
