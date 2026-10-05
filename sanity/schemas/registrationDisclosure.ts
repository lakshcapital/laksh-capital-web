import { defineField, defineType } from "sanity";

export default defineType({
  name: "registrationDisclosure",
  title: "Registration Disclosure",
  type: "document",
  description:
    "Regulatory registration details shown on the /registrations page and linked from the footer. Only one document needed.",
  groups: [
    { name: "registrations", title: "AMFI / APRN" },
    { name: "officers", title: "Officers & Disclaimer" },
    { name: "entities", title: "Registered Entities" },
  ],
  fields: [
    defineField({
      name: "introText",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      group: "registrations",
      description: "Shown below the page heading.",
    }),
    defineField({
      name: "legalEntity",
      title: "Legal entity name",
      type: "string",
      group: "registrations",
    }),
    defineField({
      name: "amfiArn",
      title: "AMFI ARN",
      type: "string",
      group: "registrations",
      description: "e.g. ARN-339767",
    }),
    defineField({
      name: "amfiArnValidFrom",
      title: "AMFI ARN valid from",
      type: "string",
      group: "registrations",
      description: "DD/MM/YYYY",
    }),
    defineField({
      name: "amfiArnValidTo",
      title: "AMFI ARN valid to",
      type: "string",
      group: "registrations",
      description: "DD/MM/YYYY",
    }),
    defineField({
      name: "aprn",
      title: "APRN",
      type: "string",
      group: "registrations",
      description: "e.g. APRN-07045",
    }),
    defineField({
      name: "aprnValidFrom",
      title: "APRN valid from",
      type: "string",
      group: "registrations",
      description: "DD/MM/YYYY",
    }),
    defineField({
      name: "aprnValidTo",
      title: "APRN valid to",
      type: "string",
      group: "registrations",
      description: "DD/MM/YYYY",
    }),
    defineField({
      name: "principalOfficer",
      title: "Principal Officer",
      type: "string",
      group: "officers",
    }),
    defineField({
      name: "euin",
      title: "EUIN",
      type: "string",
      group: "officers",
    }),
    defineField({
      name: "grievanceOfficer",
      title: "Grievance Officer",
      type: "object",
      group: "officers",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
      ],
    }),
    defineField({
      name: "riskDisclaimer",
      title: "Risk disclaimer",
      type: "text",
      rows: 4,
      group: "officers",
    }),
    defineField({
      name: "registrations",
      title: "Registered entities (AMC / PMS / AIF / SIF)",
      type: "array",
      group: "entities",
      description:
        "Add one row per AMC/fund house or product the firm is registered to distribute, with its SEBI registration number. Left empty until the owner has the confirmed list.",
      of: [
        {
          type: "object",
          name: "registrationEntry",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  "Mutual Fund",
                  "PMS",
                  "AIF",
                  "SIF",
                  "Other",
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "entityName",
              title: "Entity / AMC name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "registrationNumber",
              title: "SEBI registration no.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "entityName",
              subtitle: "registrationNumber",
              category: "category",
            },
            prepare: ({ title, subtitle, category }) => ({
              title,
              subtitle: `${category} — ${subtitle}`,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Registration Disclosure" }),
  },
});
