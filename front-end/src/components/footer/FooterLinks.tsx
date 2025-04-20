import React, { FC } from "react";
import Link from "next/link";

interface Link {
  label: string;
  href: string;
}

interface FooterLinksProps {
  links: Link[];
}

const FooterLinks: FC<FooterLinksProps> = ({ links }) => (
  <nav className="flex items-center space-x-6" aria-label="Legal links">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="md:text-sm text-xs text-gray-600 hover:text-indigo-600 hover:underline transition-colors duration-200"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

export default FooterLinks;
