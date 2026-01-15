"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import footerSvg from "@/assets/footer.svg";
import { SOCIALS } from "@/components/header";
import { useScroll } from "@/hooks/use-scroll";

const NAV_MENUS = [
  {
    href: "#about",
    label: "About Us",
  },
  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#team",
    label: "Our Team",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

const Footer = () => {
  const scrollTo = useScroll();

  return (
    <footer
      id="footer"
      className="text-white relative bg-linear-to-b via-50% from-primary to-emerald-600 pt-16 md:pt-28 lg:pt-32"
    >
      <div className="flex flex-col items-center gap-14">
        <nav className="container flex flex-col items-center gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-lg">
            {NAV_MENUS.map((menu, i) => (
              <li key={i}>
                <Link
                  href={menu.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(menu.href);
                  }}
                  className="font-medium transition-opacity hover:opacity-75"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {SOCIALS.map((social, i) => (
              <li key={i}>
                <Link
                  href={social.href}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener"
                  className="flex items-center gap-0.5 transition-opacity hover:opacity-75"
                >
                  {social.label}
                  <ArrowUpRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-center text-xs text-white/70 space-y-1">
          <p>
            Powered by{" "}
            <span className="font-medium text-white">
              Niveshmitra Capital Services Private Limited
            </span>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Laksh Capital. All rights
            reserved.
          </p>
        </div>

        <Image
          src={footerSvg}
          alt="pullpilot"
          className="mt-10 md:mt-14 lg:mt-20"
        />
      </div>
    </footer>
  );
};

export default Footer;
