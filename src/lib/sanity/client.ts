import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "../../../sanity/env";

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

export { sanityConfigured };
