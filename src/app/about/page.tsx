import { PageHero } from "@/components/layout/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="About the Stampede" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            The Havasu Stampede is a PRCA-sanctioned professional rodeo held
            each spring in Lake Havasu City, Arizona. Launched by local rodeo
            volunteers, the Stampede draws top cowboys and cowgirls from across
            the western United States.
          </p>
          <p>
            Proceeds support youth rodeo programs and the Lake Havasu community.
          </p>
        </div>
      </section>
    </>
  );
}
