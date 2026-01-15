"use client";

import { useLenis } from "lenis/react";

export function useScroll() {
  const lenis = useLenis();

  return (target: string) => {
    if (!lenis) return;

    const width = window.innerWidth;

    let offset = 56; // default (desktop)

    if (width < 640) {
      offset = 32; // mobile
    } else if (width < 1024) {
      offset = 48; // tablet
    }

    lenis.scrollTo(target, {
      offset: offset,
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };
}
