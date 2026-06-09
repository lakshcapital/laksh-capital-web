import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSettings",
  title: "Contact Form Dropdowns",
  type: "document",
  description:
    "Edit the three qualifying dropdowns shown on the contact form. Only one document needed.",
  fields: [
    defineField({
      name: "interestOptions",
      title: "\"How can we help?\" options",
      type: "array",
      of: [{ type: "string" }],
      description: "Items shown in the interest-area dropdown.",
    }),
    defineField({
      name: "portfolioOptions",
      title: "\"Current portfolio size\" options",
      type: "array",
      of: [{ type: "string" }],
      description: "Items shown in the portfolio-bucket dropdown.",
    }),
    defineField({
      name: "goalOptions",
      title: "\"Primary financial goal\" options",
      type: "array",
      of: [{ type: "string" }],
      description: "Items shown in the goal dropdown.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Form Dropdowns" }),
  },
});
