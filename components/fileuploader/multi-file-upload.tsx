import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { isEqual } from "lodash";
interface MultipleFilesUploadProps {
  value?: File[] | null;
  onFilesChange: (files: File[] | null) => void;
  imageToPreview?: string[];
  accept?: Record<string, string[]>;
  maxFiles?: number;
  previewClassName?: string;
  dropzoneClassName?: string;
  uploadedFiles?: File[] | null;
  multiFileUploadErr?: string | null;
}

export const CustomMultiFileUploaderInputField: React.FC<
  MultipleFilesUploadProps
> = ({
  value = [],
  onFilesChange,
  imageToPreview = [],
  accept = { "image/*": [] },
  maxFiles = 5,
  uploadedFiles,
  multiFileUploadErr,

  previewClassName = "w-full md:h-40 object-cover h-28 shadow rounded",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const prevImageToPreviewRef = useRef<string[]>([]);

  // useEffect(() => {
  //   if (!imageToPreview) {
  //     setPreviewUrls([]);
  //   } else if (typeof imageToPreview === 'string') {
  //     setPreviewUrls([imageToPreview]); // single string → wrap in array
  //   } else {
  //     setPreviewUrls(imageToPreview); // already array
  //   }
  // }, [imageToPreview]);

  useEffect(() => {
    if (!isEqual(prevImageToPreviewRef.current, imageToPreview)) {
      if (!imageToPreview) {
        setPreviewUrls([]);
      } else if (typeof imageToPreview === "string") {
        setPreviewUrls([imageToPreview]);
      } else {
        setPreviewUrls(imageToPreview);
      }
      prevImageToPreviewRef.current = imageToPreview;
    }
  }, [imageToPreview]);

  useEffect(() => {
    if (value && value.length >= 1) setFiles(value);
  }, [value]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept,
    maxFiles,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);

      const updatedPreviews = acceptedFiles.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      );
      setPreviewUrls((prev) =>
        Array.from(new Set([...prev, ...updatedPreviews]))
      );

      if (onFilesChange) onFilesChange(updatedFiles);
    },
    noClick: true,
  });

  const handleRemoveFile = (url: string, removeIndex: number) => {
    const updatedFiles = files.filter((image, index) => index !== removeIndex);
    const updatedPreviews = previewUrls.filter(
      (img, index) => index !== removeIndex
    );

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);

    if (onFilesChange) onFilesChange(updatedFiles);
  };

  return (
    <section className="">
      <label
        htmlFor="multifileuploader"
        className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 md:h-64"
        {...getRootProps()}
        onClick={open}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 ">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </div>
      </label>
      <aside className="grid grid-cols-4 gap-4 pt-2">
        {previewUrls.map((url, index) => (
          <div className="relative w-full" key={url}>
            <button
              type="button"
              className="absolute right-0 top-0 rounded bg-red-500 p-2 cursor-pointer text-white hover:bg-red-700"
              onClick={() => handleRemoveFile(url, index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
              </svg>
            </button>
            <Image
              src={`${url}`}
              height={300}
              width={400}
              alt="preview"
              className={previewClassName}
              onLoad={() => {
                if (url.startsWith("blob:")) URL.revokeObjectURL(url);
              }}
            />
          </div>
        ))}
      </aside>
    </section>
  );
};
