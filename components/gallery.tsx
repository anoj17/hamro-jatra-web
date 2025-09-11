"use client";

import { useState, useEffect, useMemo } from "react";
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
  Sparkles,
  Camera,
} from "lucide-react";
import Image from "next/image";
import SearchJatrasByFilter from "./filter-jatras";

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
    image: "/indra-jatra-festival-nepal-masked-dancers.png",
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
    image: "/teej-festival-nepal-women-celebration.png",
    tags: ["sacred", "thread", "religious", "ritual"],
  },
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
    image: "/janai-purnima-festival-nepal-sacred-thread.png",
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
    image: "/janai-purnima-festival-nepal-sacred-thread.png",
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
    image: "/janai-purnima-festival-nepal-sacred-thread.png",
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
    image: "/janai-purnima-festival-nepal-sacred-thread.png",
    tags: ["mountain", "landscape", "backdrop", "scenic"],
  },
];

export default function JatraGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFestival, setSelectedFestival] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "large">(
    "grid"
  );
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryData)[0] | null
  >(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredJatras = useMemo(() => {
    setIsFiltering(true);
    const filtered = galleryData.filter((jatra) => {
      const matchesSearch =
        jatra.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jatra.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        jatra.category.toLowerCase() === selectedCategory;
      const matchesRegion =
        selectedCategory === "all" ||
        jatra.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesStatus =
        selectedType === "all" || jatra.type === selectedType;

      return matchesSearch && matchesCategory && matchesRegion && matchesStatus;
    });

    // Add slight delay for smooth transition effect
    setTimeout(() => setIsFiltering(false), 300);
    return filtered;
  }, [searchTerm, selectedCategory, selectedCategory, selectedType]);

  //   const filteredImages = galleryData.filter((image) => {
  //     const matchesSearch =
  //       image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       image.tags.some((tag) =>
  //         tag.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //     const matchesCategory =
  //       selectedCategory === "all" ||
  //       image.category.toLowerCase() === selectedCategory;
  //     const matchesType =
  //       selectedType === "all" || image.type.toLowerCase() === selectedType;
  //     const matchesFestival =
  //       selectedFestival === "all" ||
  //       image.festival.toLowerCase().includes(selectedFestival.toLowerCase());

  //     return matchesSearch && matchesCategory && matchesType && matchesFestival;
  //   });

  const getGridClass = () => {
    switch (viewMode) {
      case "large":
        return "grid md:grid-cols-2 lg:grid-cols-3 gap-8";
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative mt-24 pb-7 px-4 overflow-hidden">
        <div
          className={`container mx-auto text-center relative z-10 ${
            isLoaded ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-balance">
            Cultural <span className="gradient-text text-primary">Gallery</span>
          </h1>

          <p className="text-md mt-3 max-w-2xl mx-auto text-primary leading-relaxed">
            Discover the vibrant tapestry of Nepal&apos;s festivals and cultural
            celebrations through stunning photography that captures the essence
            of tradition and heritage.
          </p>

          {/* <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="group animate-glow">
              <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Explore Gallery
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-effect bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Collection
            </Button>
          </div> */}
        </div>
      </section>

      {/* Filters and View Controls */}
      <section className="py-6 px-4 glass-effect backdrop-blur-sm sticky top-10 z-40 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search and Filters */}

            <SearchJatrasByFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRegion={selectedType}
              setSelectedRegion={setSelectedType}
              selectedStatus={selectedFestival}
              setSelectedStatus={setSelectedFestival}
              filteredJatras={filteredJatras}
            />

            {/* View Mode Controls */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 border-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="w-7 h-7 p-0 cursor-pointer transition-all duration-200"
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "large" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("large")}
                className="w-7 h-7 p-0 cursor-pointer transition-all duration-200"
              >
                <Grid2X2 className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("masonry")}
                className="w-7 cursor-pointer h-7 p-0 transition-all duration-200"
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-5 px-4">
        <div className="container mx-auto">
          <div className={getGridClass()}>
            {filteredJatras.map((image, index) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div
                    className={`group cursor-pointer overflow-hidden hover:shadow-2xl rounded-lg bg-white hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-primary/30 animate-fade-in-up image-hover-effect ${
                      viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={image.image || "/placeholder.svg"}
                        alt={image.title}
                        width={viewMode === "large" ? 500 : 400}
                        height={viewMode === "large" ? 400 : 300}
                        className={`w-full object-cover group-hover:scale-110 transition-all duration-700 ${
                          viewMode === "large"
                            ? "h-80"
                            : viewMode === "masonry"
                            ? "h-auto"
                            : "h-64"
                        }`}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                      {/* Action Buttons Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-12 h-12 p-0 rounded-full glass-effect hover:scale-110 transition-all duration-200"
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-12 h-12 p-0 rounded-full glass-effect hover:scale-110 transition-all duration-200"
                          >
                            <Heart className="w-5 h-5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-12 h-12 p-0 rounded-full glass-effect hover:scale-110 transition-all duration-200"
                          >
                            <Download className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <Badge
                        className={`absolute top-4 right-4 px-3 py-1 font-semibold ${
                          image.type === "Premium"
                            ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                            : "bg-green-600 hover:bg-green-600/80 text-white"
                        } transition-all duration-200 hover:scale-105`}
                      >
                        {image.type}
                      </Badge>

                      {/* Bottom Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-lg text-balance">
                          {image.title}
                        </h3>
                        <p className="text-sm opacity-90 mb-1">
                          {image.festival}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="opacity-80">
                            {image.photographer}
                          </span>
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
                      </div>
                    </div>

                    {viewMode === "large" && (
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {image.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {image.festival}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {image.photographer}
                          </span>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {image.downloads}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {image.likes}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>
                </DialogTrigger>

                {/* Image Detail Modal */}
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {image.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <Image
                        src={image.image || "/placeholder.svg"}
                        alt={image.title}
                        width={600}
                        height={500}
                        className="w-full h-auto rounded-xl shadow-2xl group-hover:shadow-primary/20 transition-shadow duration-300"
                      />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-2xl mb-4 gradient-text">
                          {image.title}
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-muted-foreground font-medium">
                              Festival:
                            </span>
                            <span className="font-semibold">
                              {image.festival}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-muted-foreground font-medium">
                              Location:
                            </span>
                            <span className="font-semibold">
                              {image.location}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-muted-foreground font-medium">
                              Photographer:
                            </span>
                            <span className="font-semibold">
                              {image.photographer}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-muted-foreground font-medium">
                              Category:
                            </span>
                            <span className="font-semibold">
                              {image.category}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-muted-foreground font-medium">
                              Type:
                            </span>
                            <Badge
                              variant={
                                image.type === "Premium"
                                  ? "default"
                                  : "secondary"
                              }
                              className="font-semibold"
                            >
                              {image.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm p-4 bg-primary/5 rounded-lg">
                        <span className="flex items-center gap-2 font-semibold">
                          <Download className="w-5 h-5 text-primary" />
                          {image.downloads} downloads
                        </span>
                        <span className="flex items-center gap-2 font-semibold">
                          <Heart className="w-5 h-5 text-primary" />
                          {image.likes} likes
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {image.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-6">
                        <Button className="flex-1 h-12 text-lg font-semibold">
                          <Download className="w-5 h-5 mr-2" />
                          Download HD
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 bg-transparent"
                        >
                          <Heart className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 bg-transparent"
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* No Results */}
          {filteredJatras.length === 0 && (
            <div className="text-center py-20 animate-fade-in-scale">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <Search className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                No images found
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-pretty">
                We couldn&apos;t find any images matching your search criteria.
                Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                  setSelectedFestival("all");
                }}
                variant="outline"
                size="lg"
                className="animate-glow"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
