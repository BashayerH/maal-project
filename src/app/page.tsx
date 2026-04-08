import { GardenSection } from "@/components/GardenSection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JourneyPath } from "@/components/JourneyPath";
import { StoryTripSection } from "@/components/StoryTripSection";

export default function Home() {
  return (
    <div dir="rtl" className="relative min-h-[100svh] bg-[var(--color-sand)]">
      <Header />
      <main className="min-h-[100svh]">
        <HeroSection />
        <JourneyPath />
        <StoryTripSection />
        <GardenSection />
      </main>
    </div>
  );
}
