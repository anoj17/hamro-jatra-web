"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Loader, LogOut, Menu, MenuIcon, User } from "lucide-react";
import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { sidebarItems } from "@/constant/data";
import { Icons } from "./icons";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const Logout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center">
            <MenuIcon />
          </div>
        </SheetTrigger>

        <SheetContent side="right" className="!px-0">
          <div className="h-[98vh] space-y-4 overflow-y-scroll py-4 scrollbar-none">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className=" space-y-1">
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-sidebar-foreground">
                      Hamro Jatra
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 border-b">
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
                            isActive &&
                              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                          )}
                        >
                          <div>
                            <Icon className={cn("w-5 h-5")} />

                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
