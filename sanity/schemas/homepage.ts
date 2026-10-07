import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "heroHeadlineOverride",
      type: "string",
      description: 'Defaults to "HAVASU STAMPEDE" if empty',
    }),
    defineField({
      name: "featureFlags",
      type: "object",
      fields: [
        defineField({ name: "showCountdown", type: "boolean", initialValue: true }),
        defineField({ name: "showGallery", type: "boolean", initialValue: true }),
        defineField({ name: "showSocialWall", type: "boolean", initialValue: true }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
