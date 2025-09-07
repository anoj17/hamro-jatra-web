"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import logo from "../public/logo/hamro-jatra-logo.png";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const getNepaliDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB"); // Simple date format
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm">
      <div className="lg:px-12 px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex space-x-4">
            <div className="">
              <Link href="/" className="flex items-center space-x-2">
                <Image src={logo} alt="logo" width={90} height={90} />
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-700">
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
            <Link
              href="/jatras"
              className="relative text-gray-700 hover:text-red-800 transition-all duration-300 py-2 group font-medium"
            >
              Jatras
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/gallery"
              className="relative text-gray-700 hover:text-red-800 transition-all duration-300 py-2 group font-medium"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/map"
              className="relative text-gray-700 hover:text-red-800 transition-all duration-300 py-2 group font-medium"
            >
              Map
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="relative text-gray-700 hover:text-red-800 transition-all duration-300 py-2 group font-medium"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Section (Login + Date + Location) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Date & Location */}

            {/* Beautiful login and register buttons */}
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
        <div className="lg:hidden py-4 absolute top-16 p-5 bg-white min-h-screen w-full left-0 right-0 border-t border-primary-foreground/20">
          <div className="flex bg-white flex-col">
            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8 space-y-4">
              <Link
                href="/jatras"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-red-800 text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200"
              >
                Jatras
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-red-800 text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200"
              >
                Gallery
              </Link>
              <Link
                href="/map"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-red-800 text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200"
              >
                Map
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-red-800 text-md font-medium py-2 border-b border-gray-100 transition-colors duration-200"
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
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-700" />
                  <span className="font-medium">काठमाडौं</span>
                </div>
              </div>
            </div>

            {/* Mobile Login/Register Buttons */}
            <div className="border-t border-gray-100 bg-gray-50">
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="w-full text-gray-700 hover:text-red-800 hover:bg-red-50 transition-all duration-200 font-medium py-3 rounded-xl border border-gray-200 hover:border-red-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
