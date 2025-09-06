import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
export const FeaturedImage = () => {
  return (
    <>
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
    </>
  );
};
