import UpcommingJatrasForm from "@/components/forms/upcomming-jatras-form";
import { db } from "@/db";
import { Jatra } from "@prisma/client";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  let data: Jatra | null = null;
  try {
    data = await db.jatra.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <UpcommingJatrasForm data={data} />
    </div>
  );
}
