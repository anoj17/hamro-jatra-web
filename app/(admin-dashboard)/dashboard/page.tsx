import { AdminDashboardClient } from "@/components/tables/dashboard/client";
import { db } from "@/db";

export default async function Page() {
  let user;
  try {
    user = await db.user.findMany({});
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminDashboardClient user={user} />
    </div>
  );
}
