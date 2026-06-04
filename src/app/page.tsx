import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import DramaticSection from "@/components/DramaticSection";
import MetricsSection from "@/components/MetricsSection";
import EngineeringSection from "@/components/EngineeringSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProjectCarousel />
      <ProjectGrid />
      <DramaticSection />
      <MetricsSection />
      <EngineeringSection />
      <ContactSection />
    </main>
  );
}
