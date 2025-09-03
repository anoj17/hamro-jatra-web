"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { Heading } from "../heading";
import { navroutes } from "@/constant/navroutes";

type UpcommingJatrasProps = {
  data: any;
};

export const UpcommingJatrasClient: React.FC<UpcommingJatrasProps> = ({
  data,
}) => {
  return (
    <>
      <div className="flex w-full items-start justify-between">
        <div className="flex w-full flex-wrap justify-between">
          <Heading
            title={`Upcomming Jatras (${data.length})`}
            description="Here you can view all the available Upcomming Jatras"
          />
          <div className="mt-4 flex gap-2 lg:mt-0">
            <Link href={navroutes.CREATE_UPCOMING_JATRA}>
              <Button className="text-xs md:text-sm cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Add Upcomming Jatras
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
