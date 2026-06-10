import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  description:
    "Email subscribers from the website. Export from Sanity into your mailer of choice when sending campaigns.",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Must be a valid email"),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Which surface the subscriber signed up from",
      options: {
        list: [
          { title: "Footer", value: "footer" },
          { title: "Blog Post", value: "blog" },
          { title: "Homepage CTA", value: "homepage" },
        ],
      },
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "source" },
  },
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
});
