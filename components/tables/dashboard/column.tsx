"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { CellAction } from "./cell-action";

type QuestionRow = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  image?: string;
  updatedAt: string;
};

export const columns: ColumnDef<QuestionRow>[] = [
  {
    id: "number",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <>
          <div className="line-clamp-2 max-w-[200px] text-sm">
            {row?.original?.createdAt
              ? format(new Date(row.original.createdAt), "dd MMMM yyyy")
              : // Output: 16 September 2025
                "-"}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <>
          <div className="line-clamp-2 max-w-[200px] text-sm">
            {row.original?.image ? (
              <Image
                src={row?.original?.image}
                alt="image"
                width={50}
                height={50}
              />
            ) : (
              <div>-</div>
            )}
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
