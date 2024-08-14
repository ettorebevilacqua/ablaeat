
"use client";
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '~/utils/supabase/client'
import Avatar from './Avatar'

import { CldUploadButton, CldImage } from "next-cloudinary";
import { Button } from "@acme/ui/button";

export function Photos({info, onError, onSuccess}) {
 
  return (
    <div>    
    upload
      <CldUploadButton
        options={{ multiple: false }}
        public_id={info?.public_id || ''}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={onSuccess}
        onQueuesEnd={(result, { widget }) => {
            widget.close();
        }}
         onError={onError}

      >
        <span>
          Upload
        </span>
      </CldUploadButton>
    </div>
  );
}

export default function Account({user}:any) {
const supabase = createClient()
 const [loading, setLoading] = useState(true)
 const [fullname, setFullname] = useState<string | null>(null)
 const [username, setUsername] = useState<string | null>(null)
 const [website, setWebsite] = useState<string | null>(null)
 const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])


  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

 if (!user) {
    return <h3>User not found</h3>
 }
    return(
    <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-center gap-4">
            {user && 'User : ' + user.email} 
             <form action="/api/auth/signout" method="post">
                  <Button type="submit">
                    Sign out
                  </Button>
                </form>
            </div>
             <div className="form-widget" flex flex-col items-center justify-center gap-4>

      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <div className="flex flex-row gap-4">
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div className="flex flex-row gap-4">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-4">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-4">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <Button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>
    </div>
        </div>
    </main>
    )
}
