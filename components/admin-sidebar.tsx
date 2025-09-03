"use client";

import { Button } from "@/components/ui/button";
import { sidebarItems } from "@/constant/data";
import { cn } from "@/lib/utils";
import { ChevronLeft, MapPin, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "./icons";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full lg:mt-20 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">
              Hamro Jatra
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
        >
          {collapsed ? (
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
          const isActive = activeItem === item.label;

          return (
            <Link key={index} href={item.href}>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start mt-1 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "px-2 w-10" : "px-3",
                  isActive &&
                    "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                )}
                onClick={() => setActiveItem(item.label)}
              >
                <div>
                  <Icon
                    className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      {!collapsed && (
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
