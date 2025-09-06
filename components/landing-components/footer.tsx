// export const Footer = () => {
//   return (
//     <>
//       <footer className="bg-gradient-to-br from-slate-500 via-slate-400 to-red-900 border-t border-red-800/30 py-10 px-4 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-red-600/5"></div>
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-red-600/10 to-transparent"></div>
//         </div>

//         <div className="container mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="group">
//               <div className="flex items-center space-x-3 mb-6 transform transition-all duration-300 group-hover:scale-105">
//                 <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/25 transition-all duration-300 group-hover:shadow-red-600/40 group-hover:shadow-xl">
//                   <span className="text-white font-bold text-lg">🌸</span>
//                 </div>
//                 <h4 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors duration-300">
//                   Hamro Jatra
//                 </h4>
//               </div>
//               <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
//                 Celebrating Nepal&apos;s rich cultural heritage through
//                 festivals and traditions.
//               </p>
//               <div className="flex space-x-3 mt-6">
//                 <div className="w-8 h-8 bg-red-600/20 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/30">
//                   <span className="text-red-400 hover:text-white text-sm transition-colors duration-300">
//                     📘
//                   </span>
//                 </div>
//                 <div className="w-8 h-8 bg-red-600/20 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/30">
//                   <span className="text-red-400 hover:text-white text-sm transition-colors duration-300">
//                     📷
//                   </span>
//                 </div>
//                 <div className="w-8 h-8 bg-red-600/20 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/30">
//                   <span className="text-red-400 hover:text-white text-sm transition-colors duration-300">
//                     🐦
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="group">
//               <h5 className="font-bold text-white mb-4 text-lg relative">
//                 Explore
//                 <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 group-hover:w-full"></div>
//               </h5>
//               <ul className="space-y-3 text-sm">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     All Jatras
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Upcoming Events
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Popular Festivals
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Regional Guide
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="group">
//               <h5 className="font-bold text-white mb-4 text-lg relative">
//                 Gallery
//                 <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 group-hover:w-full"></div>
//               </h5>
//               <ul className="space-y-3 text-sm">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Premium Images
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Free Downloads
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Video Collection
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Licensing
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="group">
//               <h5 className="font-bold text-white mb-4 text-lg relative">
//                 Connect
//                 <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent transition-all duration-500 group-hover:w-full"></div>
//               </h5>
//               <ul className="space-y-3 text-sm">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Contact
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Community
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group/link"
//                   >
//                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
//                     Support
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="relative mt-12 pt-8">
//             <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
//             <div className="text-center">
//               <p className="text-slate-400 text-sm hover:text-slate-300 transition-colors duration-300">
//                 &copy; 2024 Hamro Jatra. Celebrating Nepal&apos;s cultural
//                 heritage with love.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

export const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-br from-gray-50 via-red-50 to-orange-50 border-t border-red-200/50 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-red-100/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-red-200/20 to-transparent"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="group">
              <div className="flex items-center space-x-3 mb-6 transform transition-all duration-300 group-hover:scale-105">
                <div className="w-10 h-10 bg-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/25 transition-all duration-300 group-hover:shadow-red-600/40 group-hover:shadow-xl">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  Hamro Jatra
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Celebrating Nepal&apos;s rich cultural heritage through
                festivals and traditions.
              </p>
              <div className="flex space-x-3 mt-6">
                <div className="w-8 h-8 bg-red-100 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/30">
                  <span className="text-red-600 hover:text-white text-sm transition-colors duration-300">
                    📘
                  </span>
                </div>
                <div className="w-8 h-8 bg-red-100 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/30">
                  <span className="text-red-600 hover:text-white text-sm transition-colors duration-300">
                    📷
                  </span>
                </div>
                <div className="w-8 h-8 bg-red-100 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/30">
                  <span className="text-red-600 hover:text-white text-sm transition-colors duration-300">
                    🐦
                  </span>
                </div>
              </div>
            </div>

            <div className="group">
              <h5 className="font-bold text-gray-800 mb-4 text-lg relative">
                Explore
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 group-hover:w-full"></div>
              </h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    All Jatras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Upcoming Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Popular Festivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Regional Guide
                  </a>
                </li>
              </ul>
            </div>

            <div className="group">
              <h5 className="font-bold text-gray-800 mb-4 text-lg relative">
                Gallery
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 group-hover:w-full"></div>
              </h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Premium Images
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Free Downloads
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Video Collection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Licensing
                  </a>
                </li>
              </ul>
            </div>

            <div className="group">
              <h5 className="font-bold text-gray-800 mb-4 text-lg relative">
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent transition-all duration-500 group-hover:w-full"></div>
              </h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 hover:translate-x-2 transition-all duration-300 flex items-center group/link"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative mt-12 pt-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent"></div>
            <div className="text-center">
              <p className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-300">
                &copy; 2024 Hamro Jatra. Celebrating Nepal&apos;s cultural
                heritage with love.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
