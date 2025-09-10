"use client";

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

const SearchJatrasByFilter = ({
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  searchTerm,
  setSearchTerm,
}: any) => {
  return (
    <section className="py-3 px-4 bg-white/80 backdrop-blur-sm sticky top-16 z-40">
      <div className="container mx-auto flex items-center">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Enhanced Search */}
          <div className="relative flex-1 w-full md:min-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-50 text-primary" />
            <Input
              placeholder="Search festivals or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-2 border-red-200 focus:border-primary rounded-md bg-white/90 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] shadow-sm"
            />
          </div>

          {/* Enhanced Filters */}
          <div className="flex flex-wrap gap-4 items-left text-start w-full">
            <div className="flex items-center gap-2 text-primary">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Filters:</span>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-40 h-12 border-2 border-red-200 focus:border-primary rounded-md bg-white/90">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="religious">🙏 Religious</SelectItem>
                <SelectItem value="cultural">🎭 Cultural</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-48 h-12 border-2 border-red-200 focus:border-primary rounded-md bg-white/90">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="kathmandu">🏛️ Kathmandu Valley</SelectItem>
                <SelectItem value="all regions">🇳🇵 Nationwide</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 h-12 border-2 border-red-200 focus:border-primary rounded-md bg-white/90">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">🔜 Upcoming</SelectItem>
                <SelectItem value="completed">✅ Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Results Count */}
        <div className="ml-5 flex items-center justify-between">
          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedRegion !== "all" ||
            selectedStatus !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedRegion("all");
                setSelectedStatus("all");
              }}
              className="border-secondary bg-primary text-white hover:bg-secondary cursor-pointer cursor-pointers"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchJatrasByFilter;
