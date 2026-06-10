"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export default function HashScroller() {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const target = document.querySelector(hash);
    if (!target) return;

    const width = window.innerWidth;
    const offset = width < 640 ? 32 : width < 1024 ? 48 : 56;

    const t = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(hash, {
          offset,
          duration: 1.3,
          easing: (x) => 1 - Math.pow(1 - x, 3),
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);

    return () => clearTimeout(t);
  }, [lenis]);

  return null;
}
