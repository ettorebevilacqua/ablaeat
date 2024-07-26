'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { getCsrfToken } from "next-auth/react";

export default function Form({tokens} :{tokens:string}) {
  const router = useRouter();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      // const token = await getCsrfToken();
// console.log('getCsrfToken', token);
  console.log('tokens', tokens);

    const formData = new FormData(e.target);
     const values = [...formData.entries()];
    console.log('fffff', values);

    const response = await signIn('custom-signup', {
      email: formData.get('email'),
      password: formData.get('password'),
      csrfToken: tokens,
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="email"
        className="border border-black text-black"
        type="email"
      />
      <input
        name="password"
        className="border border-black  text-black"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}