"use client";

import { Button } from "@/components/ui/button";
import { sidebarItems } from "@/constant/data";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { SessionProps } from "@/types";
import { ChevronLeft, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";

export function AdminSidebar({ session }: { session: SessionProps | null }) {
  const pathName = usePathname();

  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full lg:mt-20 hidden lg:block bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-50",
        isMinimized ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isMinimized && (
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-sidebar-foreground">
              Hamro Jatra
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer hover:text-sidebar-accent-foreground transition-colors duration-200"
        >
          {isMinimized ? (
            <Menu className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = Icons[item.icon as keyof typeof Icons] ?? Menu;
          const isActive = pathName === item.href;

          return (
            <Link key={index} href={item.href}>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start mt-1 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isMinimized ? "px-2 w-10" : "px-3",
                  isActive &&
                    "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                )}
              >
                <div>
                  <Icon
                    className={cn("w-5 h-5", isMinimized ? "mx-auto" : "mr-3")}
                  />
                  {!isMinimized && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      {!isMinimized && (
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Quick Actions
          </div>
          <Button
            size="sm"
            className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>
      )}
    </div>
  );
}
