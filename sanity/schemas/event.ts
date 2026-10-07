import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "startDate", type: "date", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "dateDisplay",
      type: "string",
      description: 'Example: "March 19-21, 2027"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "venue",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "address", type: "string" }),
        defineField({ name: "directionsUrl", type: "url" }),
      ],
    }),
    defineField({ name: "prcaSanctioned", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "dateDisplay", subtitle: "venue.name" },
  },
});
