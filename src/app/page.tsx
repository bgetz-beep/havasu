import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { AtAGlance } from "@/components/home/AtAGlance";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown targetIso="2027-03-19T18:00:00-07:00" />
      <AtAGlance />
    </>
  );
}
