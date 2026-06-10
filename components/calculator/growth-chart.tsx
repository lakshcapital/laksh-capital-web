"use client";

import { formatINRShort } from "@/lib/calculator-utils";

interface GrowthChartProps {
  data: { year: number; invested: number; value: number }[];
  height?: number;
}

export default function GrowthChart({ data, height = 280 }: GrowthChartProps) {
  if (!data.length) return null;
  const width = 720;
  const padding = { top: 16, right: 56, bottom: 32, left: 56 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;

  const maxY = Math.max(...data.map((d) => d.value));
  const xScale = (year: number) =>
    padding.left + ((year - data[0].year) / (data[data.length - 1].year - data[0].year || 1)) * w;
  const yScale = (v: number) => padding.top + h - (v / maxY) * h;

  const valuePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.year)} ${yScale(d.value)}`)
    .join(" ");
  const valueArea =
    valuePath +
    ` L ${xScale(data[data.length - 1].year)} ${padding.top + h} L ${xScale(data[0].year)} ${padding.top + h} Z`;

  const investedPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.year)} ${yScale(d.invested)}`)
    .join(" ");
  const investedArea =
    investedPath +
    ` L ${xScale(data[data.length - 1].year)} ${padding.top + h} L ${xScale(data[0].year)} ${padding.top + h} Z`;

  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => (maxY / yTicks) * i);

  const xTickCount = Math.min(6, data.length);
  const xTickStep = Math.max(1, Math.floor(data.length / xTickCount));
  const xTickData = data.filter((_, i) => i % xTickStep === 0 || i === data.length - 1);

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-background">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        className="block"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Growth chart"
      >
        <defs>
          <linearGradient id="returns-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#459250" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#459250" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="invested-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2D4A9B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2D4A9B" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {yTickValues.map((tickValue) => (
          <g key={tickValue}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={yScale(tickValue)}
              y2={yScale(tickValue)}
              stroke="rgba(0,0,0,0.06)"
              strokeWidth={1}
            />
            <text
              x={padding.left - 8}
              y={yScale(tickValue)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fill="rgba(0,0,0,0.5)"
            >
              {formatINRShort(tickValue)}
            </text>
          </g>
        ))}

        <path d={valueArea} fill="url(#returns-fill)" />
        <path d={investedArea} fill="url(#invested-fill)" />

        <path
          d={valuePath}
          fill="none"
          stroke="#459250"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <path
          d={investedPath}
          fill="none"
          stroke="#2D4A9B"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="4 4"
        />

        {xTickData.map((d) => (
          <text
            key={d.year}
            x={xScale(d.year)}
            y={height - padding.bottom + 18}
            textAnchor="middle"
            fontSize={11}
            fill="rgba(0,0,0,0.5)"
          >
            Y{d.year}
          </text>
        ))}

        <g transform={`translate(${padding.left + 12}, ${padding.top + 12})`}>
          <rect width={120} height={42} rx={6} fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.05)" />
          <circle cx={12} cy={15} r={4} fill="#459250" />
          <text x={22} y={19} fontSize={11} fill="rgba(0,0,0,0.7)">Future value</text>
          <line x1={8} x2={16} y1={32} y2={32} stroke="#2D4A9B" strokeWidth={2} strokeDasharray="3 3" />
          <text x={22} y={36} fontSize={11} fill="rgba(0,0,0,0.7)">Invested</text>
        </g>
      </svg>
    </div>
  );
}
