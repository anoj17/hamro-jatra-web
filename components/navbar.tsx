"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, MapPin } from "lucide-react";

import NepaliDate from "nepali-date-converter";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNepaliDate = () => {
    const today = new Date();
    const nepDate = new NepaliDate(today);
    return `${nepDate.format("YYYY-MM-DD")}`; 
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
      <div className="flex justify-between items-center h-16">
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/jatras"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Jatras
          </Link>
          <Link
            href="/gallery"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/map"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Map
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right Section (Login + Date + Location) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* <Link href="/login">
            <Avatar className="w-9 h-9 cursor-pointer">
              <AvatarImage src="/nepali-user-avatar.png" />
              <AvatarFallback className="bg-primary text-white">प्र</AvatarFallback>
            </Avatar>
          </Link> */}

          {/* Date & Location */}
          <div className="flex items-center space-x-4 text-sm text-gray-700">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{getNepaliDate()}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>काठमाडौं</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary hover:bg-gray-100 rounded-full"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md rounded-b-lg border-t border-gray-200 z-50 animate-slideDown">
          <div className="flex flex-col space-y-5 p-6">
            <Link
              href="/jatras"
              onClick={() => setIsMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-lg font-medium"
            >
              Jatras
            </Link>
            <Link
              href="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-lg font-medium"
            >
              Gallery
            </Link>
            <Link
              href="/map"
              onClick={() => setIsMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-lg font-medium"
            >
              Map
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-lg font-medium"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
