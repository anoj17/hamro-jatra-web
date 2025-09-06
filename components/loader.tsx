import { Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "../public/logo/hamro-jatra-logo.png";

const Loader = () => {
  return (
    <div className="-mt-3 flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="relative">
        <Image
          src={logo}
          alt="Logo"
          width={96}
          height={96}
          className="absolute inset-0 m-auto object-contain"
          priority // Optional: Ensures it's loaded immediately
        />
        {/* Spinning Loader */}
        <Loader2
          className="h-48 w-48 animate-spin text-primary opacity-50 "
          strokeWidth={0.8}
        />
      </div>
    </div>
  );
};

export default Loader;
