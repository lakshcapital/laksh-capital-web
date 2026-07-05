"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import MobileMenu from "./mobile-menu";
import logoImg from "@/assets/logo.svg";
import Image from "next/image";
import { useScroll } from "@/hooks/use-scroll";
import { usePathname } from "next/navigation";

const NAV_MENUS = [
  {
    href: "/catalogue",
    label: "Catalogue",
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
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "/blog",
    label: "Blog",
  },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/profile.php?id=100072477008929",
    label: "Facebook",
    icon: <Facebook className="size-6" />,
  },
  {
    href: "https://x.com/Laksh_Capital",
    label: "Twitter",
    icon: <Twitter className="size-6" />,
  },
  {
    href: "https://www.instagram.com/laksh_capital/",
    label: "Instagram",
    icon: <Instagram className="size-6" />,
  },
  {
    href: "https://www.linkedin.com/company/lakshcapital/",
    label: "Linkedin",
    icon: <Linkedin className="size-6" />,
  },
];

const Header = () => {
  const scrollTo = useScroll();
  const pathname = usePathname();

  return (
    <header id="header" className="relative overflow-hidden">
      <div className="container flex justify-between items-center py-8 ">
        <div className="flex items-center gap-16 lg:gap-32">
          <Link href="/">
            <Image src={logoImg} alt="Laksh Capital" className="w-40 md:w-50" />
          </Link>

          <nav className="hidden sm:block">
            <ul className="pop-up flex gap-8 overflow-hidden">
              {NAV_MENUS.map((menu, i) => (
                <li
                  key={i}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link
                  href={menu.href.startsWith("#") && pathname !== "/" ? `/${menu.href}` : menu.href}
                  onClick={(e) => {
                    if (menu.href.startsWith("#")) {
                      if (pathname === "/") {
                        e.preventDefault();
                        scrollTo(menu.href);
                      }
                    }
                  }}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ul className="pop-up hidden sm:flex items-center gap-4 overflow-hidden ">
          {SOCIALS.map((social, i) => (
            <li key={i} className="text-muted-foreground hover:text-foreground">
              <Link
                href={social.href}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {social.icon}
              </Link>
            </li>
          ))}
        </ul>
        <MobileMenu navMenus={NAV_MENUS} socials={SOCIALS} />
      </div>
    </header>
  );
};

export default Header;
export { SOCIALS };
