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
  MapPin,
  Search,
  Calendar,
  Users,
  Navigation,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mapLocations = [
  {
    id: 1,
    name: "Bhaktapur Durbar Square",
    festival: "Bisket Jatra",
    coordinates: { lat: 27.6722, lng: 85.4298 },
    region: "Bhaktapur",
    type: "Historical Site",
    status: "upcoming",
    date: "April 14-22, 2024",
    description:
      "Ancient royal palace complex hosting the famous Bisket Jatra chariot festival",
    image: "/bhaktapur-durbar-square-festival-venue.png",
    popularity: 4.8,
  },
  {
    id: 2,
    name: "Kathmandu Durbar Square",
    festival: "Indra Jatra",
    coordinates: { lat: 27.7045, lng: 85.3077 },
    region: "Kathmandu",
    type: "Historical Site",
    status: "upcoming",
    date: "September 17-25, 2024",
    description:
      "Historic palace square where Indra Jatra celebrations take place",
    image: "/kathmandu-durbar-square-indra-jatra.png",
    popularity: 4.7,
  },
  {
    id: 3,
    name: "Basantapur Area",
    festival: "Gai Jatra",
    coordinates: { lat: 27.704, lng: 85.307 },
    region: "Kathmandu",
    type: "Cultural Area",
    status: "upcoming",
    date: "August 30, 2024",
    description: "Traditional area for Gai Jatra cow parade celebrations",
    image: "/basantapur-gai-jatra-celebration.png",
    popularity: 4.6,
  },
  {
    id: 4,
    name: "Pashupatinath Temple",
    festival: "Dashain",
    coordinates: { lat: 27.7106, lng: 85.3481 },
    region: "Kathmandu",
    type: "Religious Site",
    status: "upcoming",
    date: "October 15-24, 2024",
    description: "Sacred Hindu temple complex, major Dashain celebration site",
    image: "/pashupatinath-temple-dashain.png",
    popularity: 4.9,
  },
  {
    id: 5,
    name: "Swayambhunath Stupa",
    festival: "Tihar",
    coordinates: { lat: 27.7149, lng: 85.2906 },
    region: "Kathmandu",
    type: "Religious Site",
    status: "upcoming",
    date: "November 1-5, 2024",
    description: "Ancient Buddhist stupa beautifully lit during Tihar festival",
    image: "/swayambhunath-tihar-lights.png",
    popularity: 4.8,
  },
  {
    id: 6,
    name: "Patan Durbar Square",
    festival: "Various Cultural Events",
    coordinates: { lat: 27.6734, lng: 85.326 },
    region: "Lalitpur",
    type: "Historical Site",
    status: "ongoing",
    date: "Year-round",
    description:
      "UNESCO World Heritage site hosting various cultural festivals",
    image: "/patan-durbar-square-cultural.png",
    popularity: 4.7,
  },
  {
    id: 7,
    name: "Boudhanath Stupa",
    festival: "Buddhist Festivals",
    coordinates: { lat: 27.7215, lng: 85.3624 },
    region: "Kathmandu",
    type: "Religious Site",
    status: "ongoing",
    date: "Various dates",
    description:
      "One of the largest Buddhist stupas, center for Tibetan Buddhist festivals",
    image: "/boudhanath-buddhist-festivals.png",
    popularity: 4.8,
  },
  {
    id: 8,
    name: "Changu Narayan Temple",
    festival: "Traditional Festivals",
    coordinates: { lat: 27.7153, lng: 85.4347 },
    region: "Bhaktapur",
    type: "Religious Site",
    status: "ongoing",
    date: "Various dates",
    description: "Ancient Hindu temple hosting traditional Newari festivals",
    image: "/changu-narayan-traditional-festivals.png",
    popularity: 4.5,
  },
];

export default function MapPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof mapLocations)[0] | null
  >(null);
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "street">(
    "terrain"
  );

  const filteredLocations = mapLocations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.festival.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" ||
      location.region.toLowerCase() === selectedRegion;
    const matchesType =
      selectedType === "all" ||
      location.type.toLowerCase().includes(selectedType.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || location.status === selectedStatus;

    return matchesSearch && matchesRegion && matchesType && matchesStatus;
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
              <Link href="/map" className="text-primary font-medium">
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
            Festival <span className="text-primary">Map</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover festival locations across Nepal with our interactive
            cultural map
          </p>
        </div>
      </section>

      {/* Map Interface */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Filters and Location List */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Region Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Region
                    </label>
                    <Select
                      value={selectedRegion}
                      onValueChange={setSelectedRegion}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="kathmandu">Kathmandu</SelectItem>
                        <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                        <SelectItem value="lalitpur">Lalitpur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Type
                    </label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="historical">
                          Historical Site
                        </SelectItem>
                        <SelectItem value="religious">
                          Religious Site
                        </SelectItem>
                        <SelectItem value="cultural">Cultural Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Location List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Locations ({filteredLocations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedLocation?.id === location.id
                            ? "bg-primary/10 border-l-4 border-l-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={location.image || "/placeholder.svg"}
                              alt={location.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-foreground truncate">
                              {location.name}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {location.festival}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={
                                  location.status === "upcoming"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {location.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {location.region}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] relative overflow-hidden">
                <CardHeader className="absolute top-0 left-0 right-0 z-10 bg-card/80 backdrop-blur-sm border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Interactive Map
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {/* Map View Controls */}
                      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        <Button
                          variant={mapView === "terrain" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setMapView("terrain")}
                          className="text-xs px-2 h-7"
                        >
                          Terrain
                        </Button>
                        <Button
                          variant={
                            mapView === "satellite" ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() => setMapView("satellite")}
                          className="text-xs px-2 h-7"
                        >
                          Satellite
                        </Button>
                        <Button
                          variant={mapView === "street" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setMapView("street")}
                          className="text-xs px-2 h-7"
                        >
                          Street
                        </Button>
                      </div>

                      {/* Map Controls */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 bg-transparent"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 bg-transparent"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 bg-transparent"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Map Placeholder */}
                <div className="absolute inset-0 pt-20">
                  <div className="w-full h-full bg-gradient-to-br from-green-100 via-green-50 to-blue-50 relative overflow-hidden">
                    {/* Nepal Map Illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-96 h-64">
                        {/* Simplified Nepal shape */}
                        <div className="absolute inset-0 bg-green-200 rounded-lg transform rotate-12 opacity-60"></div>
                        <div className="absolute inset-2 bg-green-300 rounded-lg transform rotate-6 opacity-70"></div>
                        <div className="absolute inset-4 bg-green-400 rounded-lg opacity-80"></div>

                        {/* Location Markers */}
                        {filteredLocations.map((location, index) => (
                          <div
                            key={location.id}
                            className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-125 ${
                              location.status === "upcoming"
                                ? "bg-primary"
                                : "bg-secondary"
                            } ${
                              selectedLocation?.id === location.id
                                ? "scale-150 ring-4 ring-primary/30"
                                : ""
                            }`}
                            style={{
                              left: `${20 + (index % 4) * 20}%`,
                              top: `${20 + Math.floor(index / 4) * 25}%`,
                            }}
                            onClick={() => setSelectedLocation(location)}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              {location.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Legend</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span>Upcoming Events</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 rounded-full bg-secondary"></div>
                          <span>Ongoing Events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Selected Location Details */}
              {selectedLocation && (
                <Card className="mt-6 animate-fade-in-up">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={selectedLocation.image || "/placeholder.svg"}
                          alt={selectedLocation.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">
                          {selectedLocation.name}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          {selectedLocation.festival}
                        </CardDescription>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge
                            variant={
                              selectedLocation.status === "upcoming"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selectedLocation.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {selectedLocation.type}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            •
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {selectedLocation.region}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {selectedLocation.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          {selectedLocation.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          Popularity: {selectedLocation.popularity}/5
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 mt-12">
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
                  <Link
                    href="/jatras"
                    className="hover:text-foreground transition-colors"
                  >
                    All Jatras
                  </Link>
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
                  <Link
                    href="/gallery"
                    className="hover:text-foreground transition-colors"
                  >
                    Premium Images
                  </Link>
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
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
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
