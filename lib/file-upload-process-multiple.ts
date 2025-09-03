import { promises as fs } from "fs";
import path from "path";

export async function processMultiFileUploads(
  files: (File | string)[],
  folderName: string = "portfolio-screening"
): Promise<string[]> {
  if (!files || !Array.isArray(files)) {
    // Return an empty array if no files are provided
    return [];
  }

  const results: string[] = [];

  try {
    // Loop through each file or URL in the array
    for (const file of files) {
      if (typeof file === "string") {
        // If it's a string (an existing URL), add it to the results
        results.push(file);
      } else if (file instanceof File) {
        // If it's a File object, upload it and generate a new URL
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          const ext = path.extname(file.name);
          const timestamp = Date.now();
          const uniqueFilePath = `${folderName}/${timestamp}${ext}`;
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
          // Add the new URL to the results
          results.push(fullPublicUrl);
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          throw error;
        }
      }
    }

    return results;
  } catch (error) {
    console.error("Error processing files:", error);
    throw new Error("File processing failed");
  }
}

export async function processMultiFileUploadsInFs(
  files: File[],
  folderName: string = "charts"
): Promise<string[]> {
  if (!files || typeof files === "string") {
    return files ? [files] : [];
  }
  try {
    const results = await Promise.all(
      files.map(async (file) => {
        try {
          // Read file content as Buffer
          const buffer = Buffer.from(await file.arrayBuffer());

          // Create a unique filename
          const ext = path.extname(file.name);
          const uniqueName = `${Date.now()}${ext}`;

          // Construct the full file path
          const filePath = path.join(
            process.cwd(),
            "public",
            folderName,
            uniqueName
          );

          // Ensure the directory exists
          await fs.mkdir(path.dirname(filePath), { recursive: true });

          // Write the file to disk
          await fs.writeFile(filePath, buffer);

          // Return the relative path
          return filePath.split("public")[1].replace(/\\/g, "/");
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          throw error; // Propagate error to reject the Promise.all
        }
      })
    );

    return results;
  } catch (error) {
    console.error("Error processing files:", error);
    throw new Error("File processing failed");
  }
}
