import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LenisWrapper from "@/lib/lenis";

export const metadata: Metadata = {
  title: {
    default: "Laksh Capital | Trusted Wealth & Investment Advisory",
    template: "%s | Laksh Capital",
  },
  description:
    "Laksh Capital provides transparent wealth management, mutual funds, PMS, AIF, insurance, and long-term investment solutions tailored to your goals.",
  keywords: [
    "wealth management India",
    "investment advisory",
    "mutual funds",
    "PMS",
    "AIF",
    "financial planning",
    "insurance advisory",
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
    title: "Laksh Capital | Trusted Wealth & Investment Advisory",
    description:
      "Expert-led wealth management and investment solutions focused on long-term growth and clarity.",
    url: "https://www.lakshcapital.in",
    siteName: "Laksh Capital",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1226,
        height: 908,
        alt: "Laksh Capital Wealth Advisory",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksh Capital | Trusted Wealth Advisory",
    description:
      "Personalized investment and insurance solutions built for long-term wealth creation.",
    images: ["/og-image.jpeg"],
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
