"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionProps } from "@/types";
import {
  Calendar,
  ChevronDown,
  Loader,
  LogOut,
  MapPin,
  Menu,
  User,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../public/logo/hamro-jatra-logo.png";

export function Navbar({ session }: { session: SessionProps | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    `relative py-2 group font-medium transition-all duration-300 ${
      pathname === href
        ? "text-red-800 border-b-2 border-red-800" // Active style
        : "text-gray-700 hover:text-red-800"
    }`;

  const getNepaliDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB"); // Simple date format
  };

  const Logout = async () => {
    setLoading(true);
    const res = await signOut();
    console.log({ res });
    setLoading(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm">
      <div className="lg:px-12 px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <div className="">
              <Link href="/" className="flex items-center space-x-2">
                <Image src={logo} alt="logo" width={90} height={90} />
              </Link>
            </div>
            <div className="lg:flex items-center hidden space-x-4 text-sm text-gray-700">
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-1.5 rounded-full shadow-sm border border-red-100">
                <Calendar className="w-4 h-4 text-red-700" />
                <span className="font-medium">{getNepaliDate()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-700" />
                <span className="font-medium">काठमाडौं</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={navLinkClass("/")}>
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/jatras" className={navLinkClass("/jatras")}>
              Jatras
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/gallery" className={navLinkClass("/gallery")}>
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/map" className={navLinkClass("/map")}>
              Map
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className={navLinkClass("/about")}>
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Section (Login + Date + Location) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Date & Location */}

            {!session ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-gray-700 hover:text-red-800 hover:bg-red-50 transition-all duration-200 font-medium px-4 py-2 rounded-lg border border-transparent border-red-200"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-red-800 hover:bg-red-900 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200">
                    <Avatar className="h-7 w-7 bg-primary">
                      <AvatarImage
                        src={session?.user?.image || "/placeholder.svg"}
                        alt={session.user.name || "User avatar"}
                      />
                      <AvatarFallback className="bg-secondary uppercase text-white text-md font-medium">
                        {session.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-primary cursor-pointer truncate max-w-32">
                        {session.user.email}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 cursor-pointer text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg p-1"
                >
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-150"
                    >
                      <User className="h-4 w-4 mr-3  hover:text-white" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-gray-100" />

                  <DropdownMenuItem
                    onClick={Logout}
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-150"
                  >
                    <LogOut className="h-4 w-4 mr-3 hover:text-white" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-red-800 hover:bg-red-50 rounded-lg p-2 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full height overlay */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 absolute top-16 p-5 bg-primary min-h-screen w-full left-0 right-0 border-t border-primary-foreground/20">
          <div className="flex flex-col">
            {/* Navigation Links */}
            <div className="flex-1 px-6 text-white py-8 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-gray-400 border-b-2 border-gray-400"
                    : "text-white hover:text-red-800"
                }`}
              >
                Home
              </Link>
              <Link
                href="/jatras"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200 ${
                  pathname === "/jatras"
                    ? "text-gray-400 border-b-2 border-gray-400"
                    : "text-white hover:text-red-800"
                }`}
              >
                Jatras
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200 ${
                  pathname === "/gallery"
                    ? "text-gray-400 border-b-2 border-gray-400"
                    : "text-white hover:text-red-800"
                }`}
              >
                Gallery
              </Link>
              <Link
                href="/map"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200 ${
                  pathname === "/map"
                    ? "text-gray-400 border-b-2 border-gray-400"
                    : "text-white hover:text-red-800"
                }`}
              >
                Map
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200 ${
                  pathname === "/about"
                    ? "text-gray-400 border-b-2 border-gray-400"
                    : "text-white hover:text-red-800"
                }`}
              >
                About
              </Link>

              {/* Mobile Date & Location */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-center space-x-2 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                  <Calendar className="w-5 h-5 text-red-700" />
                  <span className="font-medium text-gray-700">
                    {getNepaliDate()}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="font-medium">काठमाडौं</span>
                </div>
              </div>
            </div>

            {/* Mobile Login/Register Buttons */}
            <div className="border-gray-100">
              {session ? (
                <div className="space-y-3 flex md:flex-row flex-col md:space-y-0 space-x-0 md:space-x-3">
                  <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className="w-full md:w-1/2 text-white hover:text-red-800 hover:bg-red-50 transition-all duration-200 font-medium py-3 rounded-xl border border-gray-200 hover:border-red-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login">Profile</Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="w-full md:w-1/2 bg-red-800 hover:bg-red-900 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => Logout()}
                  >
                    <p>
                      {loading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin inline-block" />
                      ) : (
                        "Logout"
                      )}
                    </p>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 flex md:flex-row flex-col md:space-y-0 space-x-0 md:space-x-3">
                  <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className="w-full md:w-1/2 text-white hover:text-red-800 hover:bg-red-50 transition-all duration-200 font-medium py-3 rounded-xl border border-gray-200 hover:border-red-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="w-full md:w-1/2 bg-red-800 hover:bg-red-900 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
