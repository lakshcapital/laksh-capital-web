"use client";

import Link from "next/link";
import {
  CalendarClock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import MobileMenu from "./mobile-menu";
import logoImg from "@/assets/logo.svg";
import Image from "next/image";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";

const NAV_MENUS = [
  { href: "#services", label: "Services" },
  { href: "#team", label: "Our Team" },
  { href: "/tools", label: "Tools" },
  { href: "#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/profile.php?id=100072477008929",
    label: "Facebook",
    icon: <Facebook className="size-5" />,
  },
  {
    href: "https://x.com/Laksh_Capital",
    label: "Twitter",
    icon: <Twitter className="size-5" />,
  },
  {
    href: "https://www.instagram.com/laksh_capital/",
    label: "Instagram",
    icon: <Instagram className="size-5" />,
  },
  {
    href: "https://www.linkedin.com/company/lakshcapital/",
    label: "Linkedin",
    icon: <Linkedin className="size-5" />,
  },
];

interface HeaderProps {
  calendlyUrl?: string;
}

const Header = ({ calendlyUrl }: HeaderProps) => {
  const scrollTo = useScroll();
  const ctaHref = calendlyUrl || "mailto:info@lakshcapital.in";
  const isExternal = !!calendlyUrl;

  return (
    <header
      id="header"
      className="sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-md"
    >
      <div className="container flex justify-between items-center py-4 md:py-5">
        <div className="flex items-center gap-10 lg:gap-16">
          <Link href="/" aria-label="Laksh Capital home">
            <Image src={logoImg} alt="Laksh Capital" className="w-32 md:w-40" />
          </Link>

          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6 lg:gap-8 text-sm">
              {NAV_MENUS.map((menu, i) => (
                <li
                  key={i}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link
                    href={menu.href}
                    onClick={(e) => {
                      if (menu.href.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(menu.href);
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

        <div className="hidden sm:flex items-center gap-4 lg:gap-6">
          <ul className="hidden lg:flex items-center gap-3">
            {SOCIALS.map((social, i) => (
              <li
                key={i}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>

          <Button asChild size="sm" className="font-semibold">
            <a
              href={ctaHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <CalendarClock className="size-4" />
              Book a Call
            </a>
          </Button>
        </div>

        <MobileMenu
          navMenus={NAV_MENUS}
          socials={SOCIALS}
          calendlyUrl={calendlyUrl}
        />
      </div>
    </header>
  );
};

export default Header;
export { SOCIALS };
