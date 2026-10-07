import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Everything you need to know about the Havasu Stampede: gates, tickets, parking, kids activities, policies, and more.",
  path: "/faq",
});

export default async function FaqPage() {
  const { faq } = await getSiteData();
  const categories = Array.from(new Set(faq.map((f) => f.category)));
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <PageHero eyebrow="Common Questions" title="FAQ" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((cat) => (
            <div key={cat} className="border-t-2 border-charcoal pt-6">
              <h2 className="font-display text-3xl">{cat.toUpperCase()}</h2>
              <div className="mt-6 divide-y-2 divide-charcoal">
                {faq
                  .filter((f) => f.category === cat)
                  .map((f) => (
                    <details key={f.question} className="py-4 group">
                      <summary className="flex justify-between gap-6 font-display text-xl cursor-pointer list-none">
                        <span>{f.question.toUpperCase()}</span>
                        <span className="group-open:rotate-45 transition-transform leading-none">
                          +
                        </span>
                      </summary>
                      <p className="font-body text-base mt-3 whitespace-pre-line">
                        {f.answer}
                      </p>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
