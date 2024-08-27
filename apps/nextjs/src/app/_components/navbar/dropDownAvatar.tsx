'use client'
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@acme/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@acme/ui/avatar";
import userImg from "/public/images/User.webp"
import { createClient } from '~/utils/supabase/client'

import {   DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem} from "@acme/ui/dropdown-menu";

interface NavlinksProps {
  user?: any;
}
    async function downloadImage(path: string) {
	  const supabase = createClient()

      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }
	  
        const url = URL.createObjectURL(data)
		return url
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

const CustomAvatar = ({user}:NavlinksProps) => {
    const supabase = createClient()
    const [imageData, setImageData] = useState();
    
    useEffect(()=>{
		downloadImage(user?.avatar_url).then(setImageData);
	},[]);

    // const imageData = supabase.storage.from('avatars').getPublicUrl(user?.avatar_url)
  return (
    <Avatar className="AvatarRoot">
      <AvatarImage
        className="AvatarImage"
        src={imageData || userImg}
        alt="Colm Tuite"
      />
      <AvatarFallback className="AvatarFallback" delayMs={600}>
        CT
      </AvatarFallback>
    </Avatar>
  );
};

const DropdownAvatar = ({user}:NavlinksProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <CustomAvatar user={user} />
    </DropdownMenuTrigger>
  );
};

 const DropDownAvatar = ({user}:NavlinksProps)=> {
	 
	return (	
		<DropdownMenu>
		  <DropdownAvatar user={user} />
		  <DropdownMenuContent>
			<DropdownMenuItem className="DropdownMenuItem">
				New Tab
			</DropdownMenuItem>
		</DropdownMenuContent>
		</DropdownMenu>
)}

export default DropDownAvatar
