'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '~/utils/supabase/client'
import Image from 'next/image'
import { Button } from "@acme/ui/button";
import Resizer from "react-image-file-resizer";

const resizeFile = (file:any) =>
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
      "file"
    );
  });
  
export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image avatar: ', error)
      }
    }

    if (url && !url.src) downloadImage(url)

  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const image = await resizeFile(file);
      const fileExt = image.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, image)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
		console.log('Error uploading avatar!', error);
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex max-w-xs flex-row gap-4 rounded-xl items-center justify-center">
      <div>{avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      </div>
      <div style={{ width: size }} className="items-center justify-center">
      
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Click here for Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
