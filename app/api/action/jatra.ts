"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteJatra(id: string) {
  try {
    await db.jatra.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/upcomming-jatras");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
