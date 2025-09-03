"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { stripHtmlTags } from "@/utils/utils";

export const columns: ColumnDef<any>[] = [
  {
    id: "number",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => {
      return (
        <>
          <div className="line-clamp-2 max-w-[200px] text-sm">
            {stripHtmlTags(row?.original?.answer || "")}
          </div>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row?.original} />,
  },
];
