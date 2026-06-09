import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LenisWrapper from "@/lib/lenis";

export const metadata: Metadata = {
  title: {
    default: "Laksh Capital | Trusted Wealth Management Firm",
    template: "%s | Laksh Capital",
  },
  description:
    "Laksh Capital provides transparent wealth management, mutual funds, PMS, AIF, SIF, GIFT city funds, NRI investing and long-term investment solutions tailored to your goals.",
  keywords: [
    "wealth management India",
    "investment",
    "mutual funds",
    "PMS",
    "AIF",
    "financial planning",
    "insurance",
    "NPS",
    "Laksh Capital",
  ],
  metadataBase: new URL("https://www.lakshcapital.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Laksh Capital | Trusted Wealth Management Firm",
    description:
      "Expert-led wealth management and investment solutions focused on long-term growth and clarity.",
    url: "https://www.lakshcapital.in",
    siteName: "Laksh Capital",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksh Capital | Trusted Wealth Management Firm",
    description:
      "Personalized wealth management and investment solutions built for long-term wealth creation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LenisWrapper>{children}</LenisWrapper>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
