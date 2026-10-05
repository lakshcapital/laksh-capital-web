import { defineField, defineType } from "sanity";

export const fundType = defineType({
  name: "fund",
  title: "Investment Products & Funds",
  type: "document",
  fields: [
    defineField({
      name: "fundName",
      title: "Fund / Product Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Product name is required."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "fundName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required().error("Please select a category from the dropdown."),
    }),
    defineField({
      name: "schemeCode",
      title: "AMFI India Scheme Code (Optional)",
      type: "string",
      description: "Leave empty for Fixed Deposits. Enter numerical code for live Mutual Fund NAV updates.",
    }),
    defineField({
      name: "description",
      title: "Fund Description / Long Text",
      type: "text",
      rows: 4,
      description: "Detailed overview or disclaimer info for this investment product.",
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
      name: "heroMetrics",
      title: "Hero Metrics",
      type: "fundHeroMetrics",
      description: "NAV, rating, and classification shown on cards and the product hero.",
    }),
    defineField({
      name: "keyFacts",
      title: "Key Facts",
      type: "fundKeyFacts",
      description: "Sidebar key-fact parameters for the product detail page.",
    }),
    defineField({
      name: "performance",
      title: "Performance",
      type: "fundPerformance",
      description: "Return periods and benchmark label for the performance block.",
    }),
    defineField({
      name: "manager",
      title: "Manager",
      type: "fundManager",
      description: "Assigned advisory lead shown on the product detail page.",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Controls the layout order of cards inside its category grid (e.g., 1 for first, 2 for second).",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active / Visible?",
      type: "boolean",
      description: "Toggle off to temporarily hide this specific product card from the website dashboard.",
      initialValue: true,
    }),
  ],
});
