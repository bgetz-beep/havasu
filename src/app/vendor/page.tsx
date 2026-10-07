import { PageHero } from "@/components/layout/PageHero";

export default function VendorPage() {
  return (
    <>
      <PageHero eyebrow="Vendor Information" title="Sell at the Stampede" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            Vendor applications for the 2027 Havasu Stampede are reviewed on a
            rolling basis. Priority is given to Arizona-based food and craft
            vendors.
          </p>
          <p>
            Booth fees and electrical requirements are detailed in the
            application packet.
          </p>
          <a
            href="https://example.com/vendor-application"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-terracotta text-cream px-8 py-5 font-display text-2xl hover:bg-ochre transition-colors"
          >
            APPLY NOW ↗
          </a>
        </div>
      </section>
    </>
  );
}
