import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Logistics", value: "Logistics" },
          { title: "Policies", value: "Policies" },
          { title: "Kids", value: "Kids" },
          { title: "Tickets", value: "Tickets" },
          { title: "Parking", value: "Parking" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers show first within category",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});
