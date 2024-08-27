
"use client";
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '~/utils/supabase/client'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userImg from "/public/images/User.webp"
import Plates from "./plates";

import Avatar  from './Avatar'
import { Button } from "@acme/ui/button";

export const accountSchema = z
  .object({
    full_name: z.string(),
    website: z.string(),
    aboutme: z.string(),
  });

export default function Account({user}:any) {
	const [errorSub, setErrorSub] = useState<string | null>(null);
	const supabase = createClient()
	const [formData, setFormData] = useState({});
	
 const [loading, setLoading] = useState(true)
 const [fullname, setFullname] = useState<string | null>(null)
 const [username, setUsername] = useState<string | null>(null)
 const [website, setWebsite] = useState<string | null>(null)
 const [avatar_url, setAvatarUrl] = useState<string | null>(null)
 
 const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    defaultValues,
  } = useForm({
   // resolver: zodResolver(accountSchema),
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, website, aboutme, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log('ERROR ACCOUNT', error)
        // throw error
      }

      if (data) {
		  console.log('fill forn ', data);
		  // setFormData({ defaultValues: { ...defaultValues, ...data } });
      // Reset the form with new default values
        reset(data);
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
		 console.log('ERROR ACCOUNT catch', error)
      // alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])


  async function updateProfile({
    full_name,
    aboutme,
    avatar_url,
  }: {
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
	  console.log('onSubmit data', fullname, );
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name,
        aboutme,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error){
		console.log('error update profile', error);
		alert('Error on update');
		return false  
	  } 
      
       alert('Profile updated!')
    } catch (error) {
	  console.log('error catch update profile', error);
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }
  
    async function onSubmit(dataForm) {
    updateProfile({...dataForm, avatar_url});

    console.log('onSubmit data', dataForm);

  }

 if (!user) {
    return <h3>User not found</h3>
 }
    return(
   <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight">
           User Account Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} action="/" className="mt-8">
            <div className="space-y-5">
               <div >
              <p>Email : <span className="font-bold">{user.email}</span></p>
              </div>
       <div>       
     <Avatar
        uid={user?.id ?? null}
        url={avatar_url || userImg}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({...formData, avatar_url: url })
        }}
      />
         </div>     
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium"
                >
                  {" "}
                  Full name{" "}
                </label>
                <div className="mt-2">
                  <input
                    {...register("full_name")}
                    name="full_name"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full name"
                  ></input>
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.full_name.message}</p>
                )}
              </div>
             <div>
                <label
                  htmlFor=""
                  className="text-base font-medium"
                >
                  {" "}
                  Website{" "}
                </label>
                <div className="mt-2">
                  <input
                    {...register("website")}
                    name="website"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Web site"
                  ></input>
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.website.message}</p>
                )}
              </div>
			  <div>
                <label
                  htmlFor=""
                  className="text-base font-medium"
                >
                  {" "}
                  About me{" "}
                </label>
                <div className="mt-2">
                <textarea rows="4" {...register('aboutme')}  name="aboutme" placeholder='Somethink about you' className="w-full rounded-md border border-gray-300 bg-transparent" />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.aboutme.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`${
                    !isValid ? "bg-slate-400 hover:bg-slate-400" : undefined
                  } inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                >
                  {isSubmitting ? "Submitting..." : "Save Profile"}
                </button>
              </div>
            </div>
          </form>
          <div> 
				<br /><p className="text-red-500">{errorSub}</p>
          </div>
        </div>
      </div>
    </section>
    )
}
