import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  MapPin,
  Search,
  Users,
  Camera,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/landing-components/hero-section";
import { UpcomingJatras } from "@/components/landing-components/upcomming-jatras";
import { PopularJatras } from "@/components/landing-components/popular-jatras";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  🌸
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Hamro Jatra
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/jatras"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Jatras
              </Link>
              <Link
                href="/gallery"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/map"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Map
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
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

      <PopularJatras />

      {/* Popular Jatras */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Popular Jatras
            </h3>
            <p className="text-muted-foreground text-lg">
              Most loved festivals by our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dashain",
                views: "12.5K",
                image: "/dashain-festival-nepal-celebration.png",
              },
              {
                name: "Tihar",
                views: "10.2K",
                image: "/tihar-festival-nepal-lights.png",
              },
              {
                name: "Holi",
                views: "8.7K",
                image: "/holi-festival-nepal-colors.png",
              },
              {
                name: "Teej",
                views: "7.3K",
                image: "/teej-festival-nepal-women-celebration.png",
              },
            ].map((jatra, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={jatra.image || "/placeholder.svg"}
                    alt={jatra.name}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">
                      {jatra.name}
                    </h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {jatra.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jatras by Region */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Explore by Region
            </h3>
            <p className="text-muted-foreground text-lg">
              Discover festivals across different regions of Nepal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                region: "Kathmandu Valley",
                count: "25+ Jatras",
                image: "/kathmandu-valley-temples-festivals.png",
              },
              {
                region: "Bhaktapur",
                count: "15+ Jatras",
                image: "/bhaktapur-ancient-city-festivals.png",
              },
              {
                region: "Lalitpur",
                count: "18+ Jatras",
                image: "/lalitpur-patan-cultural-festivals.png",
              },
            ].map((region, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={region.image || "/placeholder.svg"}
                    alt={region.region}
                    width={350}
                    height={250}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold mb-1">{region.region}</h4>
                    <p className="text-sm opacity-90">{region.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Images */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Premium Cultural Images
            </h3>
            <p className="text-muted-foreground text-lg">
              High-quality images capturing Nepal&apos;s festival moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={`/nepal-festival-cultural-photography-.png?height=200&width=200&query=Nepal festival cultural photography ${
                    index + 1
                  }`}
                  alt={`Cultural image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" variant="secondary">
                    <Camera className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-accent">
                  Premium
                </Badge>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              View All Images
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    🌸
                  </span>
                </div>
                <h4 className="text-lg font-bold text-foreground">
                  Hamro Jatra
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Celebrating Nepal&apos;s rich cultural heritage through
                festivals and traditions.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Explore</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    All Jatras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Upcoming Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Popular Festivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Regional Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Gallery</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Premium Images
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Free Downloads
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Video Collection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Licensing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Connect</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 Hamro Jatra. Celebrating Nepal&apos;s cultural
              heritage with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
