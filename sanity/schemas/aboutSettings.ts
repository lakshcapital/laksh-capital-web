import { defineField, defineType } from "sanity";

const ICON_OPTIONS = [
  { title: "User Check", value: "UserRoundCheck" },
  { title: "Target", value: "Target" },
  { title: "Sliders", value: "SlidersHorizontal" },
  { title: "Trending Up", value: "TrendingUp" },
  { title: "Shield Check", value: "ShieldCheck" },
  { title: "Heart Handshake", value: "HeartHandshake" },
  { title: "Compass", value: "Compass" },
  { title: "Line Chart", value: "LineChart" },
  { title: "Briefcase", value: "Briefcase" },
  { title: "Award", value: "Award" },
  { title: "Coins", value: "Coins" },
  { title: "Book Open", value: "BookOpen" },
];

export default defineType({
  name: "aboutSettings",
  title: "About Section",
  type: "document",
  description: "Edit the About Us copy and the three framework cards.",
  fields: [
    defineField({
      name: "description",
      title: "Lead paragraph",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionText",
      title: "Mission statement",
      type: "text",
      rows: 3,
      description: "Shown on the dark image card on the right.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "frameworkHeading",
      title: "Framework heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "frameworkDescription",
      title: "Framework description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "frameworkCards",
      title: "Framework cards (3 recommended)",
      type: "array",
      of: [
        {
          type: "object",
          name: "card",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ICON_OPTIONS },
              initialValue: "Target",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Section" }),
  },
});
