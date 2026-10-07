import { defineType, defineField } from "sanity";

export const scheduleDay = defineType({
  name: "scheduleDay",
  title: "Schedule Day",
  type: "document",
  fields: [
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "label",
      type: "string",
      description: "Day name, e.g. Friday",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "time", type: "string", description: 'e.g. "7:00 PM"' }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "arena", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "time" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "label", subtitle: "date" } },
});
