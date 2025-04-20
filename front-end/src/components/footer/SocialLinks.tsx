import React, { FC, ReactNode } from "react";
import Link from "next/link";

interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: FC<SocialLinksProps> = ({ links }) => (
  <nav className="flex items-center space-x-4" aria-label="Social media">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        aria-label={link.label}
      >
        {link.icon}
      </Link>
    ))}
  </nav>
);

export default SocialLinks;
