import { FeaturedImage } from "@/components/landing-components/featured-image";
import { HeroSection } from "@/components/landing-components/hero-section";
import { JatrasByRegion } from "@/components/landing-components/jatras-by-region";
import { PopularJatras } from "@/components/landing-components/popular-jatras";
import { UpcomingJatras } from "@/components/landing-components/upcomming-jatras";

export default function HomePage() {
  return (
    <div className="min-h-screen mt-16 z-30 bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Upcoming Jatras */}
      <UpcomingJatras />

      {/* Popular Jatras */}
      <PopularJatras />

      {/* Jatras by Region */}
      <JatrasByRegion />

      {/* Featured Images */}
      <FeaturedImage />
    </div>
  );
}
