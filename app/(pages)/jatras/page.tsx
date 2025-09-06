"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Search,
  Heart,
  Share2,
  Filter,
  Clock,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const jatrasData = [
  {
    id: 1,
    name: "Bisket Jatra",
    location: "Bhaktapur",
    date: "April 14-22, 2024",
    status: "upcoming",
    description:
      "New Year celebration with chariot processions and traditional rituals",
    image: "/bisket-jatra-festival-nepal-chariot-procession.png",
    duration: "9 days",
    popularity: 4.8,
    category: "Religious",
    region: "Kathmandu Valley",
  },
  {
    id: 2,
    name: "Indra Jatra",
    location: "Kathmandu",
    date: "September 17-25, 2024",
    status: "upcoming",
    description:
      "Festival honoring Lord Indra with masked dances and cultural performances",
    image: "/indra-jatra-festival-nepal-masked-dancers.png",
    duration: "8 days",
    popularity: 4.7,
    category: "Cultural",
    region: "Kathmandu Valley",
  },
  {
    id: 3,
    name: "Gai Jatra",
    location: "Kathmandu Valley",
    date: "August 30, 2024",
    status: "upcoming",
    description:
      "Festival of cows with colorful parades and satirical performances",
    image: "/gai-jatra-festival-nepal-cow-parade.png",
    duration: "1 day",
    popularity: 4.6,
    category: "Cultural",
    region: "Kathmandu Valley",
  },
  {
    id: 4,
    name: "Dashain",
    location: "Nationwide",
    date: "October 15-24, 2024",
    status: "upcoming",
    description:
      "Nepal's biggest festival celebrating the victory of good over evil",
    image: "/dashain-festival-nepal-celebration.png",
    duration: "10 days",
    popularity: 4.9,
    category: "Religious",
    region: "All Regions",
  },
  {
    id: 5,
    name: "Tihar",
    location: "Nationwide",
    date: "November 1-5, 2024",
    status: "upcoming",
    description:
      "Festival of lights honoring different animals and relationships",
    image: "/tihar-festival-nepal-lights.png",
    duration: "5 days",
    popularity: 4.8,
    category: "Religious",
    region: "All Regions",
  },
  {
    id: 6,
    name: "Holi",
    location: "Nationwide",
    date: "March 13, 2024",
    status: "completed",
    description: "Festival of colors celebrating spring and love",
    image: "/holi-festival-nepal-colors.png",
    duration: "1 day",
    popularity: 4.7,
    category: "Cultural",
    region: "All Regions",
  },
  {
    id: 7,
    name: "Teej",
    location: "Nationwide",
    date: "August 18, 2024",
    status: "completed",
    description: "Women's festival celebrating marital bliss and well-being",
    image: "/teej-festival-nepal-women-celebration.png",
    duration: "3 days",
    popularity: 4.5,
    category: "Religious",
    region: "All Regions",
  },
  {
    id: 8,
    name: "Janai Purnima",
    location: "Nationwide",
    date: "August 19, 2024",
    status: "completed",
    description: "Sacred thread festival with religious significance",
    image: "/janai-purnima-festival-nepal-sacred-thread.png",
    duration: "1 day",
    popularity: 4.4,
    category: "Religious",
    region: "All Regions",
  },
];

export default function JatrasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredJatras = jatrasData.filter((jatra) => {
    const matchesSearch =
      jatra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jatra.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      jatra.category.toLowerCase() === selectedCategory;
    const matchesRegion =
      selectedRegion === "all" ||
      jatra.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || jatra.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesRegion && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    🌸
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                  Hamro Jatra
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/jatras" className="text-primary font-medium">
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
      <section className="py-16 px-4 bg-gradient-to-br from-card via-background to-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Explore All <span className="text-primary">Jatras</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover Nepal&apos;s rich festival calendar with detailed
            information about each celebration
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jatras or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Filter by:
                </span>
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="religious">Religious</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="kathmandu">Kathmandu Valley</SelectItem>
                  <SelectItem value="all regions">Nationwide</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredJatras.length} of {jatrasData.length} jatras
          </div>
        </div>
      </section>

      {/* Jatras Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJatras.map((jatra) => (
              <Card
                key={jatra.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${jatra.id * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={jatra.image || "/placeholder.svg"}
                    alt={jatra.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Status Badge */}
                  <Badge
                    className={`absolute top-3 left-3 ${
                      jatra.status === "upcoming"
                        ? "bg-primary hover:bg-primary/80"
                        : "bg-muted-foreground hover:bg-muted-foreground/80"
                    }`}
                  >
                    {jatra.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>

                  {/* Category Badge */}
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    {jatra.category}
                  </Badge>

                  {/* Favorite & Share Icons */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {jatra.name}
                  </CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    {jatra.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {jatra.description}
                  </p>

                  <div className="space-y-3">
                    {/* Date */}
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-medium text-primary">
                        {jatra.date}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{jatra.duration}</span>
                    </div>

                    {/* Popularity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{jatra.popularity}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredJatras.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No jatras found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedRegion("all");
                  setSelectedStatus("all");
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
