"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MapPin, Share2, Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const UpcomingJatras = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-700/10 rounded-full border border-red-700/20">
            <Calendar className="w-4 h-4 text-red-700" />
            <span className="text-sm font-medium text-red-700">
              Cultural Events
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Upcoming{" "}
            <span className="text-red-700 relative">
              Jatras
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full transform scale-x-0 animate-[scaleX_1s_ease-out_0.5s_forwards]" />
            </span>
          </h3>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
            Don&apos;t miss these upcoming cultural celebrations that showcase
            Nepal&apos;s rich heritage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-5 gap-8">
          {[
            {
              name: "Bisket Jatra",
              location: "Bhaktapur",
              date: "April 14-22, 2024",
              description:
                "New Year celebration with chariot processions and traditional rituals",
              image: "/bisket-jatra-festival-nepal-chariot-procession.png",
              featured: true,
            },
            {
              name: "Indra Jatra",
              location: "Kathmandu",
              date: "September 17-25, 2024",
              description:
                "Festival honoring Lord Indra with masked dances and cultural performances",
              image: "/indra-jatra-festival-nepal-masked-dancers.png",
              featured: false,
            },
            {
              name: "Gai Jatra",
              location: "Kathmandu Valley",
              date: "August 30, 2024",
              description:
                "Festival of cows with colorful parades and traditional celebrations",
              image: "/gai-jatra-festival-nepal-cow-parade.png",
              featured: false,
            },
          ].map((jatra, index) => (
            <div
              key={index}
              className={`group shadow-2xl shadow-red-700/10 transition-all rounded-lg pb-7 duration-500 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${jatra.featured ? "ring-2 ring-red-700/20" : ""}`}
              style={{
                transitionDelay: isVisible ? `${index * 300}ms` : "0ms",
              }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={jatra.image || "/placeholder.svg"}
                  alt={jatra.name}
                  width={350}
                  height={250}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <Badge className="absolute top-4 left-4 bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg">
                  {jatra.featured ? "Featured" : "Upcoming"}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-xl">
                  <span className="group-hover:text-red-700 transition-colors duration-300">
                    {jatra.name}
                  </span>
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-red-600 hover:fill-red-600 cursor-pointer transition-all duration-300 hover:scale-110" />
                </CardTitle>
                <CardDescription className="flex items-center text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-2 text-red-600" />
                  {jatra.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {jatra.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-red-100">
                  <span className="text-sm font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                    {jatra.date}
                  </span>
                  <Share2 className="w-4 h-4 text-muted-foreground hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110" />
                </div>
              </CardContent>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-700/25 hover:scale-105">
            View All Events
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
