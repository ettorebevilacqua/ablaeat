"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { createClient } from "~/utils/supabase/client";
import type {UserFull} from "@acme/auth";

interface NavlinksProps {
  user?: UserFull;
}
async function downloadImage(path: string | null | undefined) {
  const supabase = createClient();
  if (!path) return 
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}

const CustomAvatar = ({ user }: NavlinksProps) => {
  const [imageData, setImageData] = useState<string | undefined>();

  useEffect(() => {
    downloadImage(user?.avatar_url).then(setImageData).catch(()=>null);
  }, [user?.avatar_url]);

  // const imageData = supabase.storage.from('avatars').getPublicUrl(user?.avatar_url)
  return (
    <Avatar className="AvatarRoot">
      <AvatarImage
        className="AvatarImage"
        src={imageData}
        alt="Colm Tuite"
      />
      <AvatarFallback className="AvatarFallback" delayMs={600}>
        CT
      </AvatarFallback>
    </Avatar>
  );
};

const DropdownAvatar = ({ user }: NavlinksProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <CustomAvatar user={user} />
    </DropdownMenuTrigger>
  );
};

const DropDownAvatar = ({ user }: NavlinksProps) => {
  return (
    <DropdownMenu>
      <DropdownAvatar user={user} />
      <DropdownMenuContent>
        <DropdownMenuItem className="DropdownMenuItem">
          New Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownAvatar;
