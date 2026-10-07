import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { AtAGlance } from "@/components/home/AtAGlance";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { TicketsBlock } from "@/components/home/TicketsBlock";
import { SponsorsWall } from "@/components/home/SponsorsWall";
import { Gallery } from "@/components/home/Gallery";
import { SocialWall } from "@/components/home/SocialWall";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteData } from "@/lib/data";
import { fetchSocialPosts } from "@/lib/social";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { eventLd, faqLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} · PRCA Rodeo · March 19-21, 2027`,
  description: siteConfig.description,
  path: "/",
});

export default async function Home() {
  const [data, socialPosts] = await Promise.all([
    getSiteData(),
    fetchSocialPosts(),
  ]);
  const countdownTarget = `${data.event.startDate}T18:00:00-07:00`;

  return (
    <>
      <JsonLd data={eventLd({ event: data.event, links: data.links, contact: data.contact })} />
      <JsonLd data={faqLd(data.faq.slice(0, 5))} />
      <Hero event={data.event} hero={data.hero} />
      <Countdown targetIso={countdownTarget} />
      <AtAGlance event={data.event} />
      <SchedulePreview scheduleDays={data.schedule} />
      <TicketsBlock ticketsUrl={data.links.ticketsUrl} />
      <SponsorsWall sponsors={data.sponsors} />
      <Gallery images={data.gallery} />
      <SocialWall posts={socialPosts} contact={data.contact} />
      <FaqTeaser faqs={data.faq} />
    </>
  );
}
