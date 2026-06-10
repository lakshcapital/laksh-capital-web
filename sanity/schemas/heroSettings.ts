import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSettings",
  title: "Hero Section",
  type: "document",
  description: "Edit the homepage hero. Only one document needed.",
  fields: [
    defineField({
      name: "badge",
      title: "Badge text",
      type: "string",
      description:
        "Small chip shown above the headline (e.g. \"Trusted by 1000+ Clients Worldwide\").",
    }),
    defineField({
      name: "heading",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "rotatingHeadlines",
      title: "Rotating headlines (optional)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "If set with 2+ entries, these cycle in place of the static headline. Leave empty to use the static headline.",
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "buttonText",
      title: "Primary button text",
      type: "string",
      description:
        "The URL still comes from NEXT_APP_CALENDLY_URL — only the label is editable here.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hero Section" }),
  },
});
