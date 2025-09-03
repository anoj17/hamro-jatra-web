import { promises as fs } from "fs";
import path from "path";

export async function processSingleFileUpload(
  file: File | null,
  folderName: string = "portfolio-screening"
): Promise<string[]> {
  try {
    if (!file || typeof file === "string") {
      return file ? [file] : [];
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const ext = path.extname(file.name);
    const timestamp = Date.now();
    const uniqueFilePath = `${folderName}/${timestamp}${ext}`;

    // Construct the full upload URL
    const url = `${process.env.BUNNY_STORAGE_URL}/${process.env.BUNNYCDN_STORAGE_ZONE}/${uniqueFilePath}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        AccessKey: process.env.BUNNYCDN_APY_KEY || "",
        "Content-Type": "application/octet-stream",
      },
      body: buffer,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to upload file. Status: ${response.status}, ${response.statusText}`
      );
    }
    // Return the public URL for the uploaded file
    const publicUrl = `${uniqueFilePath}`;
    const fullPublicUrl = `${process.env.BUNNY_IMAGE_GET_URL}/${publicUrl}`;
    return [fullPublicUrl];
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
}

export async function processSingleFileUploadInFs(
  file: File | null,
  folderName: string = "charts"
): Promise<string[]> {
  try {
    if (!file || typeof file === "string") {
      return file ? [file] : [];
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const ext = path.extname(file.name);
    const timestamp = Date.now();
    const uniqueFilePath = `${timestamp}${ext}`;

    const filePath = path.join(
      process.cwd(),
      "./public/images",
      folderName,
      uniqueFilePath
    );

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, buffer);

    const extractedFilePath = filePath.split("public")[1].replace(/\\/g, "/");
    return [extractedFilePath];
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
}
