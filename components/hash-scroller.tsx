"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function HashScroller() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const width = window.innerWidth;
    const offset = width < 640 ? 32 : width < 1024 ? 48 : 56;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 30;

    const tryScroll = () => {
      if (cancelled) return;
      const target = document.querySelector(hash);
      if (!target) {
        if (attempts < maxAttempts) {
          attempts += 1;
          window.setTimeout(tryScroll, 100);
        }
        return;
      }
      if (lenis) {
        lenis.scrollTo(hash, {
          offset,
          duration: 1.3,
          easing: (x) => 1 - Math.pow(1 - x, 3),
          immediate: false,
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const initial = window.setTimeout(tryScroll, 60);

    return () => {
      cancelled = true;
      window.clearTimeout(initial);
    };
  }, [lenis, pathname]);

  return null;
}
