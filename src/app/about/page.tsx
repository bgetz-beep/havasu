import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PortableText } from "next-sanity";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPage } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "About the Stampede",
  description:
    "The Havasu Stampede is a PRCA-sanctioned professional rodeo in Lake Havasu City, Arizona. Launched by local volunteers, drawing top cowboys and cowgirls each spring.",
  path: "/about",
});

const FALLBACK_BODY = (
  <div className="space-y-6">
    <p>
      The Havasu Stampede is a PRCA-sanctioned professional rodeo held each
      spring in Lake Havasu City, Arizona. Launched by local rodeo volunteers,
      the Stampede draws top cowboys and cowgirls from across the western
      United States.
    </p>
    <p>
      Proceeds support youth rodeo programs and the Lake Havasu community.
    </p>
  </div>
);

export default async function AboutPage() {
  const page = await getPage("about");
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow={page?.eyebrow ?? "Our Story"}
        title={page?.title ?? "About the Stampede"}
      />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto font-body text-lg prose-styles">
          {page?.body ? <PortableText value={page.body} /> : FALLBACK_BODY}
        </div>
      </section>
    </>
  );
}
