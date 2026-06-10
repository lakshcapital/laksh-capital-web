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
