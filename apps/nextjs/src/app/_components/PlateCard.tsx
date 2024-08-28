"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
// import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { /*Schema */ z } from "zod";
// import type {Session, User, UserResponse, AuthError} from "@acme/auth";
import type { AuthError, User } from "@acme/auth";

import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@acme/ui/card";
import { Input } from "@acme/ui/input";

import UploadImg from "~/app/_components/UploadImg";
import { createClient } from "~/utils/supabase/client";
import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
// import type { GenericSchema } from "@supabase/supabase-js/dist/module/lib/types";

export const PlateSchema = z.object({
  title: z.string(),
  img: z.string(),
  desc: z.string(),
  like: z.number(),
});

export interface Plate {
  id?: string | null;
  title?: string | null;
  descr?: string | null;
  img?: string | null;
  id_user?: string,
}

export type ErrorSave = AuthError | null
export type SaveEvent = (error: PostgrestError | null, data: Plate | null, plate?: Plate, errorRemoveFile?: ErrorSave) => void;

export interface PropsCard {
  plate: Plate;
  onSave?: SaveEvent;
}

export interface PropsCardForm { user: User, onSave?: SaveEvent; }

async function deleteImg(supabase: SupabaseClient, plate: Plate, onSave: SaveEvent) {
  if (!plate.img || !plate.id) return { data: null, error: null }
  const _filePath = plate.img ? plate.img.split("/").pop() : null;

  const { data, error } = await supabase
    .from("users_images")
    .delete()
    .eq("id", plate.id);
  if (error) {
    onSave(error, null, plate, null);
    return { data, error };
  }
  const res = _filePath && await supabase.storage.from("plates").remove([_filePath]);

  onSave(error, data, plate, res as ErrorSave);
  return { data, error };
}

export function PlateCard({ plate, onSave }: PropsCard) {
  const supabase = createClient();

  const handleDelete = useCallback(async () => {
    const onDelete: SaveEvent = (error, data, plate) => onSave && onSave(error, data, plate);
    const res = await deleteImg(supabase, plate, onDelete);
    if (res.error) alert("error on delete");
  }, [onSave, plate, supabase]);

  return (
    <Card>
      <CardTitle className="justify-center p-4 text-center text-2xl">
        <h2>{plate.title}</h2>
      </CardTitle>
      <CardContent>
        <div className="">
          <Image
            src={plate.img ?? ''}
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

export function PlateCardForm({ user }: PropsCardForm) {
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const supabase = createClient();

  const form = useForm(); // { resolver: zodResolver(accountSchema),});
  const {
    register,
    handleSubmit,
    reset,
    formState: { /* errors , */ isSubmitting, isValid },
    /* defaultValues ,*/
  } = form;

  const updatePlate = useCallback(
    async ({ title, descr }: Plate) => {
      // console.log('onSubmit data', fullname, );
      try {
        setLoading(true);
        const dataForm: Plate = {
          id_user: user.id,
          title,
          descr,
          img: imgUrl ?? "",
          // updated_at: new Date().toISOString(),
        }

        const { error } = await supabase.from("users_images").upsert(dataForm);

        if (error) {
          console.log("error update plate", error);
          alert("Error on update" + error.message);
          return false;
        }
        setImgUrl(null);
        reset();
        // onSave(error, dataForm, dataForm );
        alert("plate updated!");
      } catch (error) {
        setLoading(false);
        console.log('PalteCard error on update form', error)
        alert("Error on update");
      } finally {
        setLoading(false);
      }
    },
    [user.id, imgUrl, supabase, reset],
  );

  const onSubmit: SubmitHandler<FieldValues> = (dataForm) => {
    updatePlate({ ...dataForm as unknown as Plate, img: imgUrl }).then(() => null).catch(() => null);
    console.log("onSubmit data", dataForm);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="/" className="mt-8">
      <Card>
        <CardTitle className="justify-center p-4 text-center text-2xl">
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
              uid={user.id}
              url={imgUrl}
              size={150}
              bucket="plates"
              onUpload={(url) => {
                setImgUrl(url);
                console.log("url images", url);
                // updatePlate({...formData, imgUrl: url })
              }}
            />
          </div>
        </CardContent>
        <CardDescription></CardDescription>
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
          className={`${!isValid ? "bg-slate-400 hover:bg-slate-400" : undefined
            } inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
        >
          {isSubmitting && loading ? "Submitting..." : "Save Plate"}
        </Button>
      </div>
    </form>
  );
}
