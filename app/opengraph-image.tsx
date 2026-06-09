import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { TRUST_STATS } from "@/data/trust";

export const runtime = "nodejs";
export const alt = "Laksh Capital — Beyond Today, Building Tomorrow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pulled from /assets/logo.svg — keep these in sync if the logo is rebranded.
const BRAND = {
  blueDark: "#2D4A9B",
  blueMid: "#324E9D",
  blueLight: "#36519F",
  green: "#459250",
  greenLight: "#5BAF66",
};

const logoSvg = readFileSync(
  path.join(process.cwd(), "assets/logo.svg"),
  "utf-8"
);
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString(
  "base64"
)}`;

export default async function Image() {
  const yearsActive = new Date().getFullYear() - TRUST_STATS.yearFounded;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${BRAND.blueDark} 0%, ${BRAND.blueMid} 60%, ${BRAND.blueLight} 100%)`,
          color: "#ffffff",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 640,
            height: 640,
            background: `radial-gradient(circle at center, ${BRAND.green}66 0%, ${BRAND.green}00 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 520,
            height: 520,
            background: `radial-gradient(circle at center, ${BRAND.blueLight}80 0%, ${BRAND.blueLight}00 65%)`,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#ffffff",
            padding: "16px 28px",
            borderRadius: 14,
            alignSelf: "flex-start",
            boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
          }}
        >
          <img
            src={logoDataUri}
            width={260}
            height={60}
            alt="Laksh Capital"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            style={{
              fontSize: 18,
              color: BRAND.greenLight,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Independent wealth advisory
          </span>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.15,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Beyond today,</span>
            <span style={{ color: BRAND.greenLight }}>building tomorrow.</span>
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.82)",
              margin: 0,
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Patient capital for the next generation of business owners,
            professionals, and NRIs.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
              <Stat value={TRUST_STATS.aum} label="Assets Under Advice" />
              <Divider />
              <Stat
                value={TRUST_STATS.familiesServed}
                label="Families served"
              />
              <Divider />
              <Stat
                value={`${yearsActive}+ yrs`}
                label={`Since ${TRUST_STATS.yearFounded}`}
              />
            </div>
            <span style={{ fontSize: 20, color: "rgba(255,255,255,0.75)" }}>
              lakshcapital.in
            </span>
          </div>
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: 0.5,
            }}
          >
            Powered by Niveshmitra Capital Services Private Limited
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 26, fontWeight: 600, color: "#ffffff" }}>
        {value}
      </span>
      <span
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.65)",
          marginTop: 2,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 32,
        background: "rgba(255,255,255,0.2)",
      }}
    />
  );
}
