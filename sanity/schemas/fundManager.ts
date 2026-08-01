import { defineField, defineType } from "sanity";

export const fundManagerType = defineType({
  name: "fundManager",
  title: "Manager",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Manager Name",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Manager Title / Subtitle",
      type: "string",
      description: "e.g. Tracking Strategy Since Inception",
    }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description: "Optional avatar initials. Derived from name when empty.",
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
