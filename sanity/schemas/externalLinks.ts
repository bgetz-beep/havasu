import { defineType, defineField } from "sanity";

export const externalLinks = defineType({
  name: "externalLinks",
  title: "External Links",
  type: "document",
  fields: [
    defineField({ name: "ticketsUrl", type: "url" }),
    defineField({ name: "vendorApplicationUrl", type: "url" }),
    defineField({ name: "rvReservationUrl", type: "url" }),
    defineField({ name: "muttonBustingUrl", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "External Links" }) },
});
