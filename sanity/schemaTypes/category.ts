import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Product Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Category name is mandatory."),
    }),
    defineField({
      name: "slug",
      title: "Code Identifier (ID)",
      type: "slug",
      description: "Used in code to filter tabs. Just click 'Generate' after typing the name.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("A code identifier slug is required."),
    }),
    defineField({
      name: "description",
      title: "Category Subtext/Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fundImage",
      title: "Fund Logo / Image",
      type: "image",
      description: "Upload the Asset Management Company (AMC) logo or a background image for this fund card.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("An image or logo is highly recommended for card design layouts."),
    }),
    defineField({
      name: "tags",
      title: "Layout Design Tags (Badges)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Press Enter after typing each tag (e.g., '100% Tax-Free', 'Low Risk').",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Use numbers to arrange layout order (e.g., 1 for first, 2 for second, etc.)",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active / Visible?",
      type: "boolean",
      description: "Toggle off to instantly hide this entire category and its funds from the website.",
      initialValue: true,
    }),
  ],
});