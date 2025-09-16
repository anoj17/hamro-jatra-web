"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Loader, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/hamro-jatra-logo.png";
import { ChevronDown, Search, User, Menu, X } from "lucide-react";
import { SessionProps } from "@/types";
import { MobileSidebar } from "./admin-mobile-navbar";

export function AdminNavbar({ session }: { session: SessionProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔑 redirect in useEffect
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  const Logout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    setLoading(false);
    router.push("/");
  };

  if (!session) {
    // prevent rendering before redirect
    return null;
  }

  return (
    <header className="bg-white border-b border-border lg:px-10 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <div className="">
          <Link
            href="/"
            className="flex items-center h-14 w-16 lg:h-20 lg:w-20 space-x-2"
          >
            <Image
              src={logo}
              alt="logo"
              width={90}
              height={90}
              className="h-full w-full object-contain"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="lg:flex hidden items-center space-x-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search destinations, tours, customers..."
              className="pl-10 bg-background border-border focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center md:space-x-4">
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarImage
                    src={session?.user?.image || "/placeholder.svg"}
                    alt={session.user.name || "User avatar"}
                  />
                  <AvatarFallback className="bg-secondary uppercase text-white text-md font-medium">
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-col hidden md:flex items-start">
                  <span className="text-sm text-primary cursor-pointer truncate max-w-32">
                    {session.user.email}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 hidden lg:block cursor-pointer text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
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
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>

              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-2 text-sm hover:text-white hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-150"
                >
                  <User className="h-4 w-4 hover:text-white mr-3" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-gray-100" />

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  Logout();
                }}
                disabled={loading}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-150"
              >
                {loading ? (
                  <Loader className="h-4 w-4 mr-3 hover:text-white animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 mr-3 hover:text-white" />
                )}
                {loading ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
