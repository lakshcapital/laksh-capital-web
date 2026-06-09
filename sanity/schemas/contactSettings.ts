import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSettings",
  title: "Contact Form Settings",
  type: "document",
  description: "Edit the dropdown options and microcopy used by the contact form. Only one document needed.",
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
    defineField({
      name: "preferredContactMethods",
      title: "Preferred contact methods",
      type: "array",
      of: [{ type: "string" }],
      description: "Radio options (e.g. Email, Phone, WhatsApp).",
    }),
    defineField({
      name: "riskAcknowledgement",
      title: "Risk acknowledgement text",
      type: "text",
      rows: 3,
      description: "Shown next to the required consent checkbox.",
    }),
    defineField({
      name: "replyMicrocopy",
      title: "Reply microcopy",
      type: "string",
      description: "Small text shown under the submit button (e.g. \"We'll get back to you shortly.\").",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Form Settings" }),
  },
});
