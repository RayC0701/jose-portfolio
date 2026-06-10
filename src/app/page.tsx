import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import DramaticSection from "@/components/DramaticSection";
import MetricsSection from "@/components/MetricsSection";
import EngineeringSection from "@/components/EngineeringSection";
import LiveTerminal from "@/components/LiveTerminal";
import AriaDemo from "@/components/AriaDemo";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <TechMarquee />
      <ProjectCarousel />
      <ProjectGrid />
      <DramaticSection />
      <MetricsSection />
      <EngineeringSection />
      <LiveTerminal />
      <AriaDemo />
      <ContactSection />
    </main>
  );
}
