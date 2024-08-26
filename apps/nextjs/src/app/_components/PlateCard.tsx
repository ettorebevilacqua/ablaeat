"use client"
import { useState, useEffect, useCallback } from 'react';
import UploadImg  from '~/app/_components/UploadImg'
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Card, CardTitle, CardDescription, CardFooter, CardContent } from "@acme/ui/card";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from '~/utils/supabase/client'

export const PlateSchema = z.object({
    title: z.string(),
    img: z.string(),
    desc: z.string(),
    like: z.number()
  });


export type Plate = {
		title: string | null
		descr: string | null
		img: string | null
	  }
	  
export type PropsCard = { user:any; plate:Plate; onSave:(error:any, data:Plate)=>never }
 
 async function deleteImg(supabase, plate, onSave){
	  const _filePath = plate?.img ? plate.img.split('/').pop() : null
	
	  const { data, error } = await supabase.from('users_images').delete().eq('id', plate.id);
	  if (error){
		onSave(error, null, plate);
		return {data, error }
	  } else  if (!!_filePath){ // const {data, error} =
		const res =  await supabase.storage.from('plates').remove([_filePath])
	  }
	  onSave(error , data, plate);
	return  {data, error }
 }
 	  
export function PlateCard({user, plate, onSave}:any) {
 const supabase = createClient()
 
 const handleDelete = useCallback(async ()=>{
	const onDelete = (error, data, plate)=>onSave(error, data, plate)
	const res = await deleteImg(supabase, plate, onDelete);
	if (res.error) alert('error on delete');
  }, [onSave, supabase])
  
  return (
  <Card size="3">
	 <CardTitle className="p-4 justify-center text-center text-2xl">
		<h2>{plate.title}</h2>
	 </CardTitle>
	 <CardContent>
		 <div className="">   
			<Image
				src={plate.img}
				alt="img"
				
				layout="fill"
			    className="!relative"
			/>
		</div>
	 </CardContent>
	 <CardDescription>
	 <p className="mt-2 text-sm">{plate.descr}</p>
	        
	 </CardDescription>
	<CardFooter>
		 <Button
          variant="ghost"
          className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
          onClick={handleDelete}
        >
          Delete
        </Button>
	</CardFooter>
</Card>
  );
}

export function PlateCardForm({user, plate, onSave }:PropsCard) {
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(true)
	const [imgUrl, setImgUrl] = useState(plate?.img === 'null' ? null : plate?.img);

	const supabase = createClient()
		
	const form = useForm() // { resolver: zodResolver(accountSchema),});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    defaultValues,
  } = form;
	
	async function updatePlate({ title,descr,img, imgUrl}: Plate) {
	  // console.log('onSubmit data', fullname, );
    try {
      setLoading(true)
	
      const { data, error } = await supabase.from('users_images').upsert({
        id_user: user?.id as string,
        title,
        descr,
        img : imgUrl || '',
        // updated_at: new Date().toISOString(),
      })
      
      if (error){
		console.log('error update plate', error);
		alert('Error on update'+error);
		return false  
	  }
	  setImgUrl(null);
	  reset();
      onSave && onSave(data)
       alert('plate updated!')
    } catch (error) {
      alert('Error updating the data!', error)
      setLoading(false)
      alert('Error on update'+error);
    } finally {
      setLoading(false)
    }
  }
  	
	async function onSubmit(dataForm) {
		updatePlate({...dataForm, imgUrl});
		console.log('onSubmit data', dataForm);
	}
	
  return (
   <form onSubmit={handleSubmit(onSubmit)} action="/" className="mt-8">
  <Card size="3">
	 <CardTitle className="p-4 justify-center text-center text-2xl">
		    <div className="mt-2">
                  <Input
                    {...register("title")}
                    name="title"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Title"
                  ></Input>
                </div>
	 </CardTitle>
	 <CardContent>
		 <div className=""> 
		      <UploadImg
        uid={user?.id ?? null}
        url={imgUrl}
        size={150}
        bucket="plates"
        onUpload={(url) => {
          setImgUrl(url)
          console.log('url images', url);
         // updatePlate({...formData, imgUrl: url })
        }}
      /> 
		</div>
	 </CardContent>
	 <CardDescription>
	 </CardDescription>
	<CardFooter>
		   <Input
                    {...register("descr")}
                    name="descr"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Description"
                  ></Input>
	</CardFooter>
</Card>
  <div className="mt-6">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className={`${
                    !isValid ? "bg-slate-400 hover:bg-slate-400" : undefined
                  } inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                >
                  {isSubmitting ? "Submitting..." : "Save Plate"}
                </Button>
              </div>
</form>
  );
}
