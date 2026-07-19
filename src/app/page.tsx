import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import MetricsSection from "@/components/MetricsSection";
import EngineeringSection from "@/components/EngineeringSection";
import LiveTerminal from "@/components/LiveTerminal";
import AriaDemo from "@/components/AriaDemo";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <HeroSection />
      <ProjectCarousel />
      <ProjectGrid />
      <MetricsSection />
      <EngineeringSection />
      <LiveTerminal />
      <AriaDemo />
      <ContactSection />
    </main>
  );
}
