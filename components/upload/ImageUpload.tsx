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
    <main className="flex min-h-screen flex-col items-center  text-gray-200 p-24">
      <h1 className="text-5xl font-bold">Image</h1>

      <div className="mt-5 w-full max-w-md">
        <label
          htmlFor="file-upload"
          className="block text-center text-gray-400 mb-4 cursor-pointer"
        >
          <div className="p-5  hover:bg-gray-600 rounded-lg border-2 bg-black text-white">
            <span className="text-lg">Click or Drag to Upload Image</span>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={uploadImage}
          className="hidden"
        />
      </div>

      <div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={300}
            height={300}
            className="rounded-lg border border-gray-300 mt-6"
          />
        )}
      </div>
    </main>
  );
}
