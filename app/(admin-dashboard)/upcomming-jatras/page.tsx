import { UpcommingJatrasClient } from "@/components/tables/client";
import React from "react";

export default function Page() {
  const data: any[] = [];

  return (
    <div>
      <UpcommingJatrasClient data={data} />
    </div>
  );
}
