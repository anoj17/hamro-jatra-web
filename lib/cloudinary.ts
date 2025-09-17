import { v2 as cloudinary } from "cloudinary";
import { env } from "process";

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: string;
}

export const UploadFileProcess = async (file: File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "hamro-jatra" }, (error, result) => {
            if (error) return reject(error);
            if (result) return resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      }
    );
    return result;
  } catch (error) {
    throw new Error("File upload failed");
  }

  //   const uploadRes = await cloudinary.uploader.upload(file, {
  //     upload_preset: "hamro-jatra",
  //     folder: "hamro-jatra",
  //   });
  //   console.log({ uploadRes });
};
