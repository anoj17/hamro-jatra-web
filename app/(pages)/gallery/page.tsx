"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Download,
  Heart,
  Share2,
  Eye,
  Filter,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const galleryData = [
  {
    id: 1,
    title: "Bisket Jatra Chariot Procession",
    festival: "Bisket Jatra",
    location: "Bhaktapur",
    photographer: "Ram Shrestha",
    category: "Traditional",
    type: "Premium",
    downloads: 1250,
    likes: 89,
    image: "/bisket-jatra-festival-nepal-chariot-procession.png",
    tags: ["chariot", "procession", "bhaktapur", "new year"],
  },
  {
    id: 2,
    title: "Indra Jatra Masked Dancers",
    festival: "Indra Jatra",
    location: "Kathmandu",
    photographer: "Sita Maharjan",
    category: "Cultural",
    type: "Premium",
    downloads: 980,
    likes: 76,
    image: "/indra-jatra-festival-nepal-masked-dancers.png",
    tags: ["masks", "dance", "kathmandu", "cultural"],
  },
  {
    id: 3,
    title: "Gai Jatra Cow Parade",
    festival: "Gai Jatra",
    location: "Kathmandu Valley",
    photographer: "Hari Tamang",
    category: "Celebration",
    type: "Free",
    downloads: 2100,
    likes: 134,
    image: "/gai-jatra-festival-nepal-cow-parade.png",
    tags: ["cow", "parade", "celebration", "colorful"],
  },
  {
    id: 4,
    title: "Dashain Festival Celebration",
    festival: "Dashain",
    location: "Nationwide",
    photographer: "Maya Gurung",
    category: "Religious",
    type: "Premium",
    downloads: 1800,
    likes: 156,
    image: "/dashain-festival-nepal-celebration.png",
    tags: ["dashain", "family", "blessing", "traditional"],
  },
  {
    id: 5,
    title: "Tihar Festival of Lights",
    festival: "Tihar",
    location: "Nationwide",
    photographer: "Bikash Shrestha",
    category: "Traditional",
    type: "Free",
    downloads: 1650,
    likes: 142,
    image: "/tihar-festival-nepal-lights.png",
    tags: ["lights", "diya", "tihar", "festival"],
  },
  {
    id: 6,
    title: "Holi Colors Festival",
    festival: "Holi",
    location: "Nationwide",
    photographer: "Anita Rai",
    category: "Celebration",
    type: "Premium",
    downloads: 2250,
    likes: 198,
    image: "/holi-festival-nepal-colors.png",
    tags: ["colors", "holi", "spring", "joy"],
  },
  {
    id: 7,
    title: "Teej Women's Celebration",
    festival: "Teej",
    location: "Nationwide",
    photographer: "Kamala Thapa",
    category: "Cultural",
    type: "Free",
    downloads: 890,
    likes: 67,
    image: "/teej-festival-nepal-women-celebration.png",
    tags: ["women", "teej", "red", "celebration"],
  },
  {
    id: 8,
    title: "Janai Purnima Sacred Thread",
    festival: "Janai Purnima",
    location: "Nationwide",
    photographer: "Gopal Adhikari",
    category: "Religious",
    type: "Premium",
    downloads: 560,
    likes: 43,
    image: "/janai-purnima-festival-nepal-sacred-thread.png",
    tags: ["sacred", "thread", "religious", "ritual"],
  },
  // Additional generated images
  {
    id: 9,
    title: "Traditional Nepali Architecture",
    festival: "Various",
    location: "Kathmandu Valley",
    photographer: "Deepak Lama",
    category: "Architecture",
    type: "Free",
    downloads: 1120,
    likes: 89,
    image: "/nepal-traditional-architecture-temples.png",
    tags: ["architecture", "temple", "traditional", "heritage"],
  },
  {
    id: 10,
    title: "Festival Street Photography",
    festival: "Various",
    location: "Urban Areas",
    photographer: "Priya Shakya",
    category: "Street",
    type: "Premium",
    downloads: 1340,
    likes: 112,
    image: "/nepal-festival-street-photography.png",
    tags: ["street", "candid", "people", "urban"],
  },
  {
    id: 11,
    title: "Cultural Dance Performance",
    festival: "Various",
    location: "Cultural Centers",
    photographer: "Rajesh Malla",
    category: "Cultural",
    type: "Free",
    downloads: 780,
    likes: 65,
    image: "/nepal-cultural-dance-performance.png",
    tags: ["dance", "performance", "cultural", "traditional"],
  },
  {
    id: 12,
    title: "Mountain Festival Backdrop",
    festival: "Various",
    location: "Mountain Regions",
    photographer: "Tenzin Sherpa",
    category: "Landscape",
    type: "Premium",
    downloads: 1890,
    likes: 167,
    image: "/nepal-mountain-festival-backdrop.png",
    tags: ["mountain", "landscape", "backdrop", "scenic"],
  },
];

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFestival, setSelectedFestival] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "large">(
    "grid"
  );
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryData)[0] | null
  >(null);

  const filteredImages = galleryData.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" ||
      image.category.toLowerCase() === selectedCategory;
    const matchesType =
      selectedType === "all" || image.type.toLowerCase() === selectedType;
    const matchesFestival =
      selectedFestival === "all" ||
      image.festival.toLowerCase().includes(selectedFestival.toLowerCase());

    return matchesSearch && matchesCategory && matchesType && matchesFestival;
  });

  const getGridClass = () => {
    switch (viewMode) {
      case "large":
        return "grid md:grid-cols-2 lg:grid-cols-3 gap-6";
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4";
      default:
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-card via-background to-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Cultural <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Stunning photography capturing the essence of Nepal&apos;s festivals
            and cultural celebrations
          </p>
        </div>
      </section>

      {/* Filters and View Controls */}
      <section className="py-8 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
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
                    Filter:
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
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="religious">Religious</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                    <SelectItem value="architecture">Architecture</SelectItem>
                    <SelectItem value="street">Street</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedFestival}
                  onValueChange={setSelectedFestival}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Festival" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Festivals</SelectItem>
                    <SelectItem value="dashain">Dashain</SelectItem>
                    <SelectItem value="tihar">Tihar</SelectItem>
                    <SelectItem value="holi">Holi</SelectItem>
                    <SelectItem value="bisket">Bisket Jatra</SelectItem>
                    <SelectItem value="indra">Indra Jatra</SelectItem>
                    <SelectItem value="gai">Gai Jatra</SelectItem>
                    <SelectItem value="teej">Teej</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="w-8 h-8 p-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "large" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("large")}
                className="w-8 h-8 p-0"
              >
                <Grid2X2 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("masonry")}
                className="w-8 h-8 p-0"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredImages.length} of {galleryData.length} images
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className={getGridClass()}>
            {filteredImages.map((image, index) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up ${
                      viewMode === "masonry" ? "break-inside-avoid mb-4" : ""
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={image.image || "/placeholder.svg"}
                        alt={image.title}
                        width={viewMode === "large" ? 400 : 300}
                        height={viewMode === "large" ? 300 : 200}
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                          viewMode === "large"
                            ? "h-64"
                            : viewMode === "masonry"
                            ? "h-auto"
                            : "h-48"
                        }`}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
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
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <Badge
                        className={`absolute top-2 right-2 ${
                          image.type === "Premium"
                            ? "bg-primary hover:bg-primary/80"
                            : "bg-green-600 hover:bg-green-600/80"
                        }`}
                      >
                        {image.type}
                      </Badge>
                    </div>

                    {viewMode === "large" && (
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {image.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {image.festival}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{image.photographer}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {image.downloads}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {image.likes}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </DialogTrigger>

                {/* Image Detail Modal */}
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{image.title}</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Image
                        src={image.image || "/placeholder.svg"}
                        alt={image.title}
                        width={500}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {image.title}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Festival:
                            </span>
                            <span>{image.festival}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Location:
                            </span>
                            <span>{image.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Photographer:
                            </span>
                            <span>{image.photographer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Category:
                            </span>
                            <span>{image.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <Badge
                              variant={
                                image.type === "Premium"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {image.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {image.downloads} downloads
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {image.likes} likes
                        </span>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {image.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No images found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                  setSelectedFestival("all");
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
