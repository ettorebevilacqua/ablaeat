"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getCsrfToken, signIn } from "next-auth/react";

export default function Form({ tokens }: { tokens: string }) {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const token = await getCsrfToken();
    // console.log('getCsrfToken', token);
    console.log("tokens", tokens);

    const formData = new FormData(e.target);
    const values = [...formData.entries()];
    console.log("fffff", values);

    const response = await signIn("custom-signup", {
      email: formData.get("email"),
      password: formData.get("password"),
      csrfToken: tokens,
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-md flex-col gap-2"
    >
      <input
        name="email"
        className="border border-black text-black"
        type="email"
      />
      <input
        name="password"
        className="border border-black text-black"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export function Registration() {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </a>
        </div>
        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="undefined block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="undefined block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="undefined block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  className="mt-1 block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="undefined block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password_confirmation"
                  className="mt-1 block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="#"
              >
                Already registered?
              </a>
              <button
                type="submit"
                className="false ml-4 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out active:bg-gray-900"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
