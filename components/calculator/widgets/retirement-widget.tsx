"use client";

import { useMemo, useState } from "react";
import {
  calculateRetirement,
  formatINR,
  formatINRShort,
} from "@/lib/calculator-utils";
import SliderInput from "../slider-input";
import ResultCard from "../result-card";

export default function RetirementWidget() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(8);

  const result = useMemo(
    () =>
      calculateRetirement({
        currentAge,
        retirementAge,
        lifeExpectancy,
        monthlyExpenses,
        inflation,
        preReturn,
        postReturn,
      }),
    [
      currentAge,
      retirementAge,
      lifeExpectancy,
      monthlyExpenses,
      inflation,
      preReturn,
      postReturn,
    ]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border bg-background p-6 space-y-7 lg:col-span-3 lg:p-8">
        <SliderInput
          label="Current age"
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={70}
          step={1}
          suffix="yrs"
          formatBoundary={(v) => `${v}`}
        />
        <SliderInput
          label="Retirement age"
          value={retirementAge}
          onChange={setRetirementAge}
          min={Math.max(currentAge + 1, 40)}
          max={80}
          step={1}
          suffix="yrs"
          formatBoundary={(v) => `${v}`}
        />
        <SliderInput
          label="Life expectancy"
          value={lifeExpectancy}
          onChange={setLifeExpectancy}
          min={Math.max(retirementAge + 1, 60)}
          max={100}
          step={1}
          suffix="yrs"
          formatBoundary={(v) => `${v}`}
        />
        <SliderInput
          label="Current monthly expenses"
          value={monthlyExpenses}
          onChange={setMonthlyExpenses}
          min={10000}
          max={1000000}
          step={5000}
          prefix="₹"
          formatBoundary={(v) => formatINRShort(v)}
        />
        <SliderInput
          label="Inflation rate"
          value={inflation}
          onChange={setInflation}
          min={2}
          max={12}
          step={0.5}
          suffix="%"
          formatBoundary={(v) => `${v}%`}
        />
        <SliderInput
          label="Pre-retirement return"
          value={preReturn}
          onChange={setPreReturn}
          min={4}
          max={20}
          step={0.5}
          suffix="%"
          formatBoundary={(v) => `${v}%`}
          hint="while you're earning"
        />
        <SliderInput
          label="Post-retirement return"
          value={postReturn}
          onChange={setPostReturn}
          min={2}
          max={15}
          step={0.5}
          suffix="%"
          formatBoundary={(v) => `${v}%`}
          hint="after you retire"
        />
      </div>

      <div className="space-y-4 lg:col-span-2">
        <ResultCard
          primaryLabel="Corpus needed at retirement"
          primaryValue={result.corpusNeeded}
          rows={[
            {
              label: "Monthly SIP needed now",
              value: result.monthlySIP,
            },
            {
              label: `Monthly expense at ${retirementAge}`,
              value: result.monthlyExpensesAtRetirement,
            },
          ]}
        />
        <div className="rounded-2xl border bg-muted/40 p-5 text-sm text-muted-foreground space-y-2">
          <p>
            You have{" "}
            <span className="font-semibold text-foreground">
              {result.yearsToRetire} years
            </span>{" "}
            to build this corpus and a{" "}
            <span className="font-semibold text-foreground">
              {result.yearsInRetirement}-year
            </span>{" "}
            retirement to fund.
          </p>
          <p>
            Start a SIP of{" "}
            <span className="font-semibold text-foreground">
              {formatINR(result.monthlySIP)}/month
            </span>{" "}
            today to reach{" "}
            <span className="font-semibold text-foreground">
              {formatINR(result.corpusNeeded)}
            </span>{" "}
            by age {retirementAge}.
          </p>
        </div>
      </div>
    </div>
  );
}
