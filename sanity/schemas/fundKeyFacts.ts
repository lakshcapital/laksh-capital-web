import { defineField, defineType } from "sanity";

export const fundKeyFactsType = defineType({
  name: "fundKeyFacts",
  title: "Key Facts",
  type: "object",
  fields: [
    defineField({
      name: "inceptionDate",
      title: "Inception Date",
      type: "string",
    }),
    defineField({
      name: "cagr",
      title: "CAGR (Est.)",
      type: "string",
      description: "Include unit if needed (e.g. 18.4%).",
    }),
    defineField({
      name: "aum",
      title: "Fund Size (AUM)",
      description: "Numeric AUM value as text (e.g. ₹14,250 Cr or $14,250 Cr).",
      type: "string",
    }),
    defineField({
      name: "benchmark",
      title: "Benchmark Index",
      description: "Benchmark Index name (e.g. Nifty 50 TRI).",
      type: "string",
    }),
    defineField({
      name: "minInvestment",
      title: "Min Investment",
      type: "string",
      description: "Numeric Min Investment value as text (e.g. ₹500 or $100 etc.).",
    }),
    defineField({
      name: "exitLoad",
      title: "Exit Load Parameter",
      type: "string",
      description: "Numeric Exit Load value as text (e.g. 1.00% or 0.50% etc.).",
    }),
    defineField({
      name: "expenseRatio",
      title: "Expense Ratio (TER)",
      type: "string",
      description: "Numeric Expense Ratio value as text (e.g. 1.00% or 0.50% etc.).",
    }),
  ],
});
