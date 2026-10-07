import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { AtAGlance } from "@/components/home/AtAGlance";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { TicketsBlock } from "@/components/home/TicketsBlock";
import { SponsorsWall } from "@/components/home/SponsorsWall";
import { Gallery } from "@/components/home/Gallery";
import { FaqTeaser } from "@/components/home/FaqTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown targetIso="2027-03-19T18:00:00-07:00" />
      <AtAGlance />
      <SchedulePreview />
      <TicketsBlock />
      <SponsorsWall />
      <Gallery />
      <FaqTeaser />
    </>
  );
}
