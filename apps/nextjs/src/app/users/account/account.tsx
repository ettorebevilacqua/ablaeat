"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "~/hooks/useAuth";
import { createClient } from "~/utils/supabase/client";
import Avatar from "./Avatar";
import userImg from "/public/images/User.webp";
import type { FieldValues } from "react-hook-form";

export const accountSchema = z.object({
  full_name: z.string(),
  website: z.string(),
  aboutme: z.string(),
  avatar_url: z.string()
});

interface UserForm {
  full_name?: string;
  website?: string;
  aboutme?: string;
  avatar_url?: string;
}

export default function Account() {
  const { user, reload } = useAuth();
  const [errorSub] = useState<string | null>(null);
  const supabase = createClient();
  const [avatar_url, setAvatarUrl] = useState<string | null | undefined>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(accountSchema),
  });

  useEffect(() => {
    reset(user as FieldValues);
    setAvatarUrl(user?.avatar_url);
  }, [reset, user]);

  async function updateProfile({ full_name, aboutme, avatar_url, }: UserForm) {
    try {

      const dataForm = {
        id: user?.id,
        full_name,
        aboutme,
        avatar_url,
        updated_at: new Date().toISOString(),
      };
      const upProf = await supabase.from("profiles").upsert(dataForm);
      const { error } = upProf;
      if (error) {
        console.log("error update profile", error);
        alert("Error on update");
        return false;
      }
      alert("Profile updated!");
    } catch (error) {
      console.log("error catch update profile", error);
      alert("Error updating the data!");
    } finally { void reload(); }
  }

  async function onSubmit(dataForm: UserForm) {
    await updateProfile({ ...dataForm, avatar_url: avatar_url ?? undefined });
    console.log("onSubmit data", dataForm);
  }

  if (!user) {
    return <h2>User not found</h2>;
  }
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight">
            User Account Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} action="/" className="mt-8">
            <div className="space-y-5">
              <div>
                <p>
                  Email : <span className="font-bold">{user.email}</span>
                </p>
              </div>
              <div>
                <Avatar
                  uid={user.id}
                  url={avatar_url ?? userImg as unknown as string}
                  size={150}
                  onUpload={(url) => {
                    setAvatarUrl(url);
                    // updateProfile({...formData, avatar_url: url })
                  }}
                />
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium">
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
                  <p className="text-red-500">{errors.full_name?.message as string}</p>
                )}
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium">
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
                  <p className="text-red-500">{errors.website?.message as string}</p>
                )}
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium">
                  {" "}
                  About me{" "}
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    {...register("aboutme")}
                    name="aboutme"
                    placeholder="Somethink about you"
                    className="w-full rounded-md border border-gray-300 bg-transparent"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.aboutme?.message as string}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`${!isValid ? "bg-slate-400 hover:bg-slate-400" : undefined
                    } inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                >
                  {isSubmitting ? "Submitting..." : "Save Profile"}
                </button>
              </div>
            </div>
          </form>
          <div>
            <br />
            <p className="text-red-500">{errorSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
