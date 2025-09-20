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
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface FiltersState {
  searchValue?: string;
  category?: string;
  region?: string;
  status?: string;
}

const SearchJatrasByFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state initialized from URL
  const [filters, setFilters] = useState<FiltersState>({
    searchValue: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? "all",
    region: searchParams.get("region") ?? "all",
    status: searchParams.get("status") ?? "all",
  });

  // Debounce search for smoother typing
  const debouncedSearch = useDebounce(filters.searchValue, 400);

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value || value === "all") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      return newParams.toString();
    },
    [searchParams]
  );

  // Update URL when filters change
  const updateUrlParams = useCallback(
    (params: Record<string, string | null>) => {
      const query = createQueryString(params);
      router.replace(`${pathname}?${query}`);
    },
    [router, pathname, createQueryString]
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    const currentCategory = searchParams.get("category") ?? "all";
    const currentRegion = searchParams.get("region") ?? "all";
    const currentStatus = searchParams.get("status") ?? "all";

    if (
      debouncedSearch !== currentSearch ||
      filters.category !== currentCategory ||
      filters.region !== currentRegion ||
      filters.status !== currentStatus
    ) {
      updateUrlParams({
        search: debouncedSearch || null,
        category: filters.category || null,
        region: filters.region || null,
        status: filters.status || null,
      });
    }
  }, [
    debouncedSearch,
    filters.category,
    filters.region,
    filters.status,
    updateUrlParams,
  ]);

  const resetFilters = () => {
    setFilters({
      searchValue: "",
      category: "all",
      region: "all",
      status: "all",
    });
    updateUrlParams({
      search: null,
      category: null,
      region: null,
      status: null,
    });
  };

  const isFiltered =
    filters.searchValue ||
    filters.category !== "all" ||
    filters.region !== "all" ||
    filters.status !== "all";

  return (
    <section className="py-3 px-4 bg-white/80 backdrop-blur-sm sticky top-16 z-40">
      <div className="container mx-auto flex items-center flex-wrap gap-4">
        {/* Search Field */}
        <div className="relative flex-1 md:max-w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <Input
            placeholder="Search festivals or locations..."
            value={filters.searchValue}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchValue: e.target.value }))
            }
            className="pl-12 h-12 border-2 border-red-200 focus:border-primary rounded-md bg-white/90 transition-all duration-300 focus:scale-[1.02] shadow-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-primary">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filters:</span>
          </div>

          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-40 h-12 border-2 border-red-200 focus:border-primary bg-white/90">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="religious">🙏 Religious</SelectItem>
              <SelectItem value="cultural">🎭 Cultural</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.region}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, region: value }))
            }
          >
            <SelectTrigger className="w-48 h-12 border-2 border-red-200 focus:border-primary bg-white/90">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="kathmandu">🏛️ Kathmandu Valley</SelectItem>
              <SelectItem value="nationwide">🇳🇵 Nationwide</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger className="w-40 h-12 border-2 border-red-200 focus:border-primary bg-white/90">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">🔜 Upcoming</SelectItem>
              <SelectItem value="completed">✅ Completed</SelectItem>
            </SelectContent>
          </Select>

          {isFiltered && (
            <Button
              variant="outline"
              onClick={resetFilters}
              className="h-10 px-4 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchJatrasByFilter;
