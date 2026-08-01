import { defineField, defineType } from "sanity";

export const fundReturnPeriodType = defineType({
  name: "fundReturnPeriod",
  title: "Return Period",
  type: "object",
  fields: [
    defineField({
      name: "period",
      title: "Period Label",
      type: "string",
      description: "e.g. 1 Year, 3 Year, 5 Year",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fundReturn",
      title: "Fund Return (%)",
      type: "number",
    }),
    defineField({
      name: "benchmarkReturn",
      title: "Benchmark Return (%)",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "period",
      fundReturn: "fundReturn",
      benchmarkReturn: "benchmarkReturn",
    },
    prepare({ title, fundReturn, benchmarkReturn }) {
      return {
        title: title || "Return period",
        subtitle: `Fund: ${fundReturn ?? "-"}% · Bench: ${benchmarkReturn ?? "-"}%`,
      };
    },
  },
});
