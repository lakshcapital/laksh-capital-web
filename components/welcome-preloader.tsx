"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoImg from "@/assets/logo.svg";

const SESSION_KEY = "lc:preloader:seen";
const MIN_VISIBLE_MS = 1400;
const FADE_MS = 450;

export default function WelcomePreloader() {
  const [visible, setVisible] = useState<boolean>(false);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
    document.body.style.overflow = "hidden";

    const startFadeAt = window.setTimeout(() => {
      setFading(true);
    }, MIN_VISIBLE_MS);

    const hideAt = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, MIN_VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(startFadeAt);
      window.clearTimeout(hideAt);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{ transition: `opacity ${FADE_MS}ms ease-out` }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-linear-to-br from-[#2D4A9B] via-[#324E9D] to-[#459250] text-white ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8 animate-[slideUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]">
        <div className="rounded-2xl bg-white px-8 py-5 shadow-2xl shadow-black/20">
          <Image
            src={logoImg}
            alt="Laksh Capital"
            className="w-48 md:w-56"
            priority
          />
        </div>
        <div className="text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
            Welcome to Laksh Capital
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold">
            Beyond today,{" "}
            <span className="italic font-medium text-white/90">
              building tomorrow.
            </span>
          </h2>
        </div>
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/80 animate-[pulse_1.2s_ease-in-out_0s_infinite]" />
          <span className="size-2 rounded-full bg-white/80 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
          <span className="size-2 rounded-full bg-white/80 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
