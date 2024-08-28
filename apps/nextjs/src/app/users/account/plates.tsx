"use client";

import { useCallback, useEffect, useState } from "react";

import { Label } from "@acme/ui/";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";

import { PlateCard, PlateCardForm } from "~/app/_components/PlateCard.tsx";
import UploadImg from "~/app/_components/UploadImg";
import { createClient } from "~/utils/supabase/client";
import userImg from "/public/images/User.webp";

export interface Plate {
  title: string | null;
  img: string | null;
  desc: string | null;
  like: z.number | null;
}

export default function Plates({ user }: any) {
  const [errorSub, setErrorSub] = useState<string | null>(null);
  const [dataList, setDataList] = useState<Plate[] | null>(null);
  const supabase = createClient();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const onUploadImg = (url) => {
    setAvatarUrl(url);
    console, log("url plate", url);
    updateProfile({ ...formData, avatar_url: url });
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("USER xxx", user?.id);
      const { data, error, status } = await supabase
        .from("users_images")
        .select(`title, img, descr, like`)
        .eq("id", user?.id);

      if (error && status !== 406) {
        console.log("ERROR ACCOUNT", error);
        // throw error
      }

      if (data) {
        console.log("fill form ", data);
        // reset(data);
        setDataList(data);
      }
    } catch (error) {
      console.log("ERROR ACCOUNT catch", error);
      // alert('Error loading user data!')
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    console.log("USER xxx useEffect", user?.id);
    getData();
  }, [user, getData]);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight">
            My prefer Plates
          </h2>

          <p>Add Plate </p>

          <PlateCardForm user={user} />

          {!dataList
            ? "Empity"
            : dataList.map((plate: Plates) => (
                <PlateCard user={user} plate={plate} />
              ))}

          <div>
            <br />
            <p className="text-red-500">{errorSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
