import { defineField, defineType } from "sanity";

export const fundHeroMetricsType = defineType({
  name: "fundHeroMetrics",
  title: "Hero Metrics",
  type: "object",
  fields: [
    defineField({
      name: "classification",
      title: "Classification",
      type: "string",
      description: "Short strategy label shown under the fund name (e.g. Equity Growth).",
    }),
    defineField({
      name: "rating",
      title: "Star Rating",
      type: "number",
      description: "Optional rating from 0 to 5.",
      validation: (Rule) => Rule.min(0).max(5).integer(),
    }),
    defineField({
      name: "nav",
      title: "Current NAV",
      type: "string",
      description: "Numeric NAV value as text (e.g. ₹142.56 or $142.56).",
    }),
    defineField({
      name: "navDate",
      title: "NAV As-On Date",
      type: "string",
      description: "Display date for the NAV (e.g. 01-Aug-2026).",
    }),
    defineField({
      name: "navChange",
      title: "NAV Change",
      type: "string",
      description: "Percentage movement label (e.g. +1.24%).",
    }),
  ],
});
