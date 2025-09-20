"use client";

import SearchJatrasByFilter from "@/components/filter-jatras";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripHtmlTags } from "@/lib/utils";
import { Jatra } from "@prisma/client";
import { Calendar, Clock, Heart, MapPin, Search, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface JatrasProps {
  jatras: Jatra[];
}

export default function JatrasPage({ jatras }: JatrasProps) {
  const [isFiltering, setIsFiltering] = useState(false);
  return (
    <div className="min-h-screen mt-16">
      <section className="pt-7 px-4 text-white relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-black/20"></div> */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-black animate-fade-in">
            Explore Nepal&apos;s <span className="text-primary">Jatras</span>
          </h1>
          <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto text-secondary animate-fade-in-up">
            Discover the vibrant festivals that celebrate Nepal&apos;s rich
            cultural heritage and spiritual traditions
          </p>
        </div>
      </section>

      <SearchJatrasByFilter />

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500 ${
              isFiltering ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {jatras &&
              jatras?.map((jatra, index) => (
                <div
                  key={jatra.id}
                  className="group hover:shadow-2xl rounded-lg hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={jatra.image[0] || "/placeholder.svg"}
                      alt={jatra.title}
                      width={300}
                      height={200}
                      priority
                      className="w-full h-52 object-cover group-hover:scale-125 transition-transform duration-700"
                    />

                    {/* Enhanced overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Floating Status Badge */}
                    <Badge
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold shadow-lg ${
                        jatra.category === "upcoming"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          : "bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700"
                      } transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      {jatra.category === "upcoming"
                        ? "🔜 Upcoming"
                        : "✅ Completed"}
                    </Badge>

                    {/* Category Badge */}
                    <Badge
                      variant="secondary"
                      className="absolute top-4 right-4 bg-white/90 text-orange-700 font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    >
                      {jatra.category === "Religious" ? "🙏" : "🎭"}{" "}
                      {jatra.category}
                    </Badge>

                    {/* Enhanced Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        className="w-10 h-10 p-0 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 cursor-pointer shadow-lg hover:scale-110 transition-all duration-300"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="w-10 h-10 p-0 bg-white/90 hover:bg-white text-blue-500 cursor-pointer hover:text-blue-600 shadow-lg hover:scale-110 transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Popularity Badge */}
                    {/* <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-700">
                        {jatra.}
                      </span>
                    </div>
                  </div> */}
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-orange-600 transition-colors duration-300 font-bold">
                      {jatra.title}
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                      {jatra.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {stripHtmlTags(jatra.description)}
                    </p>

                    <div className="space-y-3">
                      {/* Date with enhanced styling */}
                      <div className="flex items-center text-sm bg-orange-50 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-semibold text-primary">
                          {jatra &&
                            new Date(jatra.englishDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{jatra.monthInNepali}</span>
                      </div>

                      {/* Enhanced Learn More Button */}
                      <Button className="w-full bg-secondary text-white font-semibold py-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </div>
              ))}
          </div>

          {/* Enhanced No Results */}
          {jatras?.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Jatras Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn&apos;t find any jatras matching your criteria. Try
                adjusting your search terms or filters.
              </p>
              {/* <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedRegion("all");
                  setSelectedStatus("all");
                }}
                className="bg-secondary text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Clear All Filters
              </Button> */}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}
