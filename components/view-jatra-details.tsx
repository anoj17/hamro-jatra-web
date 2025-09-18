"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Mountain,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Jatra } from "@prisma/client";

interface JatraDetailsProps {
  jatra: Jatra | null;
}

export function ViewJatraDetails({ jatra }: JatraDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (jatra) setCurrentImageIndex((prev) => (prev + 1) % jatra.image.length);
  };

  const prevImage = () => {
    if (jatra)
      setCurrentImageIndex(
        (prev) => (prev - 1 + jatra.image.length) % jatra.image.length
      );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white rounded-2xl mx-auto overflow-hidden shadow-2xl md:w-[650px] lg:w-[700px] w-full">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent z-10" />
        <div className="relative h-80 overflow-hidden">
          <img
            src={
              jatra?.image[currentImageIndex] ||
              "/placeholder.svg?height=320&width=800&query=festival"
            }
            alt={jatra?.title}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
          />

          {/* Image Navigation */}
          {jatra && jatra.image.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white border-0 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white border-0 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {jatra?.image.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white shadow-lg"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <div className="space-y-2">
            <Badge className="bg-red-600/80 hover:bg-red-600 text-white border-0 backdrop-blur-sm">
              {jatra?.category.replace("_", " ").toUpperCase()}
            </Badge>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg text-balance">
              {jatra?.title}
            </h1>
            <p className="text-red-100 text-lg drop-shadow text-pretty">
              {jatra?.shortTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-8">
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-red-800/30 rounded-xl p-4 backdrop-blur-sm border border-red-700/30 hover:bg-red-800/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-red-300" />
              <div>
                <p className="text-red-200 text-sm">Location</p>
                <p className="font-semibold text-white">{jatra?.location}</p>
                <p className="text-red-300 text-sm">{jatra?.district}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-800/30 rounded-xl p-4 backdrop-blur-sm border border-red-700/30 hover:bg-red-800/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-red-300" />
              <div>
                <p className="text-red-200 text-sm">Date</p>
                <p className="font-semibold text-white">
                  {jatra?.monthInNepali}
                </p>
                <p className="text-red-300 text-sm">{jatra?.nepaliDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-800/30 rounded-xl p-4 backdrop-blur-sm border border-red-700/30 hover:bg-red-800/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Mountain className="h-5 w-5 text-red-300" />
              <div>
                <p className="text-red-200 text-sm">Altitude</p>
                <p className="font-semibold text-white">{jatra?.altitude}m</p>
                <p className="text-red-300 text-sm">Above sea level</p>
              </div>
            </div>
          </div>

          <div className="bg-red-800/30 rounded-xl p-4 backdrop-blur-sm border border-red-700/30 hover:bg-red-800/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-red-300" />
              <div>
                <p className="text-red-200 text-sm">English Date</p>
                <p className="font-semibold text-white text-sm">
                  {jatra && formatDate(jatra.englishDate.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-red-800/20 rounded-xl p-6 backdrop-blur-sm border border-red-700/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            About the Festival
          </h2>
          <div
            className="text-red-100 leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: jatra?.description || "" }}
          />
        </div>

        {/* Coordinates */}
        <div className="bg-red-800/20 rounded-xl p-4 backdrop-blur-sm border border-red-700/20">
          <p className="text-red-200 text-sm">
            <span className="font-semibold">Coordinates:</span>{" "}
            {jatra?.latitude}
            °N
          </p>
        </div>
      </div>
    </div>
  );
}
