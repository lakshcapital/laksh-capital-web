"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

// Lenis preserves its internal scroll position across client-side
// navigations, so the next route renders at the same Y as the previous
// page (e.g. landing at the footer of /services because you clicked
// "View all" from far down the homepage). This component resets the
// page scroll to 0 whenever the pathname changes, unless the URL has a
// hash (HashScroller handles that case instead).

export default function ScrollResetOnRoute() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, lenis]);

  return null;
}
