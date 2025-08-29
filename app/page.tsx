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
      <section className="relative py-20 px-4 bg-gradient-to-br from-card via-background to-muted">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Discover Nepal&apos;s
              <span className="text-primary block">Cultural Heritage</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Explore vibrant festivals, rich traditions, and sacred
              celebrations that define Nepal&apos;s cultural identity. From
              ancient rituals to modern festivities.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="flex items-center bg-card border border-border rounded-lg p-2 shadow-lg">
                <Search className="w-5 h-5 text-muted-foreground ml-3" />
                <Input
                  placeholder="Search Jatra or Location..."
                  className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="ml-2">Explore</Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Jatras
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
              >
                <Camera className="w-5 h-5 mr-2" />
                Premium Photos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Jatras */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Upcoming Jatras
            </h3>
            <p className="text-muted-foreground text-lg">
              Don&apos;t miss these upcoming cultural celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Bisket Jatra",
                location: "Bhaktapur",
                date: "April 14-22, 2024",
                description: "New Year celebration with chariot processions",
                image: "/bisket-jatra-festival-nepal-chariot-procession.png",
              },
              {
                name: "Indra Jatra",
                location: "Kathmandu",
                date: "September 17-25, 2024",
                description: "Festival honoring Lord Indra with masked dances",
                image: "/indra-jatra-festival-nepal-masked-dancers.png",
              },
              {
                name: "Gai Jatra",
                location: "Kathmandu Valley",
                date: "August 30, 2024",
                description: "Festival of cows with colorful parades",
                image: "/gai-jatra-festival-nepal-cow-parade.png",
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
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary">
                    Upcoming
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {jatra.name}
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  </CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {jatra.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    {jatra.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {jatra.date}
                    </span>
                    <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
