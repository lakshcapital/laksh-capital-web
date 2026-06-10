"use client";

import { useMemo, useState } from "react";
import {
  calculateSIP,
  formatINRShort,
  sipGrowthSeries,
} from "@/lib/calculator-utils";
import SliderInput from "../slider-input";
import ResultCard from "../result-card";
import GrowthChart from "../growth-chart";

export default function SIPWidget() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const [returnRate, setReturnRate] = useState(12);

  const result = useMemo(
    () => calculateSIP(monthly, returnRate, years),
    [monthly, returnRate, years]
  );

  const series = useMemo(
    () => sipGrowthSeries(monthly, returnRate, years),
    [monthly, returnRate, years]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border bg-background p-6 space-y-7 lg:col-span-3 lg:p-8">
        <SliderInput
          label="Monthly investment"
          value={monthly}
          onChange={setMonthly}
          min={500}
          max={500000}
          step={500}
          prefix="₹"
          formatBoundary={(v) => formatINRShort(v)}
        />
        <SliderInput
          label="Time period"
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          suffix="yrs"
          formatBoundary={(v) => `${v} yrs`}
        />
        <SliderInput
          label="Expected annual return"
          value={returnRate}
          onChange={setReturnRate}
          min={1}
          max={25}
          step={0.5}
          suffix="%"
          formatBoundary={(v) => `${v}%`}
        />
      </div>

      <div className="lg:col-span-2 space-y-4">
        <ResultCard
          primaryLabel="Future value"
          primaryValue={result.futureValue}
          rows={[
            { label: "You invest", value: result.invested },
            { label: "Returns", value: result.returns },
          ]}
        />
        <GrowthChart data={series} />
      </div>
    </div>
  );
}
