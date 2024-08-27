'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '~/utils/supabase/client'
import Image from 'next/image'
import { Button } from "@acme/ui/button";
import userImg from "/public/images/User.webp"
import Resizer from "react-image-file-resizer";

const resizeFile = (file:any) =>
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
      "file"
    );
  });

export default function UploadImg({
  uid,
  url,
  size,
  onUpload,
  bucket,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)
  const [filePath, setFilePath] = useState();

	const empityImg = true;

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from(bucket).download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: xx', error)
      }
    }
    const _filePath = url ? url.split('/').pop() : null
	setFilePath(_filePath);
   // if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      if (!!filePath){
		const {data, error} =  await supabase.storage.from(bucket).remove([filePath])
		console.log('', data, error);
      }	
      
      const file = event.target.files[0]
      const image = await resizeFile(file);
      const fileExt = 'webp' // file.name.split('.').pop()
	
	  const newFilePath = !!filePath ? filePath :  `${uid}-${Math.random()}.${fileExt}` 
	  if (!filePath)  setFilePath(newFilePath);
	
      const { data, error: uploadError } = await supabase.storage.from(bucket).upload(newFilePath, image,{
		cacheControl: '3600',
		upsert: true
	  })

      if (uploadError) {
        throw uploadError
      }

	  const pubUrl = supabase.storage.from(bucket).getPublicUrl(newFilePath)
  
      onUpload(pubUrl?.data?.publicUrl, newFilePath, data)
    } catch (error) {
		console.log('error upload ', error);
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex max-w-xs flex-row gap-4 rounded-xl items-center justify-center">
      <div>{ empityImg ? (
        <Image
          width={size}
          height={size}
          src={url || userImg}
          alt="Image"
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
