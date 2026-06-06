export default function HeroIllustration() {
  return (
    <div className="relative w-full max-h-96 overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary to-[#0a1f3d] aspect-[16/10]">
      <svg
        viewBox="0 0 640 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="curve-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curve-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FBE8B6" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="640" height="400" fill="url(#glow)" />
        <rect width="640" height="400" fill="url(#grid)" />

        {/* growth curve fill */}
        <path
          d="M 0 340 C 120 320, 200 280, 280 240 S 460 140, 640 60 L 640 400 L 0 400 Z"
          fill="url(#curve-fill)"
        />

        {/* growth curve line */}
        <path
          d="M 0 340 C 120 320, 200 280, 280 240 S 460 140, 640 60"
          fill="none"
          stroke="url(#curve-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* data points */}
        <g>
          <circle cx="120" cy="318" r="4" fill="#C9A961" />
          <circle cx="280" cy="240" r="4" fill="#C9A961" />
          <circle cx="450" cy="148" r="4" fill="#C9A961" />
          <circle cx="600" cy="72" r="6" fill="#FBE8B6" />
          <circle
            cx="600"
            cy="72"
            r="12"
            fill="none"
            stroke="#FBE8B6"
            strokeOpacity="0.4"
            strokeWidth="1"
          >
            <animate
              attributeName="r"
              from="6"
              to="18"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              from="0.5"
              to="0"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* axis baseline */}
        <line
          x1="0"
          y1="370"
          x2="640"
          y2="370"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />

        {/* annotations */}
        <g fontFamily="Open Sans, system-ui, sans-serif" fill="rgba(255,255,255,0.85)">
          <text x="32" y="48" fontSize="11" letterSpacing="2" opacity="0.7">
            PORTFOLIO GROWTH
          </text>
          <text x="32" y="74" fontSize="22" fontWeight="600">
            Patient capital,
          </text>
          <text x="32" y="100" fontSize="22" fontWeight="600" fill="#FBE8B6">
            compounded.
          </text>
        </g>

        {/* y-axis labels */}
        <g fontFamily="Open Sans, system-ui, sans-serif" fill="rgba(255,255,255,0.4)" fontSize="9">
          <text x="608" y="80">3.2x</text>
          <text x="608" y="160">2.4x</text>
          <text x="608" y="240">1.6x</text>
          <text x="608" y="320">1.0x</text>
        </g>

        {/* x-axis labels */}
        <g fontFamily="Open Sans, system-ui, sans-serif" fill="rgba(255,255,255,0.4)" fontSize="9">
          <text x="20" y="388">Y1</text>
          <text x="170" y="388">Y3</text>
          <text x="320" y="388">Y5</text>
          <text x="470" y="388">Y7</text>
          <text x="610" y="388">Y10</text>
        </g>
      </svg>
    </div>
  );
}
