"use client";

import { ArrowUpRight, Mail, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import footerSvg from "@/assets/footer.svg";
import { SOCIALS } from "@/components/header";
import { useScroll } from "@/hooks/use-scroll";
import { REGULATORY } from "@/data/regulatory";

const NAV_MENUS = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Our Team" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  const scrollTo = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

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
                  href={resolveHref(menu.href)}
                  onClick={(e) => {
                    if (menu.href.startsWith("#") && isHome) {
                      e.preventDefault();
                      scrollTo(menu.href);
                    }
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
              {REGULATORY.legalEntity}
            </span>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Laksh Capital. All rights reserved.
          </p>
        </div>

        <div className="container">
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-white/90">
            <div className="flex items-start gap-3 mb-5">
              <ShieldCheck className="size-5 text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-white">
                  Regulatory & Disclosures
                </p>
                <p className="mt-1 text-xs text-white/70">
                  We operate under Indian financial advisory regulations.
                </p>
              </div>
            </div>

            <dl className="grid gap-y-3 gap-x-8 text-xs md:grid-cols-3">
              <div>
                <dt className="font-semibold text-white/95">AMFI ARN</dt>
                <dd className="text-white/75 mt-0.5">
                  {REGULATORY.amfiArn}
                  {REGULATORY.arnValidFrom && (
                    <span className="block text-white/55">
                      Valid from {REGULATORY.arnValidFrom}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white/95">Principal Officer</dt>
                <dd className="text-white/75 mt-0.5">
                  {REGULATORY.principalOfficer}
                  {REGULATORY.euin && (
                    <span className="block text-white/55">
                      EUIN: {REGULATORY.euin}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white/95">Grievance Officer</dt>
                <dd className="text-white/75 mt-0.5 space-y-0.5">
                  <span className="block">{REGULATORY.grievanceOfficer.name}</span>
                  <Link
                    href={`mailto:${REGULATORY.grievanceOfficer.email}`}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Mail className="size-3" />
                    {REGULATORY.grievanceOfficer.email}
                  </Link>
                  <Link
                    href={`tel:${REGULATORY.grievanceOfficer.phone}`}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Phone className="size-3" />
                    {REGULATORY.grievanceOfficer.phone}
                  </Link>
                </dd>
              </div>
            </dl>

            <div className="mt-5 pt-5 border-t border-white/15">
              <p className="text-[11px] leading-relaxed text-white/65">
                <span className="font-semibold text-white/85">
                  Risk Disclaimer:
                </span>{" "}
                {REGULATORY.riskDisclaimer}
              </p>
            </div>
          </div>
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
