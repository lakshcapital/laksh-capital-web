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
    const offset = width < 640 ? 64 : width < 1024 ? 72 : 84;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 30;

    const performScroll = (smooth: boolean) => {
      if (cancelled) return;
      const target = document.querySelector(hash);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(hash, {
          offset,
          duration: smooth ? 1.0 : 0.3,
          easing: (x) => 1 - Math.pow(1 - x, 3),
          immediate: false,
        });
      } else {
        (target as HTMLElement).scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "start",
        });
      }
    };

    const waitForTarget = (cb: () => void) => {
      if (cancelled) return;
      const target = document.querySelector(hash);
      if (target) {
        cb();
        return;
      }
      if (attempts >= maxAttempts) return;
      attempts += 1;
      window.setTimeout(() => waitForTarget(cb), 100);
    };

    // First pass: scroll as soon as the target exists in the DOM.
    const initial = window.setTimeout(
      () => waitForTarget(() => performScroll(true)),
      80
    );

    // Second pass: after window 'load' fires (images/fonts done), correct
    // for any layout shift that moved the target further down the page.
    let onLoad: (() => void) | null = null;
    const fireCorrection = () => {
      if (cancelled) return;
      // Small grace period so Lenis isn't fighting itself
      window.setTimeout(() => performScroll(false), 60);
    };

    if (document.readyState === "complete") {
      window.setTimeout(fireCorrection, 600);
    } else {
      onLoad = () => fireCorrection();
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(initial);
      if (onLoad) window.removeEventListener("load", onLoad);
    };
  }, [lenis, pathname]);

  return null;
}
