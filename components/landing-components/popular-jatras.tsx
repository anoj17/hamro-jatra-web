// import { Card, CardContent } from "@/components/ui/card";
// import { Users } from "lucide-react";
// import Image from "next/image";

// export const PopularJatras = () => {
//   return (
//     <>
//       <section className="py-16 px-4 bg-muted/30">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h3 className="text-3xl font-bold text-foreground mb-4">
//               Popular Jatras
//             </h3>
//             <p className="text-muted-foreground text-lg">
//               Most loved festivals by our community
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 name: "Dashain",
//                 views: "12.5K",
//                 image: "/dashain-festival-nepal-celebration.png",
//               },
//               {
//                 name: "Tihar",
//                 views: "10.2K",
//                 image: "/tihar-festival-nepal-lights.png",
//               },
//               {
//                 name: "Holi",
//                 views: "8.7K",
//                 image: "/holi-festival-nepal-colors.png",
//               },
//               {
//                 name: "Teej",
//                 views: "7.3K",
//                 image: "/teej-festival-nepal-women-celebration.png",
//               },
//             ].map((jatra, index) => (
//               <Card
//                 key={index}
//                 className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
//               >
//                 <div className="relative overflow-hidden rounded-t-lg">
//                   <Image
//                     src={jatra.image || "/placeholder.svg"}
//                     alt={jatra.name}
//                     width={200}
//                     height={150}
//                     className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
//                 </div>
//                 <CardContent className="p-4">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold text-foreground">
//                       {jatra.name}
//                     </h4>
//                     <div className="flex items-center text-sm text-muted-foreground">
//                       <Users className="w-4 h-4 mr-1" />
//                       {jatra.views}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, TrendingUp } from "lucide-react";
import Image from "next/image";

export const PopularJatras = () => {
  return (
    <>
      <section className="py-10 px-4 relative overflow-hidden bg-white">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(185,28,28,0.1),transparent_50%)]" /> */}

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-700/10 rounded-full border border-red-700/20">
              <Star className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-700">
                Featured Festivals
              </span>
            </div> */}
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Popular <span className="text-red-400">Jatras</span>
            </h3>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto text-pretty">
              Discover the most celebrated festivals that bring our community
              together in joy and tradition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dashain",
                views: "12.5K",
                image: "/dashain-festival-nepal-celebration.png",
                trending: true,
              },
              {
                name: "Tihar",
                views: "10.2K",
                image: "/tihar-festival-nepal-lights.png",
                trending: false,
              },
              {
                name: "Holi",
                views: "8.7K",
                image: "/holi-festival-nepal-colors.png",
                trending: true,
              },
              {
                name: "Teej",
                views: "7.3K",
                image: "/teej-festival-nepal-women-celebration.png",
                trending: false,
              },
            ].map((jatra, index) => (
              <Card
                key={index}
                className="group bg-white backdrop-blur-sm border-red-800/30 hover:border-red-600/50 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-red-900/25 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={jatra.image || "/placeholder.svg"}
                    alt={jatra.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent group-hover:from-red-800/40 transition-all duration-500" />

                  {jatra.trending && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {jatra.views}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="group-hover:text-red-700 transition-colors duration-300">
                      {jatra.name}
                    </h4>
                    <div className="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors duration-300" />
                  </div>
                  <p className="text-red-500 text-sm mt-2">
                    Traditional Festival
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
