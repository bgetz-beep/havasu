import { defineType, defineField } from "sanity";

export const sponsorTier = defineType({
  name: "sponsorTier",
  title: "Sponsor Tier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Title, Gold, Silver, Bronze, etc.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers show first",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "order" } },
});
