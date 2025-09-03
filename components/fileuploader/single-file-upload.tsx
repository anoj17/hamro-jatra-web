"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";

type SingleFileUploadProps = {
  value?: File | null | string;
  onChange: (file: File | null) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  previewUrl?: string;
  containerClassName?: string;
  errorMessage?: string;
  previewClassName?: string;
  label?: string;
};

const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  value,
  onChange,
  previewUrl = "",
  accept = { "image/*": [] },
  maxFiles = 1,
  containerClassName = "relative w-64 shadow rounded overflow-hidden",
  previewClassName = "w-full h-40 object-cover shadow rounded",
  label = " or drag and drop",
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null | string>(null);
  const [preview, setPreview] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Cleanup function for blob URLs
  const cleanupPreview = useCallback(() => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
  }, [preview]);

  // Set initial preview from previewUrl prop (backend URL)
  useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  // Sync with external value prop without wiping preview for Files
  useEffect(() => {
    if (value) {
      setUploadedFile(value);
      if (typeof value === "string") {
        setPreview(value); // Backend URL
      } else if (value instanceof File) {
        const filePreview = URL.createObjectURL(value);
        setPreview(filePreview);
      }
    } else {
      setPreview("");
    }
  }, [value]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      cleanupPreview();
    };
  }, [cleanupPreview]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept,
    maxFiles,
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setErrorMessage("");

      if (fileRejections.length > 0) {
        const tooManyFilesRejected = fileRejections.some((rejection) =>
          rejection.errors.some((error) => error.code === "too-many-files")
        );

        if (tooManyFilesRejected) {
          setErrorMessage(`You can only upload a maximum of ${maxFiles} file.`);
        } else {
          setErrorMessage(
            "One or more files were rejected. Please check file type or size."
          );
        }

        onChange(null);
        setUploadedFile(null);
        cleanupPreview();
        setPreview("");
        return;
      }

      if (acceptedFiles.length === 0) {
        setUploadedFile(null);
        cleanupPreview();
        setPreview("");
        onChange(null);
        return;
      }

      const updatedFile = acceptedFiles[0];
      setUploadedFile(updatedFile);

      cleanupPreview();

      const updatedPreview = URL.createObjectURL(updatedFile);
      setPreview(updatedPreview);
      onChange(updatedFile);
    },
    noClick: true,
  });

  const handleRemoveFile = () => {
    setUploadedFile(null);
    cleanupPreview();
    setPreview("");
    setErrorMessage("");
    onChange(null);
  };

  const isPdfFile = (file: File | null | string, url: string) => {
    if (file instanceof File) {
      return file.type === "application/pdf";
    }
    return url.toLowerCase().endsWith(".pdf");
  };

  return (
    <section className="w-full">
      <label
        htmlFor="multifileuploader"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        {...getRootProps()}
        onClick={open}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500"
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
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> {label}
          </p>
        </div>
      </label>

      <aside className="grid grid-cols-4 gap-4 pt-2">
        <div className={containerClassName}>
          {preview && (
            <>
              {isPdfFile(uploadedFile, preview) ? (
                <iframe
                  src={preview}
                  width="100%"
                  height="150px"
                  className="max-h-[150px] overflow-auto rounded"
                  title="PDF Preview"
                />
              ) : (
                <Image
                  src={preview}
                  height={300}
                  width={400}
                  alt="preview"
                  className={previewClassName}
                />
              )}
            </>
          )}
          {preview && (
            <button
              onClick={handleRemoveFile}
              className="absolute right-0 top-0 rounded bg-red-500 p-2 text-white hover:bg-red-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </section>
  );
};

export default SingleFileUpload;
