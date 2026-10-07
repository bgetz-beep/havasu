import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "year", type: "number" }),
    defineField({
      name: "orientation",
      type: "string",
      options: {
        list: [
          { title: "Portrait", value: "portrait" },
          { title: "Landscape", value: "landscape" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
    }),
  ],
  preview: { select: { title: "caption", subtitle: "year", media: "image" } },
});
