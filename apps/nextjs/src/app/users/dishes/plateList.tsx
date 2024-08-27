"use client"
import { useState, useEffect, useCallback } from 'react';
import {PlateCard, PlateCardForm}  from '~/app/_components/PlateCard.tsx';
import { createClient } from '~/utils/supabase/client'
import { useAuth } from '~/hooks/useAuth'

export type Plate = {title:string | null; img:string | null; desc:string | null; like: number | null; } 

export default function PlatesList() {
	
	const supabase = createClient()
	const [loading, setLoading] = useState(true)
	const [errorSub, setErrorSub] = useState<string | null>(null);
	const [dataList, setDataList] = useState<Plate[] | null>(null)
	const { user, error } = useAuth();
    
    const getData = useCallback(async () => {
    try {
      setLoading(true)
	
      const { data, error, status } = await supabase
        .from('users_images')
        .select(`id, title, img, descr, like`)
        .eq('id_user', user?.id)

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
  
  const onSavePlate = (error:any, data:Plate)=>getData();
  
    useEffect(() => {
		getData()
	}, [user, getData])
  
    return(
   <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          			<PlateCardForm user={user} onSave={onSavePlate} />
          <div>
          { !dataList ? 'Empity' 
			  :dataList.map((plate:Plate)=>
				<PlateCard key={plate.id} user={user} plate={plate} onSave={onSavePlate} />
			)}
          </div>
        </div>
      </div>
    </section>
    )
}
