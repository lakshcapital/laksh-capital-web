"use client";

import { useEffect, useState } from "react";

interface HeroHeadlineProps {
  staticHeading: string;
  rotating?: string[];
  intervalMs?: number;
}

const FADE_MS = 350;

export default function HeroHeadline({
  staticHeading,
  rotating,
  intervalMs = 3800,
}: HeroHeadlineProps) {
  const list = rotating && rotating.length >= 2 ? rotating : null;
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!list) return;
    const id = window.setInterval(() => {
      setOpacity(0);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length);
        setOpacity(1);
      }, FADE_MS);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [list, intervalMs]);

  if (!list) {
    return (
      <h1 className="my-6 text-3xl font-semibold text-pretty lg:text-6xl">
        {staticHeading}
      </h1>
    );
  }

  return (
    <h1 className="my-6 text-3xl font-semibold text-pretty lg:text-6xl">
      <span
        style={{ transition: `opacity ${FADE_MS}ms ease-out`, opacity }}
        className="inline-block"
      >
        {list[index]}
      </span>
    </h1>
  );
}
