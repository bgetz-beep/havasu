import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, sanityConfigured } from "../../../sanity/env";

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

const builder = sanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity is not configured; cannot build image URL");
  }
  return builder.image(source);
}
