import { PageHero } from "@/components/layout/PageHero";

export default function RvPage() {
  return (
    <>
      <PageHero eyebrow="RV Information" title="Stay at the Grounds" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            Dry camping passes are available for all three nights of the
            Stampede. First come, first served. Passes include access to shared
            water and dump facilities.
          </p>
          <p>
            Hookups are not available on-site. See the reservation link for
            current pricing.
          </p>
          <a
            href="https://example.com/rv-reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-turquoise text-cream px-8 py-5 font-display text-2xl hover:bg-ochre transition-colors"
          >
            RESERVE RV PASS ↗
          </a>
        </div>
      </section>
    </>
  );
}
