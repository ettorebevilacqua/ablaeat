
"use client";
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '~/utils/supabase/client'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userImg from "/public/images/User.webp"

import PlateCard  from '~/app/_components/PlateCard.tsx'
import UploadImg  from '~/app/_components/UploadImg'
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/";

export type Plate = {title:string | null; img:string | null; desc:string | null; like:z.number | null; } 

export const PlateSchema = z.object({
    title: z.string(),
    img: z.string(),
    desc: z.string(),
    like: z.number()
  });



export default function Plates({user}:any) {
	const [errorSub, setErrorSub] = useState<string | null>(null);
	const [dataList, setDataList] = useState<Plate[] | null>(null) 
	const supabase = createClient()
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(true)
	const form = useForm({
		schema: PlateSchema,
		defaultValues: {
		  title: "",
		  img: "",
		  desc:"",
		  like:0,
		},
	});
 const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    defaultValues,
  } = form
  
  const onUploadImg = (url) => {
          setAvatarUrl(url)
          console,log('url plate', url);
          updateProfile({...formData, avatar_url: url })
        }

  const getData = useCallback(async () => {
    try {
      setLoading(true)
	  console.log('USER xxx', user?.id)
      const { data, error, status } = await supabase
        .from('users_images')
        .select(`title, img, descr, like`)
        .eq('id', user?.id)

      if (error && status !== 406) {
        console.log('ERROR ACCOUNT', error)
        // throw error
      }

      if (data) {
		console.log('fill form ', data);
        // reset(data);
        setDataList(data)
      }
    } catch (error) {
		 console.log('ERROR ACCOUNT catch', error)
      // alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
	   console.log('USER xxx useEffect', user?.id)
    getData()
  }, [user, getData])


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
      alert('Error updating the data!', error)
    } finally {
      setLoading(false)
    }
  }
  
    async function onSubmit(dataForm) {
		updateProfile({...dataForm, avatar_url});
		console.log('onSubmit data', dataForm);
	}
	
    return(
   <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <h2 className="text-center text-2xl font-bold leading-tight">
           My prefer Plates
          </h2>
          
           <p>Add Plate </p>
          <form onSubmit={handleSubmit(onSubmit)} action="/" className="mt-8">
			
          
          </form>
          
          { !dataList ? 'Empity' 
			  :dataList.map((plate:Plates)=>
				<PlateCard user={user} plate={plate} isValid={isValid} isSubmitting={isSubmitting} onUpload={onUploadImg}  />
			)}
          
          <div> 
				<br /><p className="text-red-500">{errorSub}</p>
          </div>
        </div>
      </div>
    </section>
    )
}
