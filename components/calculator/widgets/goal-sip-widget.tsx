"use client";

import { useMemo, useState } from "react";
import {
  calculateGoalSIP,
  formatINRShort,
  sipGrowthSeries,
} from "@/lib/calculator-utils";
import SliderInput from "../slider-input";
import ResultCard from "../result-card";
import GrowthChart from "../growth-chart";

export default function GoalSIPWidget() {
  const [target, setTarget] = useState(10000000);
  const [years, setYears] = useState(15);
  const [returnRate, setReturnRate] = useState(12);

  const result = useMemo(
    () => calculateGoalSIP(target, returnRate, years),
    [target, returnRate, years]
  );

  const series = useMemo(
    () => sipGrowthSeries(result.monthly, returnRate, years),
    [result.monthly, returnRate, years]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border bg-background p-6 space-y-7 lg:col-span-3 lg:p-8">
        <SliderInput
          label="Target amount"
          value={target}
          onChange={setTarget}
          min={100000}
          max={500000000}
          step={50000}
          prefix="₹"
          formatBoundary={(v) => formatINRShort(v)}
        />
        <SliderInput
          label="Time horizon"
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

      <div className="lg:col-span-2 lg:row-span-2">
        <div className="lg:sticky lg:top-24 space-y-4">
          <ResultCard
            primaryLabel="Monthly SIP needed"
            primaryValue={result.monthly}
            rows={[
              { label: "Total invested", value: result.invested },
              { label: "Wealth generated", value: result.returns },
            ]}
          />
        </div>
      </div>

      <div className="lg:col-span-3">
        <GrowthChart data={series} />
      </div>
    </div>
  );
}
