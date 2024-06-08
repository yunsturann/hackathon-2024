// ** React Imports
import { cn } from "@/lib/utils";
import { ProductFormType } from "@/pages/product/create";
import React, { FC, useState } from "react";

// ** Third Party Components

import Dropzone from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegFolderOpen, FaTrash } from "react-icons/fa";

interface CvDropzoneProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  error?: string;
  className?: string;
  setValue: UseFormSetValue<ProductFormType>;
}

const CvDropzone: FC<CvDropzoneProps> = (props) => {
  const { file, setFile, error, className, setValue } = props;

  const handleOnDrop = (files: File[]) => {
    if (files.length !== 1) {
      toast.error("Please upload only one file");
      return;
    }
    // check is the item an image file png or jpeg or jpg
    console.log(files[0].type);
    if (
      files[0].type !== "image/png" &&
      files[0].type !== "image/jpeg" &&
      files[0].type !== "image/jpg" &&
      files[0].type !== "image/webp"
    ) {
      toast.error("Please upload only png, jpeg or jpg files");
      return;
    }

    // max file size 10mb = 10485760 bytes
    if (files[0].size > 10485760) {
      toast.error("File size is too large. Max file size is 10MB");
      return;
    }

    setFile(files[0]);
    setValue("image", "file variable here");
  };

  return (
    <Dropzone onDrop={handleOnDrop} maxFiles={1} multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <section className={cn("text-center pb-2", className)}>
          <div
            {...getRootProps()}
            className="py-3 border border-gray-700 dark:border-gray-200 border-dashed rounded-2xl"
          >
            <h4 className="px-2 text-lg text-center font-medium text-navy-700 ">
              Add Product Image
            </h4>
            <input {...getInputProps()} />
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              Drag and drop a file here, or click to select a file
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">
              Please upload one image (png, jpeg, jpg, webp) file only. Max file
              size is 10MB.
            </p>
          </div>
          {/* Selected File Operations */}
          <div>
            {file ? (
              <div className="mt-2 border border-gray-200 dark:border-gray-600  rounded-md flex items-center text-left">
                <div className="bg-gray-300 dark:bg-gray-700 px-4 py-4 text-xl">
                  <FaRegFolderOpen />
                </div>
                <div className="pr-2 flex-grow flex items-center justify-between">
                  {/* File Content */}
                  <div className="ml-6 ">
                    <p>{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  {/* ACTIONS */}
                  <div className="space-x-3">
                    <button
                      className="px-3 py-2  text-red-500 text-xl hover:bg-gray-200 rounded-lg transition duration-300"
                      onClick={() => {
                        setFile(null);
                        setValue("image", "");
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {error && !file && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </section>
      )}
    </Dropzone>
  );
};

export default CvDropzone;
