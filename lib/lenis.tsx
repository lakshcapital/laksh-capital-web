"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { usePathname } from "next/navigation";

interface LenisWrapperProps {
  children: ReactNode;
}

export default function LenisWrapper({ children }: LenisWrapperProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/structure")) {
    return <>{children}</>;
  }

  const options: LenisOptions = {
    duration: 1.2,
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
