import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author (legacy plain text)",
      type: "string",
      group: "meta",
      description: "Used only by older posts. Prefer the Author Reference below for new posts.",
    }),
    defineField({
      name: "authorRef",
      title: "Author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      description: "Pick an Author document. Falls back to legacy text field if empty.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary for blog cards and SEO",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories (legacy)",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      description: "Used only by older posts. Prefer Category References below for new posts.",
      options: {
        list: [
          { title: "Market Insights", value: "Market Insights" },
          { title: "Investment Education", value: "Investment Education" },
          { title: "Tax Planning", value: "Tax Planning" },
          { title: "Product Spotlights", value: "Product Spotlights" },
          { title: "Financial Planning", value: "Financial Planning" },
          { title: "Wealth Management", value: "Wealth Management" },
        ],
      },
    }),
    defineField({
      name: "categoryRefs",
      title: "Categories",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Pick from Category documents.",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Post",
      type: "boolean",
      group: "meta",
      initialValue: false,
      description: "Show in the Featured section on the blog landing page.",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (Rule) => Rule.max(3),
      description: "Up to 3 posts to show as 'You might also like'.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
        {
          type: "object",
          name: "imageRow",
          title: "Side-by-side Images",
          fields: [
            {
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", title: "Alt Text", type: "string" },
                    { name: "caption", title: "Caption", type: "string" },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(2).max(3),
            },
          ],
          preview: { prepare: () => ({ title: "Side-by-side Images" }) },
        },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "Plain Text", value: "text" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "Python", value: "python" },
                  { title: "JSON", value: "json" },
                  { title: "Bash", value: "bash" },
                ],
              },
              initialValue: "text",
            },
            { name: "code", title: "Code", type: "text", rows: 8 },
          ],
          preview: { select: { title: "language", subtitle: "code" } },
        },
        {
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            {
              name: "rows",
              title: "Rows (first row is header)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "row",
                  fields: [
                    {
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                  ],
                  preview: {
                    select: { cells: "cells" },
                    prepare({ cells }: { cells?: string[] }) {
                      return { title: cells?.join(" | ") || "Empty row" };
                    },
                  },
                },
              ],
            },
          ],
          preview: { prepare: () => ({ title: "Table" }) },
        },
        {
          type: "object",
          name: "youtubeEmbed",
          title: "YouTube Embed",
          fields: [
            {
              name: "url",
              title: "YouTube URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            { name: "title", title: "Video Title (for accessibility)", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        },
        {
          type: "object",
          name: "callout",
          title: "Callout / CTA",
          fields: [
            {
              name: "tone",
              title: "Tone",
              type: "string",
              options: {
                list: [
                  { title: "Info (blue)", value: "info" },
                  { title: "Success (green)", value: "success" },
                  { title: "Warning (amber)", value: "warning" },
                  { title: "Tip (primary)", value: "tip" },
                ],
              },
              initialValue: "info",
            },
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 4 },
            { name: "ctaLabel", title: "CTA Button Label", type: "string" },
            { name: "ctaUrl", title: "CTA Button URL", type: "url" },
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Overrides default meta title. Keep under 60 characters.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Overrides default meta description. Keep under 160 characters.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image (OG Image)",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description: "Optional. Defaults to cover image if not set.",
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", featured: "isFeatured" },
    prepare({ title, media, featured }: { title?: string; media?: unknown; featured?: boolean }) {
      return {
        title,
        subtitle: featured ? "★ Featured" : undefined,
        media: media as never,
      };
    },
  },
});
