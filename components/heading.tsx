"use client";

import type { LucideIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface HeadingProps {
  title: string;
  description: string;
  className?: string;
  icon?: LucideIcon;
  iconColor?: string;
  gradient?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  className,
  icon: Icon = null,
  iconColor = "text-blue-500",
  gradient = "from-slate-700 to-slate-900",
}) => {
  return (
    <div className="mb-4 sm:mb-6 lg:mb-8">
      {/* Main heading container */}
      <div className="relative">
        <div className="relative backdrop-blur-[1px]">
          {/* Heading with icon */}
          <div className="mb-1 flex items-center gap-2 sm:gap-3 md:gap-4">
            {Icon && (
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute inset-0 ${iconColor} scale-125 opacity-25 blur-md`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                </div>

                {/* Main icon */}
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${iconColor} drop-shadow-lg transition-all duration-300 hover:scale-110`}
                  />
                </div>
              </div>
            )}

            <h2
              className={`
              bg-gradient-to-r text-lg font-bold tracking-tight sm:text-xl md:text-2xl
              ${gradient} bg-clip-text leading-tight
              text-transparent drop-shadow-sm
              ${className}
            `}
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <div className="relative">
            <p className=" max-w-xl font-sans text-xs italic leading-relaxed text-slate-600 transition-colors duration-200 sm:max-w-2xl sm:text-sm dark:text-slate-400">
              {description}
            </p>

            <div
              className={`mt-2 h-0.5 w-8 bg-gradient-to-r ${gradient} rounded-full opacity-70 transition-all duration-500 hover:w-16 hover:opacity-90`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
