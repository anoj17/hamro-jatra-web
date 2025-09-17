import { db } from "@/db";
import { UploadFileProcess } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const englishDateStr = formData.get("englishDate") as string;
  const englishDate = englishDateStr ? new Date(englishDateStr) : undefined;
  const location = formData.get("location") as string;
  const category = formData.get("category") as string;
  const latitude = formData.get("latitude") as string;
  const altitude = formData.get("altitude") as string;
  const district = formData.get("district") as string;
  const nepaliDate = formData.get("nepaliDate") as string;
  const month = formData.get("month") as string;
  const shortTitle = formData.get("shortTitle") as string;
  const images = formData.getAll("image") as File[];

  const imageUrls = await Promise.all(
    images.map(async (file) => {
      const result = await UploadFileProcess(file as File);
      return result.url; // or result.secure_url if you want URL
    })
  );

  try {
    await db.jatra.create({
      data: {
        title,
        description,
        englishDate: englishDate!.toISOString(),
        location,
        category,
        latitude: parseFloat(latitude),
        altitude: parseFloat(altitude),
        district,
        nepaliDate,
        month,
        shortTitle,
        image: imageUrls,
      },
    });
    return NextResponse.json(
      { message: "Jatra created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create Jatra", error },
      { status: 500 }
    );
  }

  console.log({ imageUrls });
}
