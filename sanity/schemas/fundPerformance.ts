import { defineField, defineType } from "sanity";

export const fundPerformanceType = defineType({
  name: "fundPerformance",
  title: "Performance",
  type: "object",
  fields: [
    defineField({
      name: "benchmarkLabel",
      title: "Benchmark Legend Label",
      type: "string",
      description: "Label shown in the performance legend (e.g. Nifty Index).",
    }),
    defineField({
      name: "returnsPeriods",
      title: "Return Periods",
      type: "array",
      of: [{ type: "fundReturnPeriod" }],
      description: "Period windows used for tiles and line chart.",
    }),
  ],
});
