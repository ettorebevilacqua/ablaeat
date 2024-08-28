"use client";

import type { ChangeEventHandler} from "react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Resizer from "react-image-file-resizer";
import { createClient } from "~/utils/supabase/client";

const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "WEBP",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: unknown;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<unknown>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image avatar: ", error);
      }
    }

    if (url && typeof url === 'string') {
      void downloadImage(url);
    }
  }, [url, supabase]);

  const uploadAvatar = useCallback<ChangeEventHandler<HTMLInputElement>> (
  async ( event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const image = await resizeFile(file as Blob) as File;
      const fileExt = image.name ? image.name.split(".").pop() : '';
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, image);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.log("Error uploading avatar!", error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  },[onUpload, supabase.storage, uid]);

  return (
    <div className="flex max-w-xs flex-row items-center justify-center gap-4 rounded-xl">
      <div>
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl as string}
            alt="Avatar"
            className="avatar image"
            style={{ height: size, width: size }}
          />
        ) : (
          <div
            className="avatar no-image"
            style={{ height: size, width: size }}
          />
        )}
      </div>
      <div style={{ width: size }} className="items-center justify-center">
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Click here for Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}

