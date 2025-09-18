import UpcommingJatrasForm from "@/components/forms/upcomming-jatras-form";
import { db } from "@/db";
import { Jatra } from "@prisma/client";
import React from "react";

export default async function Page() {
  return (
    <div className="py-4">
      <UpcommingJatrasForm data={null} />
    </div>
  );
}
