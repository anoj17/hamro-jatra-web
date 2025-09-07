import { FeaturedImage } from "@/components/landing-components/featured-image";
import { HeroSection } from "@/components/landing-components/hero-section";
import { JatrasByRegion } from "@/components/landing-components/jatras-by-region";
import { PopularJatras } from "@/components/landing-components/popular-jatras";
import { UpcomingJatras } from "@/components/landing-components/upcomming-jatras";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/hamro-jatra-logo.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 flex items-center justify-center"></div>
                  <Image
                    src={logo}
                    alt="Hamro Jatra Logo"
                    width={90}
                    height={90}
                  />
                </Link>
              </div>
            </div>
            <Navbar />
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

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
