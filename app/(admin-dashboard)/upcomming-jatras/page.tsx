import { UpcommingJatrasClient } from "@/components/tables/client";
import { db } from "@/db";
import { Jatra } from "@prisma/client";
import { tr } from "date-fns/locale";
import React from "react";

export default async function Page() {
  let data: Jatra[] = [];

  try {
    data = await db.jatra.findMany({});
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-4">
      <UpcommingJatrasClient data={data} />
    </div>
  );
}
