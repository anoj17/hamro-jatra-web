import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Camera, Search } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <>
      <section className="relative py-10 md:py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden min-h-[92vh]">
        {/* Background Image */}
        <div className="absolute inset-0 h-full">
          <Image
            src="/nepal-festival-celebration-with-colorful-tradition.jpg"
            alt="Hamro Jatra Banner"
            quality={100}
            fill
            className="z-0 scale-105 transition-transform duration-700 ease-out object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </div>

        {/* Text Content */}
        <div className="container mx-auto text-center relative z-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 text-balance">
              Discover Nepal&apos;s
              <span className="text-red-600 block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 drop-shadow-2xl">
                Cultural Heritage
              </span>
            </h2>
            <p className="text-md md:text-xl mb-8 text-white drop-shadow-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 text-pretty leading-relaxed">
              Explore vibrant festivals, rich traditions, and sacred
              celebrations that define Nepal&apos;s cultural identity. From
              ancient rituals to modern festivities.
            </p>

            <div className="relative max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
              <div className="flex items-center bg-white/98 backdrop-blur-sm border border-white/30 rounded-2xl p-3 py-2 md:py-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white group">
                <Search className="w-8 h-8 text-gray-600 md:ml-4 group-hover:text-red-600 transition-colors duration-300" />
                <Input
                  placeholder="Search festivals or locations"
                  className="border-0 bg-transparent text-lg text-gray-800 placeholder:text-gray-600 placeholder:text-xs md:placeholder:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-2"
                />
                <Button className="ml-2 px-3 md:px-8 md:py-3 cursor-pointer text-xs md:text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-red-700 hover:bg-red-800 text-white">
                  Explore
                </Button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
              <Button
                size="lg"
                className="text-lg px-10 py-4 cursor-pointer rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-red-700 hover:bg-red-800 text-white drop-shadow-lg"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Upcoming Jatras
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-4 cursor-pointer rounded-xl font-semibold bg-white/15 backdrop-blur-sm text-white border-white/40 hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl drop-shadow-lg"
              >
                <Camera className="w-6 h-6 mr-3" />
                Premium Photos
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-15 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/60 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-2000" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-red-400/40 rounded-full animate-pulse delay-3000" />
        </div>
      </section>
    </>
  );
};
