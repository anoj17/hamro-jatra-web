import { Jatra } from "@prisma/client";
import JatrasPage from "./jatras-component";
import { db } from "@/db";
import { getAllJatras } from "@/lib/actions/jatra-action";

interface PageProps {
  searchParams: Promise<Record<string, string | null>>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchTerms = params.search ?? "";
  const category = params.category ?? "all";
  const status = params.status ?? "all";

  const jatras = await getAllJatras(searchTerms, category, status);
  return (
    <div>
      <JatrasPage jatras={jatras.data} />
    </div>
  );
}
