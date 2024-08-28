"use client";

import type { ChangeEventHandler} from "react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Resizer from "react-image-file-resizer";

import { createClient } from "~/utils/supabase/client";
import userImg from "/public/images/User.webp";

const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "WEBP",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });

export default function UploadImg({
  uid,
  url,
  size,
  onUpload,
  bucket,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  bucket: string;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);
  const [filePath, setFilePath] = useState<string | null>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: xx", error);
      }
    }
    const _filePath = url ? url.split("/").pop() : null;
    setFilePath(_filePath);
    // if (url) downloadImage(url)
  }, [url, supabase, bucket]);
  // React.ChangeEventHandler<HTMLInputElement>
  const uploadAvatar = useCallback<ChangeEventHandler<HTMLInputElement>>
    (async (event) => {
      try {
        setUploading(true);

        if (!event.target.files || event.target.files.length === 0) {
          throw new Error("You must select an image to upload.");
        }

        if (filePath) {
          const { data, error } = await supabase.storage
            .from(bucket)
            .remove([filePath]);
          console.log("", data, error);
        }

        const file = event.target.files[0];
        const image = await resizeFile(file as Blob);
        const fileExt = "webp"; // file.name.split('.').pop()

        const newFilePath = filePath
          ? filePath
          : `${uid}-${Math.random()}.${fileExt}`;
        if (!filePath) setFilePath(newFilePath);

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(newFilePath, image as Blob, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const pubUrl = supabase.storage.from(bucket).getPublicUrl(newFilePath);

        onUpload(pubUrl.data.publicUrl);
      } catch (error) {
        console.log("error upload ", error);
        alert("Error uploading avatar!");
      } finally {
        setUploading(false);
      }
    }, [bucket, filePath, onUpload, supabase.storage, uid]);

  return (
    <div className="flex max-w-xs flex-row items-center justify-center gap-4 rounded-xl">
      <div>

        <Image
          width={size}
          height={size}
          src={url ?? userImg}
          alt="Image"
          className="avatar image"
          style={{ height: size, width: size }}
        />

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
