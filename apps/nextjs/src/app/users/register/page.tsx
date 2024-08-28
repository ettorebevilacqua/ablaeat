// import { getCsrfToken } from 'next-auth/react';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@acme/auth";

import Form from "./form";

export default async function LoginPage() {
  cookies();

  const csrf = cookies().get("next-auth.csrf-token")?.value.split("|")[0];
  console.log("csrf", csrf);
  debugger;
  const token = "aaa"; //  csrfToken(); // 'sss' //await  getCsrfToken();
  // console.log('csrf token ', token); // you will see the csrf token being logged

  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <Form tokens={csrf} />;
}
