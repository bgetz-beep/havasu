import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { AtAGlance } from "@/components/home/AtAGlance";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { TicketsBlock } from "@/components/home/TicketsBlock";
import { SponsorsWall } from "@/components/home/SponsorsWall";
import { Gallery } from "@/components/home/Gallery";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { getSiteData } from "@/lib/data";

export default async function Home() {
  const data = await getSiteData();
  const countdownTarget = `${data.event.startDate}T18:00:00-07:00`;

  return (
    <>
      <Hero event={data.event} hero={data.hero} />
      <Countdown targetIso={countdownTarget} />
      <AtAGlance event={data.event} />
      <SchedulePreview scheduleDays={data.schedule} />
      <TicketsBlock ticketsUrl={data.links.ticketsUrl} />
      <SponsorsWall sponsors={data.sponsors} />
      <Gallery images={data.gallery} />
      <FaqTeaser faqs={data.faq} />
    </>
  );
}
