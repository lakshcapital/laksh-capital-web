"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import logoImg from "@/assets/logo.svg";
import { useLenis } from "lenis/react";
import { useScroll } from "@/hooks/use-scroll";

interface NavMenu {
  label: string;
  href: string;
}

interface Social {
  label?: string;
  icon: ReactNode;
  href: string;
}

interface MobileMenuProps {
  navMenus: NavMenu[];
  socials: Social[];
}
const MobileMenu = ({ navMenus, socials }: MobileMenuProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const pathname = usePathname();
  const scrollTo = useScroll();
  const lenis = useLenis();

  const handleMenuToggle = () => {
    setIsMenuVisible((prev) => {
      const next = !prev;
      if (next) {
        lenis?.stop(); // ✅ stop scrolling
      } else {
        lenis?.start(); // ✅ resume scrolling
      }
      return next;
    });
  };

  return (
    <div className="sm:hidden">
      <button
        onClick={handleMenuToggle}
        className="menu-btn z-50 relative block w-8 h-8 bg-transparent"
        aria-label="Menu"
        aria-expanded={isMenuVisible}
      >
        <span />
        <span />
      </button>
      <div
        className={`h-screen w-screen pt-32 pb-16 px-6 bg-white z-40 shadow-lg transition-all duration-700 ease-in-out fixed top-0 ${
          isMenuVisible ? "left-0" : "left-full"
        }`}
      >
        <Link href="/" className="relative -top-24">
          <Image src={logoImg} alt="Laksh Capital" className="w-40" />
        </Link>
        <nav className="h-[75%]">
          <p className="text-muted-foreground text-md mb-4">Menu</p>
          <ul className="flex flex-col gap-4 text-4xl text-black font-normal overflow-hidden">
            {navMenus.map((menu, i) => {
              const isAnchor = menu.href.startsWith("#");
              const targetUrl = isAnchor && pathname !== "/" ? `/${menu.href}` : menu.href;

              return (
                <li key={i}>
                  <Link
                    href={targetUrl}
                    onClick={(e) => {
                      lenis?.start();
                      setIsMenuVisible(false);

                      // Trigger overlay anchor scrolling only if we are currently on the root path layout
                      if (isAnchor && pathname === "/") {
                        e.preventDefault();
                        scrollTo(menu.href);
                      }
                    }}
                  >
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          <p className="text-muted-foreground text-md mb-4">Get in touch</p>
          <ul className="flex items-center gap-4 overflow-hidden">
            {socials.map((social, i) => (
              <li key={i}>
                <Link
                  href={social.href}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
