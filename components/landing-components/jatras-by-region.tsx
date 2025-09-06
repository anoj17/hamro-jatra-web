import { Card } from "@/components/ui/card";
import Image from "next/image";

export const JatrasByRegion = () => {
  return (
    <>
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
    </>
  );
};
