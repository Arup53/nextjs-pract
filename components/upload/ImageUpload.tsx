"use client";

import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = e.target.files[0];

      const { data: image, error: uploadError } = await supabase.storage
        .from("user-uploads")
        .upload(`${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      if (image) {
        console.log("Uploaded:", image);

        // Now get the public URL
        const { data: imgUrl } = supabase.storage
          .from("user-uploads") // notice: bucket name should match
          .getPublicUrl(`${file.name}`);

        if (imgUrl) {
          setImageUrl(imgUrl.publicUrl);
          // create axios request

          const response = await axios.get("http://localhost:3001/groqTest", {
            params: {
              img: imgUrl.publicUrl, // Pass the image URL to the backend API
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageUrl);
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 text-gray-200 p-24">
      <h1 className="text-5xl font-bold">NextJs & Supabase Storage</h1>

      <div className="mt-5">
        <input
          type="file"
          onChange={uploadImage}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>
      <div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={300}
            height={300}
            className="rounded-lg border border-gray-300"
          />
        )}
      </div>
    </main>
  );
}
