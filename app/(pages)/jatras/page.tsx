import { Jatra } from "@prisma/client";
import JatrasPage from "./jatras-component";
import { db } from "@/db";

export default async function Page() {
  let data: Jatra[] = [];
  try {
    data = await db.jatra.findMany({});
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <JatrasPage jatras={data} />
    </div>
  );
}
