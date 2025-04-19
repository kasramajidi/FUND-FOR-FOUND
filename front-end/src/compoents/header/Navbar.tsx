import Link from "next/link";
import { usePathname } from "next/navigation";
const dataPage = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Explore",
    link: "/Explore",
  },
  {
    name: "AboutUs",
    link: "/AboutUs",
  },
  {
    name: "Help & Support",
    link: "/Help&Support",
  },
];
export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="flex w-full justify-between items-center gap-5">
      {dataPage.map((item, index) => (
        <Link key={index} href={item.link}>
          <span
            className={`pb-1 ${
              pathName === item.link
                ? "border-b-2 border-[#644FC1] text-[#644FC1]"
                : ""
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
