import { defineType, defineField } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "tier",
      type: "reference",
      to: [{ type: "sponsorTier" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "websiteUrl", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier.name", media: "logo" },
  },
});
