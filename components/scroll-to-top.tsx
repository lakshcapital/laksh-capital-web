"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const isStudio =
    pathname?.startsWith("/studio") || pathname?.startsWith("/structure");

  useEffect(() => {
    if (isStudio) return;
    const onScroll = () => {
      const threshold = window.innerHeight * 1.5; // 150vh
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isStudio]);

  if (isStudio) return null;

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-24 right-6 z-50
        rounded-full bg-primary p-3 text-primary-foreground
        shadow-lg transition-all duration-300
        hover:scale-110 hover:shadow-xl cursor-pointer
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-4"
        }
      `}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
