import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description shown on category page header",
    }),
    defineField({
      name: "fundImage",
      title: "Fund Logo / Image",
      type: "image",
      description:
        "Upload the Asset Management Company (AMC) logo or a background image for this fund card.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tags",
      title: "Layout Design Tags (Badges)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        "Press Enter after typing each tag, for example: '100% Tax-Free', 'Low Risk'.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Use numbers to arrange layout order, for example 1 for first, 2 for second.",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active / Visible?",
      type: "boolean",
      description:
        "Toggle off to instantly hide this category and its related content from the website.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "fundImage",
    },
  },
});