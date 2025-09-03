"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./button";
import { Input } from "./input";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_PAGE_SIZE } from "@/constant/data";

interface Identifiable {
  id: string;
  slug?: string;
  key?: string;
}
interface DataTableProps<TData extends Identifiable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  showSearchBar?: boolean;
  showPagination?: boolean;
  customOnRowSelectionChange?: (
    selectedData: TData[],
    unSelectedData: TData[]
  ) => void;
  selectedIds?: string[];
  pageSize?: number;
}

const ITEMS_PER_PAGE = DEFAULT_PAGE_SIZE;

export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
  searchKey,
  showSearchBar = true,
  showPagination = true,
  pageSize = ITEMS_PER_PAGE,
  customOnRowSelectionChange,
  selectedIds = [],
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const searchedKeyword = searchParams.get("search") || "";

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: Number(pageSize),
  });
  const [filtering, setFiltering] = useState<string>(searchedKeyword);
  const initialRowSelection = useMemo(() => {
    const selection: RowSelectionState = {};
    selectedIds.forEach((id) => {
      const matchingRow = data.find((row) => row.key === id || row.id === id);
      if (matchingRow) {
        selection[matchingRow.key || matchingRow.id] = true;
      }
    });
    return selection;
  }, [selectedIds, data]);

  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(initialRowSelection);
  const isInitialSelectionSet = useRef(false); // Track if initial selection is set

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting,
      globalFilter: filtering,
      pagination,
      rowSelection, // Manage selected rows state
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => {
      return row.key || row.id || uuidv4();
    }, // Use uuid if id is missing
  });

  // Automatically track selected data whenever selection changes
  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => row.original);
    // Get IDs of selected rows
    const selectedRowIds = selectedRows.map(
      (row) => row.original.key || row.original.id
    );

    // Get unselected rows by filtering out selected ones
    const unselectedData = data.filter(
      (row) => !selectedRowIds.includes(row.key || row.id)
    );

    if (customOnRowSelectionChange) {
      customOnRowSelectionChange(selectedData, unselectedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  useEffect(() => {
    if (searchedKeyword) setFiltering(searchedKeyword);
  }, [searchedKeyword]);

  // Set initial row selection once
  useEffect(() => {
    if (!isInitialSelectionSet.current) {
      setRowSelection(initialRowSelection);
      isInitialSelectionSet.current = true;
    }
  }, [initialRowSelection]);

  return (
    <>
      {showSearchBar &&
        (searchKey ? (
          <Input
            placeholder={`Search ${searchKey}...`}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) || ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="mb-4 w-full"
          />
        ) : (
          <Input
            placeholder="Search table..."
            value={filtering}
            onChange={(event) => setFiltering(event.target.value)}
            className="w-full mb-2 placeholder:text-[.8em] placeholder:leading-[normal] md:placeholder:text-[.9em]"
          />
        ))}

      <ScrollArea className="min-h-16 rounded-md border">
        <Table className="relative overflow-x-scroll">
          <TableHeader className="text-[.7rem] md:text-[.9rem]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-r border-gray-300 bg-gray-200 font-bold"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-[.8rem] md:text-[.8rem]">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r border-gray-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {showPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
            {Math.min(
              pagination.pageIndex * pagination.pageSize + pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
            {table.getFilteredRowModel().rows.length < data.length &&
              ` (filtered from ${data.length} total entries)`}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={18} className="hover:text-green-500" />
              Previous
            </Button>
            {/* Page Number Buttons */}
            {(() => {
              const pageCount = table.getPageCount();
              const current = pagination.pageIndex;

              const buttons = [];

              let prevWasDots = false;

              for (let i = 0; i < pageCount; i++) {
                const isFirst = i === 0;
                const isLast = i === pageCount - 1;
                const isNearCurrent = Math.abs(i - current) <= 2;

                if (isFirst || isLast || isNearCurrent) {
                  buttons.push(
                    <Button
                      key={i}
                      variant={i === current ? "default" : "outline"}
                      size="sm"
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </Button>
                  );
                  prevWasDots = false;
                } else if (!prevWasDots) {
                  buttons.push(
                    <span key={`dots-${i}`} className="px-2">
                      ...
                    </span>
                  );
                  prevWasDots = true;
                }
              }

              return <div className="flex gap-1">{buttons}</div>;
            })()}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight size={18} className="hover:text-green-500" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
