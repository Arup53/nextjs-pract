"use client";

import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [invoiceResponse, setInvoiceResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const uploadImage = async (file: File) => {
    try {
      setLoading(true);
      setError(null);

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        throw new Error(
          "File type not supported. Please upload JPG, PNG, GIF, or WEBP."
        );
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        throw new Error("File size exceeds 5MB limit.");
      }

      // Upload to Supabase
      const { data: image, error: uploadError } = await supabase.storage
        .from("user-uploads")
        .upload(`${Date.now()}-${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      if (image) {
        console.log("Uploaded:", image);

        // Get the public URL
        const { data: imgUrl } = supabase.storage
          .from("user-uploads")
          .getPublicUrl(`${image.path}`);

        if (imgUrl) {
          setImageUrl(imgUrl.publicUrl);

          // Process with backend API
          const response = await axios.get("http://localhost:3001/groqTest", {
            params: {
              img: imgUrl.publicUrl,
            },
          });

          setInvoiceResponse(response.data);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImage(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadImage(e.dataTransfer.files[0]);
    }
  };

  console.log(imageUrl);
  console.log(invoiceResponse);
  return (
    <main className="flex min-h-screen flex-col items-center text-gray-200 p-24">
      <h1 className="text-2xl text-black font-bold mb-6">Image Upload</h1>

      <div className="mt-2 w-full max-w-md">
        <div
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${
            dragActive
              ? "bg-gray-700 border-blue-400"
              : "bg-black hover:bg-gray-900 border-gray-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <div className="flex flex-col items-center">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG, GIF or WEBP (MAX. 5MB)
            </p>
          </div>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {loading && (
        <div className="mt-6 text-black">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-600 rounded-full animate-spin mr-2" />
            <span>Processing...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {imageUrl && !loading && (
        <div className="mt-6">
          <h2 className="text-lg text-black font-medium mb-2">
            Uploaded Image
          </h2>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      )}

      {invoiceResponse && !loading && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-lg text-black font-medium mb-2">
            Processing Results
          </h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(invoiceResponse, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
